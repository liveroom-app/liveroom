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
    <div class="w-full flex flex-col items-stretch space-y-4">
      <div class="aspect-video w-full">
        <ul id="playground_cursors" phx-hook="TrackCursorsHook" class="w-full h-full list-none ">
          <li
            :for={user <- @users}
            style={"color: #{user.color}; left: calc(#{user.x}% - 11px); top: calc(#{user.y}% - 10px);"}
            class={[
              "absolute flex flex-col justify-start items-start pt-[24px]",
              "pointer-events-none select-none"
            ]}
          >
            <div
              id="cursor_blink"
              style={"background-color: #{user.color}25; border-color: #{user.color};"}
              class={[
                not user.is_halo_key_pressed && "scale-0",
                "z-40 absolute -top-14 -left-14 h-32 w-32 border rounded-full shadow-md",
                "transition-transform duration-100 ease-out"
              ]}
            />

            <.cursor :if={user.socket_id != @socket_id} class="z-50 absolute top-0 left-0 shadow-2xl" />

            <%= if user.msg == "" do %>
              <span
                :if={user.socket_id != @socket_id}
                style={"background-color: #{user.color};"}
                class="z-50 ml-[30px] py-1 px-3 text-sm text-brand font-semibold whitespace-nowrap rounded-full shadow-2xl"
              >
                <%= user.name %>
              </span>
            <% else %>
              <span
                style={"background-color: #{user.color};"}
                class="z-50 ml-[30px] max-w-[50ch] py-1 px-3 text-sm truncate text-brand font-semibold whitespace-nowrap rounded-full shadow-2xl"
              >
                <%= user.msg %>
              </span>
            <% end %>
          </li>

          <.dashboard />
        </ul>
      </div>

      <.msg_form msg={@msg} current_msg={@current_msg} />
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
      phx-submit={js_send_message()}
      phx-keyup={js_send_message()}
      phx-key="Enter"
      class={[
        "flex items-stretch space-x-4 text-xs p-5",
        @class
      ]}
    >
      <input
        id="msg"
        name="msg"
        type="text"
        tabindex="1"
        placeholder="Say something"
        aria-label="Your message"
        class={[
          "flex-1 appearance-none py-1 px-2",
          "text-gray-600 bg-gray-50 placeholder-gray-400",
          "border-gray-300 outline-none rounded-md resize-none",
          "focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
          @msg == "" && "bg-gray-50/50"
        ]}
      />

      <button
        type="submit"
        disabled={disabled = @msg == "" && @current_msg == ""}
        tabindex="0"
        class={[
          "flex justify-center items-center py-2 px-4",
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
      class={["-rotate-[25deg]", @class]}
      width="30px"
      height="30px"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 21 21"
      fill="currentColor"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <filter id="shadow" color-interpolation-filters="sRGB">
        <feDropShadow dx="1" dy="1" stdDeviation="0.5" flood-opacity="0.2" />
      </filter>

      <polygon points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6" />
      <polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5" />
      <%!-- <polygon filter="url(#shadow)" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6" />
      <polygon filter="url(#shadow)" points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5" /> --%>
    </svg>
    """
  end

  def dashboard(assigns) do
    ~H"""
    <div class="relative bg-zinc-50 h-full grid grid-cols-[minmax(150px,_25%)_1fr] border-4 border-violet-500 rounded-3xl overflow-hidden">
      <nav class="bg-background px-4 py-6 border-r-gray-200 border-r">
        <p class="uppercase text-gray-300 font-semibold">Menu</p>

        <ul class="flex flex-col items-start gap-1 mt-8">
          <.sidebar_navigation_link />
          <.sidebar_navigation_link />
          <.sidebar_navigation_link />
          <.sidebar_navigation_link />
        </ul>
      </nav>

      <div class="flex flex-col">
        <header class="p-4 flex items-center justify-between border-b-gray-200 border-b">
          <p class="text-2xl font-semibold text-gray-400">Your product</p>

          <button class="bg-black px-8 py-3 rounded-md hover:bg-zinc-600 duration-300 transition-colors">
            <.squeleton class="bg-white" />
          </button>
        </header>

        <div class="flex gap-4 justify-start w-full p-4">
          <.card_link />
          <.card_link />
          <.card_link />
        </div>
      </div>

      <div class="absolute bottom-8 p-2 bg-indigo-600 flex items-center gap-4 rounded-lg left-1/2 -translate-x-1/2">
        <div class="bg-slate-500 w-8 h-8" />
        <div class="bg-slate-500 w-8 h-8" />
        <div class="bg-slate-500 w-8 h-8" />
        <div class="bg-slate-500 w-8 h-8" />

        <button class="border border-white px-4 py-2 text-white rounded-[4px]">
          Leave
        </button>
      </div>
    </div>
    """
  end

  def sidebar_navigation_link(assigns) do
    ~H"""
    <li class=" hover:bg-violet-50 duration-300 transition-colors p-4 w-full cursor-pointer border-l-2 border-transparent hover:border-gray-500">
      <.squeleton class="bg-slate-300" />
    </li>
    """
  end

  attr :class, :string, default: nil

  def card_link(assigns) do
    ~H"""
    <a class="bg-white border border-gray-200 rounded-md flex flex-col p-6 items-start gap-4">
      <.squeleton class="bg-gray-200 w-10" />
      <.squeleton class="bg-slate-300 w-24" />
    </a>
    """
  end

  attr :class, :string, default: nil

  def squeleton(assigns) do
    ~H"""
    <div class={["w-12 h-2 rounded-full", @class]} />
    """
  end

  ### Server

  @impl true
  def mount(_params, session, socket) do
    name = session["name"] || Names.generate()
    socket_id = socket.id

    initial_users =
      if connected?(socket) do
        Presence.track(self(), @cursorview, socket_id, %{
          socket_id: socket_id,
          x: 50,
          y: 50,
          msg: "",
          name: name,
          color: Colors.get_random_color(),
          is_halo_key_pressed: false
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

  def handle_event("halo-key-down", _, socket) do
    send_event(:halo_key_down, socket.id)
    {:noreply, socket}
  end

  def handle_event("halo-key-up", _, socket) do
    send_event(:halo_key_up, socket.id)
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
    |> assign(users: list_users())
    |> noreply()
  end

  ### Helpers

  defp js_send_message(js \\ %JS{}) do
    js
    |> JS.push("send_message")
    |> JS.focus(to: "textarea#msg")
  end

  defp send_event(:cursor_moved, socket_id, x, y) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{x: x, y: y}))
  end

  defp send_event(:halo_key_down, socket_id) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{is_halo_key_pressed: true}))
  end

  defp send_event(:halo_key_up, socket_id) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{is_halo_key_pressed: false}))
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
