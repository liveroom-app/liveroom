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
  def handle_event(event, params, state)
      when event in ["mouse_move", "mouse_down", "mouse_up", "key_down", "key_up"] do
    # TODO: Here we broadcast directly on the pubsub, so memory efficient because we skip Presence.
    #       But a user joining the room (or reconnecting) wont have up-to-date information
    #       about mouse & keyboard state of other users until they move their mouse or press a key.

    LiveroomWeb.Presence.broadcast(state.room_id, event, params)
    # NOTE: State will be updated when consuming pubsub message.
    {:noreply, state}
  end

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

  def handle_message(
        %Phoenix.Socket.Broadcast{
          topic: _topic,
          event: "mouse_move",
          payload: %{"user_id" => user_id, "x" => x, "y" => y}
        },
        state
      ) do
    state =
      update_in(state, [:users, user_id], fn
        nil -> nil
        user -> %{user | x: x, y: y}
      end)

    {:noreply, state}
  end

  def handle_message(
        %Phoenix.Socket.Broadcast{
          topic: _topic,
          event: event,
          payload: %{"user_id" => user_id}
        },
        state
      )
      when event in ["mouse_down", "mouse_up"] do
    is_mouse_down? =
      case event do
        "mouse_down" -> true
        "mouse_up" -> false
      end

    state =
      update_in(state, [:users, user_id], fn
        nil -> nil
        user -> %{user | is_mouse_down: is_mouse_down?}
      end)

    {:noreply, state}
  end

  def handle_message(
        %Phoenix.Socket.Broadcast{
          topic: _topic,
          event: event,
          payload: %{"user_id" => user_id, "key" => "Escape"}
        },
        state
      )
      when event in ["key_down", "key_up"] do
    is_escape_key_down? =
      case event do
        "key_down" -> true
        "key_up" -> false
      end

    state =
      update_in(state, [:users, user_id], fn
        nil -> nil
        user -> %{user | is_escape_key_down: is_escape_key_down?}
      end)

    {:noreply, state}
  end
end
