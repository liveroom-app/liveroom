defmodule LiveroomWeb.Hooks.Liveroom do
  import Phoenix.LiveView
  import Phoenix.Component

  require Logger

  def on_mount(attrs, params, _session, socket) do
    room_id = attrs[:room_id] || params["room_id"]
    type = attrs[:type] || :client

    {:cont,
     socket
     |> assign_initial_state(room_id, type)
     |> attach_hook(:liveroom_current_url, :handle_params, &handle_params_current_url/3)
     #  FIXME: use handle_metas in Presence instead, else this is a N+1 problem
     |> attach_hook(:liveroom_presence_diff, :handle_info, &handle_info_presence_diff/2)
     |> attach_hook(:liveroom_event, :handle_event, &handle_event_liveroom/3)}
  end

  ### Hooks

  defp handle_params_current_url(_params, url, socket) do
    update_user(socket, &put_in(&1.current_url, url))

    {:cont, socket}
  end

  defp handle_info_presence_diff(
         %Phoenix.Socket.Broadcast{
           topic: "liveroom:" <> room_id,
           event: "presence_diff",
           payload: %{joins: joins, leaves: leaves}
         } = _msg,
         %{assigns: %{_liveroom_room_id: room_id}} = socket
       ) do
    socket =
      update(
        socket,
        :_liveroom_users,
        &LiveroomWeb.Presence.merge_joins_and_leaves(&1, joins, leaves)
      )

    {:halt, socket}
  end

  #  Important, catch-all clause to ensure the liveview receives all other messages
  defp handle_info_presence_diff(_msg, socket) do
    {:cont, socket}
  end

  defp handle_event_liveroom(
         "liveroom-mousemove" = _event,
         %{"x" => x, "y" => y} = _params,
         socket
       ) do
    update_user(socket, &(&1 |> put_in([:x], x) |> put_in([:y], y)))

    {:halt, socket}
  end

  defp handle_event_liveroom("liveroom-mousedown" = _event, _params, socket) do
    update_user(socket, &put_in(&1.is_mouse_down, true))

    {:halt, socket}
  end

  defp handle_event_liveroom("liveroom-mouseup" = _event, _params, socket) do
    update_user(socket, &put_in(&1.is_mouse_down, false))

    {:halt, socket}
  end

  defp handle_event_liveroom("liveroom-keydown" = _event, %{"key" => "Escape"} = _params, socket) do
    update_user(socket, &put_in(&1.is_escape_key_down, true))

    {:halt, socket}
  end

  defp handle_event_liveroom("liveroom-keyup" = _event, %{"key" => "Escape"} = _params, socket) do
    update_user(socket, &put_in(&1.is_escape_key_down, false))

    {:halt, socket}
  end

  defp handle_event_liveroom(
         "liveroom-element-mouseover" = _event,
         %{"id" => el_id} = _params,
         socket
       ) do
    update_user(socket, &put_in(&1.hovered_elements[el_id], true))

    {:halt, socket}
  end

  defp handle_event_liveroom(
         "liveroom-element-mouseout" = _event,
         %{"id" => el_id} = _params,
         socket
       ) do
    update_user(socket, &update_in(&1.hovered_elements, fn map -> Map.delete(map, el_id) end))

    {:halt, socket}
  end

  defp handle_event_liveroom(
         "liveroom-element-focus" = _event,
         %{"id" => el_id} = _params,
         socket
       ) do
    update_user(socket, &put_in(&1.focused_elements[el_id], true))

    {:halt, socket}
  end

  defp handle_event_liveroom(
         "liveroom-element-blur" = _event,
         %{"id" => el_id} = _params,
         socket
       ) do
    update_user(socket, &update_in(&1.focused_elements, fn map -> Map.delete(map, el_id) end))

    {:halt, socket}
  end

  defp handle_event_liveroom(
         "liveroom-window-resize" = _event,
         %{"inner_width" => inner_width, "inner_height" => inner_height} = _params,
         socket
       ) do
    update_user(
      socket,
      &(&1 |> put_in([:inner_width], inner_width) |> put_in([:inner_height], inner_height))
    )

    {:halt, socket}
  end

  defp handle_event_liveroom("liveroom-" <> _ = event, _params, socket) do
    Logger.warning("Got unknown liveroom event: #{inspect(event)}")
    {:halt, socket}
  end

  #  Important, catch-all clause to ensure the liveview receives all other events
  defp handle_event_liveroom(_event, _params, socket) do
    {:cont, socket}
  end

  ### Helpers

  defp assign_initial_state(socket, room_id, type)
       when is_binary(room_id) and room_id != "" and
              type in [:client, :admin] do
    if not connected?(socket) do
      assign(socket,
        _liveroom_room_id: room_id,
        _liveroom_user_id: nil,
        _liveroom_users: %{}
      )
    else
      me = LiveroomWeb.Presence.create_user(room_id, type, socket.assigns.analytics_data)

      :ok = LiveroomWeb.Presence.join_room(room_id, me)

      assign(socket,
        _liveroom_room_id: room_id,
        _liveroom_user_id: me.id,
        _liveroom_users: LiveroomWeb.Presence.list_users(room_id)
      )
    end
  end

  defp update_user(
         %{assigns: %{_liveroom_room_id: room_id, _liveroom_user_id: user_id}} = _socket,
         update_fn
       )
       when is_binary(room_id) and room_id != "" and
              is_binary(user_id) and user_id != "" do
    LiveroomWeb.Presence.update_user(room_id, user_id, update_fn)
  end

  defp update_user(_socket, _update_fn) do
    Logger.warning("Socket not connected to a room, cannot update user")
  end
end
