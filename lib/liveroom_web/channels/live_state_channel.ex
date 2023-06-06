defmodule LiveroomWeb.LiveStateChannel do
  # use LiveState.Channel, web_module: LiveroomWeb
  use LiveState.Channel, web_module: LiveroomWeb, json_patch: true

  alias LiveState.Event

  @impl true
  def state_key, do: :state

  @impl true
  def init(_topic, _params, _socket) do
    # LiveroomWeb.Endpoint.subscribe("comments:#{url}")

    {:ok, %{comments: []}}
  end

  @impl true
  def handle_event("add_comment", params, state) do
    comment = %{
      author: params["author"],
      text: params["text"],
      inserted_at: DateTime.utc_now() |> DateTime.truncate(:second) |> DateTime.to_string()
    }

    state = Map.update!(state, :comments, &[comment | &1])

    {:reply, [%Event{name: "comment_added", detail: comment}], state}
    # {:noreply, state}
  end

  @impl true
  def handle_message({:comment_created, _comment} = msg, state) do
    dbg({msg, state})

    # {:noreply, state |> Map.put(:comments, Comments.list_comments(state.url))}
    {:noreply, state |> Map.put(:comments, [])}
  end
end
