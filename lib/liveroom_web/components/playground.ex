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
    <.msg_form class="mb-4" />

    <div class="aspect-video max-w-screen-lg w-full mx-auto rounded-lg bg-gray-100 border border-gray-300">
      <ul id="playground_cursors" phx-hook="TrackCursorsHook" class="w-full h-full list-none p-8">
        <li
          :for={user <- @users}
          style={"color: #{user.color}; left: #{user.x}%; top: #{user.y}%"}
          class="flex flex-col absolute pointer-events-none"
        >
          <.cursor />

          <span
            style={"background-color: #{user.color};"}
            class="mt-1 ml-4 px-1 text-sm text-white font-semibold select-none whitespace-nowrap overflow-hidden"
          >
            <%= user.name %>
          </span>

          <span
            style={"background-color: #{user.color};"}
            class="max-w-[20ch] mt-1 px-1 text-sm text-white text-left rounded-br-md opacity-90"
          >
            <%= user.msg %>
          </span>
        </li>
      </ul>
    </div>
    """
  end

  ### Components

  attr :class, :string, default: nil

  def msg_form(assigns) do
    ~H"""
    <form
      id="msgform"
      phx-submit="send_message"
      phx-keyup="send_message"
      phx-key="enter"
      class={[
        "flex flex-row-reverse items-end space-x-reverse space-x-4",
        @class
      ]}
    >
      <button
        type="submit"
        tabindex="0"
        class="flex items-center py-1.5 px-3 bg-brand text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
      >
        <span>send</span>
        <.icon name="hero-paper-airplane-solid" class="h-4 w-4 ml-2 mt-0.5" />
      </button>
      <textarea
        id="msg"
        name="msg"
        tabindex="1"
        maxlength="280"
        placeholder="Say something"
        aria-label="Your message"
        class={[
          "min-w-[24rem] min-h-[2rem] appearance-none py-1 px-3",
          "text-gray-600 bg-gray-50 placeholder-gray-400",
          "border-none rounded-md shadow-inner",
          "focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-4 focus:shadow-none"
        ]}
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
