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
    <.msg_form />

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

        <span
          style={"background-color: #{user.color};"}
          class="text-green-50 mt-1 py-0 px-1 text-sm text-left rounded-br-md opacity-80 fit-content"
        >
          <%= user.msg %>
        </span>
      </li>
    </ul>
    """
  end

  ### Components

  def msg_form(assigns) do
    ~H"""
    <form
      id="msgform"
      phx-submit="send_message"
      class="rounded-xl bg-gradient-to-r to-pink-100 from-pink-50 p-8 drop-shadow-xl flex w-xs mx-auto space-x-3"
    >
      <input
        class="flex-1 appearance-none border border-transparent py-2 px-4 bg-white text-gray-600 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
        maxlength="30"
        aria-label="Your message"
        type="text"
        id="msg"
        name="msg"
        placeholder="Say something"
      />
      <input
        id="submit-msg"
        type="submit"
        class="flex-shrink-0 bg-pink-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-pink-200"
        value="Change"
      />
    </form>
    """
  end

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
          msg: "",
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

  def handle_event("send_message", %{"msg" => msg}, socket) do
    send_event(:message_sent, socket.id, msg)
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
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{x: x, y: y}))
  end

  defp send_event(:message_sent, socket_id, msg) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{msg: msg}))
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
