defmodule LiveroomWeb.Components.Playground do
  use LiveroomWeb, :live_view

  alias Liveroom.Names
  alias Liveroom.Colors
  alias LiveroomWeb.Presence

  @cursorview "cursorview"

  ### Render

  @impl true
  def render(assigns) do
    ~H"""
    <ul id="playground_cursors" phx-hook="TrackCursorsHook" class="w-full h-full list-none p-8">
      <li
        :for={user <- @users}
        style={"color: #{user.color}; left: #{user.x}%; top: #{user.y}%"}
        class="flex flex-col absolute pointer-events-none whitespace-nowrap overflow-hidden"
      >
        <.cursor />

        <span
          style={"background-color: #{user.color};"}
          class="mt-1 ml-4 px-1 text-sm text-white select-none"
        >
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
    socket_id = socket.id
    name = session["name"] || Names.generate()

    initial_users =
      if connected?(socket) do
        Presence.track(self(), @cursorview, socket_id, %{
          socket_id: socket_id,
          x: 50,
          y: 50,
          name: name,
          color: Colors.get_hsl(name)
        })

        LiveroomWeb.Endpoint.subscribe(@cursorview)

        list_users()
      else
        []
      end

    socket
    |> assign(
      socket_id: socket_id,
      users: initial_users
    )
    |> ok()
  end

  @impl true
  def handle_event("cursor-move", %{"x" => x, "y" => y}, socket) do
    send_event(:cursor_moved, socket.id, x, y)

    {:noreply, socket}
  end

  @impl true
  def handle_info(%{event: "presence_diff", payload: payload}, socket) do
    dbg(payload)

    socket
    |> assign(socket_id: socket.id, users: list_users())
    |> noreply()
  end

  ### Helpers

  defp send_event(:cursor_moved, socket_id, x, y) do
    @cursorview
    |> Presence.get_by_key(socket_id)
    |> Map.get(:metas)
    |> hd()
    |> Map.merge(%{x: x, y: y})
    |> then(&Presence.update(self(), @cursorview, socket_id, &1))
  end

  defp list_users do
    @cursorview
    |> Presence.list()
    |> Enum.map(fn {_socket_id, presence} -> presence[:metas] end)
    |> List.flatten()
  end

  defp ok(socket), do: {:ok, socket}
  defp noreply(socket), do: {:noreply, socket}
end
