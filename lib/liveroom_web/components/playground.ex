defmodule LiveroomWeb.Components.Playground do
  use LiveroomWeb, :live_view

  alias Liveroom.Names

  ### Render

  @impl true
  def render(assigns) do
    ~H"""
    <ul
      id="playground_cursors"
      phx-hook="TrackCursorsHook"
      class="relative w-full h-full list-none p-8"
    >
      <li
        style={"color: deeppink; left: #{@x}%; top: #{@y}%"}
        class="flex flex-col absolute pointer-events-none whitespace-nowrap overflow-hidden"
      >
        <.cursor />
        <span style="background-color: deeppink;" class="mt-1 ml-4 px-1 text-sm text-white">
          <%= @user %>
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

    socket
    |> assign(
      x: Enum.random(1..100),
      y: Enum.random(1..100),
      user: user
    )
    |> ok()
  end

  @impl true
  def handle_event("cursor-move", %{"x" => x, "y" => y}, socket) do
    socket
    |> assign(x: x, y: y)
    |> noreply()
  end

  ### Helpers

  defp ok(socket), do: {:ok, socket}
  defp noreply(socket), do: {:noreply, socket}
end
