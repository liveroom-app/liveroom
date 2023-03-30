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
    <div class="max-w-screen-md mx-auto flex space-x-4 items-stretch">
      <div class="aspect-video w-full rounded-lg bg-gray-100 border border-gray-300">
        <ul id="playground_cursors" phx-hook="TrackCursorsHook" class="w-full h-full list-none p-8">
          <li
            :for={user <- @users}
            style={"color: #{user.color}; left: #{user.x}%; top: #{user.y}%"}
            class="z-10 flex flex-col absolute pointer-events-none"
          >
            <.cursor class="rounded shadow-2xl" />

            <span
              style={"background-color: #{user.color};"}
              class="mt-1 ml-4 px-1 text-sm text-white font-semibold select-none whitespace-nowrap overflow-hidden rounded shadow-2xl"
            >
              <%= user.name %>
            </span>

            <span
              style={"background-color: #{user.color};"}
              class="max-w-[20ch] mt-1 px-1 text-sm text-white text-left select-none rounded-br-md opacity-90"
            >
              <%= user.msg %>
            </span>
          </li>
        </ul>
      </div>

      <.msg_form msg={@msg} current_msg={@current_msg} class="min-w-[15ch] w-full max-w-[30ch]" />
    </div>
    """
  end

  ### Components

  attr :msg, :string, required: true
  attr :current_msg, :string, required: true
  attr :class, :string, default: nil

  def msg_form(assigns) do
    ~H"""
    <form
      id="msgform"
      phx-change="message_updated"
      phx-submit="send_message"
      phx-keyup="send_message"
      phx-key="Enter"
      class={[
        "flex flex-col items-stretch space-y-4 text-xs",
        @class
      ]}
    >
      <textarea
        id="msg"
        name="msg"
        tabindex="1"
        maxlength="280"
        placeholder="Say something"
        aria-label="Your message"
        class={[
          "flex-1 appearance-none py-1 px-2",
          "text-gray-600 bg-gray-50 placeholder-gray-400",
          "border-none rounded-md shadow-inner",
          "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:shadow-none",
          @msg == "" && "bg-gray-50/50"
        ]}
      />

      <button
        type="submit"
        disabled={disabled = @msg == "" && @current_msg == ""}
        tabindex="0"
        class={[
          "flex justify-center items-center py-2 px-3",
          "text-white text-base font-semibold",
          "rounded",
          "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
          disabled && "bg-gray-300",
          !disabled && "bg-brand"
        ]}
      >
        <%= cond do %>
          <% @msg == "" && @current_msg != "" -> %>
            <span>clear</span>
            <.icon name="hero-backspace-mini" class="h-4 w-4 ml-2 mt-0.5" />
          <% @msg == "" && @current_msg == "" -> %>
            <span>send</span>
            <.icon name="hero-paper-airplane-mini" class="h-4 w-4 ml-2 mt-0.5" />
          <% true -> %>
            <span>send</span>
            <.icon name="hero-paper-airplane-mini" class="h-4 w-4 ml-2 mt-0.5" />
        <% end %>
      </button>
    </form>
    """
  end

  attr :class, :string, default: nil

  def cursor(assigns) do
    ~H"""
    <svg
      version="1.1"
      class{@class}
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
      msg: "",
      current_msg: "",
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
    {:noreply, assign(socket, msg: "", current_msg: msg)}
  end

  def handle_event("message_updated", %{"msg" => msg}, socket) do
    {:noreply, assign(socket, msg: msg)}
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
