defmodule LiveroomWeb.Components.Playground do
  use LiveroomWeb, :live_view

  alias Liveroom.Names
  alias LiveroomWeb.Presence

  @cursorview "cursorview"

  ### Render

  @impl true
  def render(assigns) do
    ~H"""
    <ul id="playground_cursors" phx-hook="TrackCursorsHook" class="w-full h-full list-none p-8">
      <li
        :for={user <- @users}
        style={"color: deeppink; left: #{user.x}%; top: #{user.y}%"}
        class="flex flex-col absolute pointer-events-none whitespace-nowrap overflow-hidden"
      >
        <.cursor />
        <span style="background-color: deeppink;" class="mt-1 ml-4 px-1 text-sm text-white">
          <%= user.name %>
        </span>
      </li>
    </ul>
    """
  end

  ### Components

  def cursor(assigns) do
    ~H"""
    <svg
      version="1.1"
      width="25px"
      height="25px"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 21 21"
    >
      <polygon fill="black" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6" />
      <polygon fill="currentColor" points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5" />
    </svg>
    """
  end

  ### Server

  @impl true
  def mount(_params, session, socket) do
    user = session["user"] || Names.generate()

    initial_users =
      if connected?(socket) do
        Presence.track(self(), @cursorview, socket.id, %{
          socket_id: socket.id,
          x: 50,
          y: 50,
          name: user
        })

        LiveroomWeb.Endpoint.subscribe(@cursorview)

        Presence.list(@cursorview)
        |> Enum.map(fn {_, data} -> data[:metas] |> List.first() end)
      else
        []
      end

    socket
    |> assign(
      user: user,
      users: initial_users,
      socket_id: socket.id
    )
    |> ok()
  end

  @impl true
  def handle_event("cursor-move", %{"x" => x, "y" => y}, socket) do
    send_event(:cursor_moved, socket.id, x, y)

    {:noreply, socket}
  end

  @impl true
  def handle_info(%{event: "presence_diff", payload: _payload}, socket) do
    socket
    |> assign(socket_id: socket.id, users: list_users())
    |> noreply()
  end

  ### Helpers

  defp send_event(:cursor_moved, socket_id, x, y) do
    payload = %{x: x, y: y}

    metas =
      Presence.get_by_key(@cursorview, socket_id)[:metas]
      |> List.first()
      |> Map.merge(payload)

    Presence.update(self(), @cursorview, socket_id, metas)
  end

  defp list_users do
    Presence.list(@cursorview)
    |> Enum.map(fn {_, data} -> data[:metas] |> List.first() end)
  end

  defp ok(socket), do: {:ok, socket}
  defp noreply(socket), do: {:noreply, socket}
end
