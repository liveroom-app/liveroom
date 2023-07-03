defmodule LiveroomWeb.LiveStateChannel do
  use LiveState.Channel, web_module: LiveroomWeb, json_patch: true

  @impl true
  def init(
        _topic,
        %{
          "room_id" => room_id,
          "current_url" => current_url,
          "inner_width" => inner_width,
          "inner_height" => inner_height
        } = _params,
        _socket
      ) do
    me =
      LiveroomWeb.Presence.create_user(room_id, :client, %{
        url: current_url,
        inner_width: inner_width,
        inner_height: inner_height
      })

    :ok = LiveroomWeb.Presence.join_room(room_id, me)

    state = %{
      room_id: room_id,
      me: me,
      users: LiveroomWeb.Presence.list_users(room_id)
    }

    {:ok, state}
  end

  @impl true
  def handle_event("mouse_move", %{"x" => x, "y" => y} = _params, state) do
    update_user(state, &(&1 |> put_in([:x], x) |> put_in([:y], y)))
    {:noreply, state}
  end

  def handle_event("mouse_down", _params, state) do
    update_user(state, &put_in(&1.is_mouse_down, true))
    {:noreply, state}
  end

  def handle_event("mouse_up", _params, state) do
    update_user(state, &put_in(&1.is_mouse_down, false))
    {:noreply, state}
  end

  def handle_event("key_down", %{"key" => "Escape"} = _params, state) do
    update_user(state, &put_in(&1.is_escape_key_down, true))
    {:noreply, state}
  end

  def handle_event("key_up", %{"key" => "Escape"} = _params, state) do
    update_user(state, &put_in(&1.is_escape_key_down, false))
    {:noreply, state}
  end

  def handle_event(
        "window_resize",
        %{"inner_width" => inner_width, "inner_height" => inner_height} = _params,
        state
      ) do
    update_user(
      state,
      &(&1 |> put_in([:inner_width], inner_width) |> put_in([:inner_height], inner_height))
    )

    {:noreply, state}
  end

  # TODO: Not handled yet by the HTML Client Element:
  #   - mouseover, mouseout (hovered elements)
  #   - focus, blur (focused elements)

  @impl true
  #  FIXME: use handle_metas in Presence instead, else this is a N+1 problem
  def handle_message(
        %Phoenix.Socket.Broadcast{
          topic: _topic,
          event: "presence_diff",
          payload: %{joins: joins, leaves: leaves}
        },
        state
      ) do
    state =
      Map.update!(state, :users, &LiveroomWeb.Presence.merge_joins_and_leaves(&1, joins, leaves))

    {:noreply, state}
  end

  # def handle_message(
  #       %Phoenix.Socket.Broadcast{
  #         topic: _topic,
  #         event: "mouse_move",
  #         payload: %{"user_id" => user_id, "x" => x, "y" => y}
  #       },
  #       state
  #     ) do
  #   state =
  #     update_in(state, [:users, user_id], fn
  #       nil -> nil
  #       user -> %{user | x: x, y: y}
  #     end)

  #   {:noreply, state}
  # end

  # def handle_message(
  #       %Phoenix.Socket.Broadcast{
  #         topic: _topic,
  #         event: event,
  #         payload: %{"user_id" => user_id}
  #       },
  #       state
  #     )
  #     when event in ["mouse_down", "mouse_up"] do
  #   is_mouse_down? =
  #     case event do
  #       "mouse_down" -> true
  #       "mouse_up" -> false
  #     end

  #   state =
  #     update_in(state, [:users, user_id], fn
  #       nil -> nil
  #       user -> %{user | is_mouse_down: is_mouse_down?}
  #     end)

  #   {:noreply, state}
  # end

  # def handle_message(
  #       %Phoenix.Socket.Broadcast{
  #         topic: _topic,
  #         event: event,
  #         payload: %{"user_id" => user_id, "key" => "Escape"}
  #       },
  #       state
  #     )
  #     when event in ["key_down", "key_up"] do
  #   is_escape_key_down? =
  #     case event do
  #       "key_down" -> true
  #       "key_up" -> false
  #     end

  #   state =
  #     update_in(state, [:users, user_id], fn
  #       nil -> nil
  #       user -> %{user | is_escape_key_down: is_escape_key_down?}
  #     end)

  #   {:noreply, state}
  # end

  ### Helpers

  defp update_user(%{room_id: room_id, me: %{id: user_id}} = _state, update_fn)
       when is_binary(room_id) and room_id != "" and
              is_binary(user_id) and user_id != "" do
    LiveroomWeb.Presence.update_user(room_id, user_id, update_fn)
  end
end
