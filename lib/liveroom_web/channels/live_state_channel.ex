defmodule LiveroomWeb.LiveStateChannel do
  # use LiveState.Channel, web_module: LiveroomWeb
  use LiveState.Channel, web_module: LiveroomWeb, json_patch: true

  alias LiveroomWeb.Endpoint
  alias LiveroomWeb.Presence

  @impl true
  def init(topic, _params, _socket) do
    me = %{
      type: :client,
      id: Ecto.UUID.generate(),
      name: Liveroom.Names.generate(),
      color: Liveroom.Colors.get_random_color(),
      x: 50,
      y: 50,
      is_mouse_down: false,
      joined_at: DateTime.utc_now()
    }

    pubsub_topic = pubsub_topic(topic)

    {:ok, _} = Presence.track(self(), pubsub_topic, me.id, me)
    :ok = Endpoint.subscribe(pubsub_topic)

    state = %{
      topic: topic,
      me: me,
      clients: list_clients(pubsub_topic)
    }

    {:ok, state}
  end

  @impl true
  def handle_event(event, params, state)
      when event in ["mouse_moved", "mouse_down", "mouse_up"] do
    pubsub_topic = pubsub_topic(state.topic)
    Endpoint.broadcast(pubsub_topic, event, params)
    # NOTE: State will be updated when consuming pubsub message.
    {:noreply, state}
  end

  @impl true
  def handle_message(
        %Phoenix.Socket.Broadcast{
          topic: _topic,
          event: "presence_diff",
          payload: %{joins: joins, leaves: leaves}
        },
        state
      ) do
    state = Map.update!(state, :clients, &update_clients(&1, joins, leaves))

    {:noreply, state}
  end

  def handle_message(
        %Phoenix.Socket.Broadcast{
          topic: _topic,
          event: "mouse_moved",
          payload: %{"client_id" => client_id, "x" => x, "y" => y}
        },
        state
      ) do
    state =
      update_in(state, [:clients, client_id], fn
        nil -> nil
        client -> %{client | x: x, y: y}
      end)

    {:noreply, state}
  end

  def handle_message(
        %Phoenix.Socket.Broadcast{
          topic: _topic,
          event: event,
          payload: %{"client_id" => client_id}
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
      update_in(state, [:clients, client_id], fn
        nil -> nil
        client -> %{client | is_mouse_down: is_mouse_down?}
      end)

    {:noreply, state}
  end

  ### Helpers

  defp pubsub_topic(topic), do: topic <> "_pubsub"

  def list_clients(topic) do
    topic
    # TODO: Is Presence.fetch more appropriate?
    |> Presence.list()
    |> Enum.map(fn {client_id, %{metas: metas}} -> {client_id, hd(metas)} end)
    |> Enum.into(%{})
  end

  def update_clients(clients, joins, leaves) do
    clients
    |> merge_joins(joins)
    |> merge_leaves(leaves)
  end

  def merge_joins(clients, joins) do
    for {client_id, %{metas: metas}} <- joins, reduce: clients do
      clients -> Map.put(clients, client_id, hd(metas))
    end
  end

  def merge_leaves(clients, leaves) do
    for {client_id, %{metas: _metas}} <- leaves, reduce: clients do
      clients -> Map.delete(clients, client_id)
    end
  end
end
