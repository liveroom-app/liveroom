defmodule LiveroomWeb.Presence do
  @moduledoc """
  Provides presence tracking to channels and processes.

  See the [`Phoenix.Presence`](https://hexdocs.pm/phoenix/Phoenix.Presence.html)
  docs for more details.
  """
  use Phoenix.Presence,
    otp_app: :liveroom,
    pubsub_server: Liveroom.PubSub

  ### API

  def create_user(room_id, type, analytics_data \\ %{})
      when is_binary(room_id) and room_id != "" and
             type in [:client, :admin] do
    %{
      id: Ecto.UUID.generate(),
      room_id: room_id,
      # :phx_ref added by Presence
      # :phx_ref_prev added by Presence
      type: type,
      name: Liveroom.Names.generate(),
      color: Liveroom.Colors.get_random_color(),
      joined_at: DateTime.utc_now(),
      current_url: analytics_data[:url],
      inner_width: analytics_data[:inner_width],
      inner_height: analytics_data[:inner_height],
      # NOTE: Sent as string through the websockets, and used in template strings in style or css,
      #       so let's not take the performance penalty of converting it to integer.
      x: "50",
      y: "50",
      msg: "",
      is_mouse_down: false,
      is_escape_key_down: false,
      hovered_elements: %{},
      focused_elements: %{},
      inputs: %{}
    }
  end

  def list_users(room_id) when is_binary(room_id) and room_id != "" do
    topic = topic(room_id)

    for {user_id, %{metas: metas}} <- list(topic), into: %{} do
      {user_id, hd(metas)}
    end
  end

  def update_user(room_id, user_id, update_fn)
      when is_binary(room_id) and room_id != "" and
             is_binary(user_id) and user_id != "" and
             is_function(update_fn, 1) do
    update(self(), topic(room_id), user_id, update_fn)
  end

  def join_room(room_id, user) when is_binary(room_id) and room_id != "" and is_map(user) do
    topic = topic(room_id)

    {:ok, _} = track(self(), topic, user.id, user)
    :ok = LiveroomWeb.Endpoint.subscribe(topic)

    :ok
  end

  def topic(room_id) when is_binary(room_id) and room_id != "" do
    "liveroom:#{room_id}"
  end

  def merge_joins_and_leaves(users, joins, leaves) when is_map(users) do
    users
    # NOTE: ⚠️ Order is important, first we remove the leaves, then we add the joins.
    |> merge_leaves(leaves)
    |> merge_joins(joins)
  end

  def broadcast(room_id, event, payload)
      when is_binary(room_id) and room_id != "" and
             is_binary(event) and event != "" do
    LiveroomWeb.Endpoint.broadcast(topic(room_id), event, payload)
  end

  ### Helpers

  defp merge_joins(users, joins) do
    for {user_id, %{metas: metas}} <- joins, reduce: users do
      users -> Map.put(users, user_id, hd(metas))
    end
  end

  defp merge_leaves(users, leaves) do
    for {user_id, %{metas: _metas}} <- leaves, reduce: users do
      users -> Map.delete(users, user_id)
    end
  end
end
