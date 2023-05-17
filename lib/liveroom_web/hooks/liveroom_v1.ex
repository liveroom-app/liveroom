defmodule LiveroomWeb.Hooks.LiveroomV1 do
  import Phoenix.LiveView
  import Phoenix.Component

  alias Phoenix.LiveView.Socket

  alias LiveroomWeb.Presence

  ### API

  def update_current_presence(socket, meta_diff) do
    Presence.update(self(), topic(socket), socket.id, &Map.merge(&1, meta_diff))
  end

  def topic(%Socket{assigns: %{_liveroom_v1_session_id: session_id}} = _socket) do
    topic(session_id)
  end

  def topic(session_id) when is_binary(session_id) and session_id != "" do
    "session:" <> session_id
  end

  ### Hooks

  def on_mount(type, params, _session, socket) when type in [:admin, :client] do
    {:cont,
     socket
     |> assign_initial_state(type, params)
     |> attach_hook(:livebook_v1_current_url, :handle_params, fn
       _params, url, socket ->
         update_current_presence(socket, %{current_url: url})
         {:cont, socket}
     end)
     |> attach_hook(:liveroom_v1_presence_diff, :handle_info, fn
       %Phoenix.Socket.Broadcast{
         topic: "session:" <> session_id,
         event: "presence_diff",
         payload: %{joins: joins, leaves: leaves}
       } = _msg,
       %{assigns: %{_liveroom_v1_session_id: session_id}} = socket ->
         {:halt, update_metas(socket, joins, leaves)}

       #  Important, catch-all clause to ensure the liveview receives all other messages
       msg, socket ->
         dbg(msg)
         {:cont, socket}
     end)
     |> attach_hook(
       :liveroom_v1_event,
       :handle_event,
       fn
         "liveroom-cursor-moved", %{"x" => x_string, "y" => y_string} = _params, socket ->
           {x, ""} = Float.parse(x_string)
           {y, ""} = Float.parse(y_string)
           update_current_presence(socket, %{x: x, y: y})
           {:halt, socket}

         "liveroom-window-resize",
         %{"inner_width" => inner_width, "inner_height" => inner_height} = _params,
         socket ->
           update_current_presence(socket, %{inner_width: inner_width, inner_height: inner_height})

           {:halt, socket}

         "liveroom-" <> _, _params, socket ->
           {:halt, socket}

         event, params, socket ->
           dbg(event)
           dbg(params)
           {:cont, socket}
       end
     )}
  end

  ### Helpers

  def assign_initial_state(
        socket,
        type,
        %{"session_id" => session_id} = _params
      ) do
    topic = topic(session_id)
    socket_id = socket.id

    if connected?(socket) do
      name = Liveroom.Names.generate()
      color = Liveroom.Colors.get_random_color(type)

      {:ok, _ref} =
        Presence.track(
          self(),
          topic,
          socket_id,
          Map.merge(
            %{
              socket_id: socket_id,
              session_id: session_id,
              type: type,
              name: name,
              color: color,
              current_url: socket.assigns.analytics_data[:url],
              inner_width: socket.assigns.analytics_data[:inner_width],
              inner_height: socket.assigns.analytics_data[:inner_height],
              x: 50,
              y: 50
            },
            case type do
              :admin -> %{}
              :client -> %{}
            end
          )
        )

      LiveroomWeb.Endpoint.subscribe(topic)
      presences = Presence.list(topic)

      assign(socket,
        _liveroom_v1_socket_id: socket_id,
        _liveroom_v1_session_id: session_id,
        _liveroom_v1_type: type,
        _liveroom_v1_name: name,
        _liveroom_v1_color: color,
        _liveroom_v1_metas: Enum.flat_map(presences, fn {_id, %{metas: metas}} -> metas end)
        # NOTE: This data is already present in the presences,
        #       and we could pattern match storing only the socket_id.
        #       But this acts as a cache, accessible from the liveview state,
        #       to avoid unnecessary UI updates & optimize performance.
      )
    else
      assign(socket,
        _liveroom_v1_socket_id: socket_id,
        _liveroom_v1_session_id: session_id,
        _liveroom_v1_type: type,
        _liveroom_v1_name: nil,
        _liveroom_v1_color: nil,
        _liveroom_v1_metas: []
      )
    end
  end

  def update_metas(socket, joins, leaves) do
    update(socket, :_liveroom_v1_metas, fn metas ->
      metas =
        Enum.reduce(joins, metas, fn {_id, %{metas: join_metas}}, metas ->
          join_metas ++ metas
        end)

      metas =
        Enum.reduce(leaves, metas, fn {_id, %{metas: leave_metas}}, metas ->
          metas -- leave_metas
        end)

      metas
      |> Enum.uniq_by(& &1.socket_id)
      |> Enum.sort_by(&{&1.name, &1.socket_id})
    end)
  end
end
