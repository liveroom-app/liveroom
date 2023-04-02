defmodule LiveroomWeb.Components.Playground do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Presence

  @cursorview "cursorview"

  ### Render

  @impl true
  def render(assigns) do
    ~H"""
    <div class="w-full flex justify-center items-center">
      <div class="my-4 mx-4 text-sm flex items-center gap-2 shrink-0">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
        </span>

        <p class="font-semibold">
          <%= case length(@users) do %>
            <% 1 -> %>
              1 user
            <% n -> %>
              <%= n %> users
          <% end %>
          live in the room
        </p>
      </div>
    </div>

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
              id={"cursor_blink_#{user.socket_id}"}
              style={"background-color: #{user.color}25; border-color: #{user.color};"}
              class={[
                not user.is_halo_key_pressed && not user.is_cursor_pressed && "scale-0",
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

          <.dashboard
            socket_id={@socket_id}
            users={@users}
            name={@name}
            color={@color}
            msg={@msg}
            current_msg={@current_msg}
            camera_on={@camera_on}
          />
        </ul>
      </div>
    </div>
    """
  end

  ### Components

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
      <filter color-interpolation-filters="sRGB">
        <feDropShadow dx="1" dy="1" stdDeviation="0.5" flood-opacity="0.2" />
      </filter>

      <polygon points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6" />
      <polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5" />
      <%!-- <polygon filter="url(#shadow)" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6" />
      <polygon filter="url(#shadow)" points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5" /> --%>
    </svg>
    """
  end

  attr :socket_id, :string, required: true
  attr :users, :list, required: true
  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :camera_on, :boolean, required: true
  attr :msg, :string, required: true
  attr :current_msg, :string, required: true

  def dashboard(assigns) do
    ~H"""
    <div class="relative bg-zinc-50 h-full grid grid-cols-[minmax(150px,_25%)_1fr] border-4 border-violet-700/60 shadow rounded-3xl overflow-hidden">
      <nav class="bg-background px-4 py-6 border-r-gray-200 border-r">
        <p class="uppercase text-gray-300 font-semibold">Menu</p>

        <ul class="flex flex-col items-start gap-1 mt-8">
          <.sidebar_navigation_link
            id="sidebar_navigation_link_1"
            socket_id={@socket_id}
            users={@users}
          />
          <.sidebar_navigation_link
            id="sidebar_navigation_link_2"
            socket_id={@socket_id}
            users={@users}
          />
          <.sidebar_navigation_link
            id="sidebar_navigation_link_3"
            socket_id={@socket_id}
            users={@users}
          />
          <.sidebar_navigation_link
            id="sidebar_navigation_link_4"
            socket_id={@socket_id}
            users={@users}
          />
        </ul>
      </nav>

      <div class="flex flex-col">
        <header class="p-4 flex items-center justify-between border-b-gray-200 border-b">
          <p class="text-2xl font-semibold text-gray-400">Your product</p>

          <button
            id="header_button_1"
            phx-hook="BroadcastHoveredHook"
            data-hovered-by={
              (hovered_by = hovered_by_user(@socket_id, @users, "header_button_1"))[:name]
            }
            class="bg-black px-8 py-3 rounded-md hover:bg-zinc-600 duration-300 transition-colors"
            style={hovered_by && "background-color: #{hovered_by.color};"}
            tabindex="-1"
          >
            <.squeleton class="bg-white" />
          </button>
        </header>

        <div class="p-4 flex flex-col gap-4 h-full">
          <div class="flex gap-4 justify-start">
            <.card_link id="card_link_1" socket_id={@socket_id} users={@users} />
            <.card_link id="card_link_2" socket_id={@socket_id} users={@users} />
            <.card_link id="card_link_3" socket_id={@socket_id} users={@users} />
          </div>

          <div class="bg-white border border-gray-200 w-full rounded-md flex h-full p-6">
            <div class="flex flex-col gap-4">
              <.squeleton class="bg-slate-300 w-12" />
              <.squeleton class="bg-gray-200 w-36" />
              <input
                id="search_input_1"
                phx-hook="BroadcastFocusedHook"
                data-focused-by={
                  (focused_by = focused_by_user(@socket_id, @users, "search_input_1"))[:name]
                }
                type="text"
                class="py-1 px-2 text-xs text-gray-500 font-medium rounded outline-none focus:outline-none focus:ring-0 border-2 border-gray-300 focus:border-slate-500 placeholder-gray-300"
                style={focused_by && "border-color: #{focused_by.color};"}
                placeholder="search..."
              />
            </div>
          </div>
        </div>
      </div>

      <.pill name={@name} color={@color} camera_on={@camera_on} msg={@msg} current_msg={@current_msg} />
    </div>
    """
  end

  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :camera_on, :boolean, required: true
  attr :msg, :string, required: true
  attr :current_msg, :string, required: true

  def pill(assigns) do
    ~H"""
    <div class="absolute bottom-4 inset-x-0 flex justify-center items-center">
      <div class="p-1 bg-violet-800/50 backdrop-blur-sm text-white flex justify-around items-stretch gap-6 rounded-full shadow-lg">
        <video
          loop
          muted
          autoplay
          playsinline
          class="w-16 h-16 bg-gray-400 rounded-full shadow-2xl"
          src={LiveroomWeb.Endpoint.static_url() <> ~p"/videos/alex_avatar_video.webm"}
        />

        <.pill_toolbar camera_on={@camera_on} current_msg={@current_msg} />

        <div
          style={"background-color: #{@color};"}
          class="w-16 h-16 flex justify-center items-center font-bold text-white bg-gray-200/25 rounded-full shadow-2xl overflow-hidden"
        >
          <video
            :if={@camera_on}
            id="local-video"
            phx-hook="JoinCallHook"
            phx-click="join_call"
            style="transform: rotateY(180deg) scale(1.5);"
            playsinline
            autoplay
            muted
          />

          <span :if={!@camera_on}><%= String.at(@name, 0) %></span>
        </div>
      </div>

      <.msg_form
        msg={@msg}
        current_msg={@current_msg}
        class="hidden absolute bottom-[55px] inset-x-0"
      />
    </div>
    """
  end

  attr :camera_on, :boolean, required: true
  attr :current_msg, :string, required: true

  def pill_toolbar(assigns) do
    ~H"""
    <ul class="flex justify-between items-center gap-4">
      <button
        :if={!@camera_on}
        id="camera-on-button"
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-300"
        phx-click="camera_on"
      >
        <.icon name="hero-video-camera" class="h-5 w-5 rounded md:hover:bg-dark-100 p-2" />
      </button>

      <button
        :if={@camera_on}
        id="camera-off-button"
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-300"
        phx-click="camera_off"
      >
        <.icon name="hero-video-camera-slash" class="h-5 w-5 rounded md:hover:bg-dark-100 p-2" />
      </button>

      <button
        id="mic-button"
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-300"
      >
        <.icon name="hero-microphone" class="h-5 w-5 rounded md:hover:bg-dark-100 p-2" />
      </button>

      <button
        id="chat-button"
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-300"
        phx-click={
          %JS{}
          |> JS.toggle(to: "#msg-form", display: "flex")
          |> then(
            &case @current_msg == "" do
              true -> JS.focus(&1, to: "#msg-form-input")
              false -> JS.focus(&1, to: "#msg-form-submit-button")
            end
          )
        }
      >
        <.icon name="hero-chat-bubble-left" class="h-5 w-5" />
      </button>
    </ul>
    """
  end

  attr :msg, :string, required: true
  attr :current_msg, :string, required: true
  attr :class, :string, default: nil

  def msg_form(assigns) do
    ~H"""
    <form
      id="msg-form"
      phx-change="message_updated"
      phx-submit={js_send_message()}
      phx-keyup={js_send_message()}
      phx-key="Enter"
      class={[
        "w-fit mx-auto flex justify-center items-stretch p-5",
        @class
      ]}
    >
      <input
        id="msg-form-input"
        name="msg"
        type="text"
        tabindex="1"
        placeholder="Say something"
        aria-label="Your message"
        class={[
          "flex-1 min-w-[12.2rem] appearance-none py-1 px-2",
          "text-white bg-violet-800/50 placeholder-violet-200",
          "border-4 border-violet-600/10 outline-none rounded-l-md resize-none",
          "focus:border-violet-600/10 focus:outline-none focus:ring-0 focus:shadow-2xl",
          @msg == "" && "bg-gray-100/50",
          "text-sm"
        ]}
      />

      <button
        id="msg-form-submit-button"
        type="submit"
        disabled={disabled = @msg == "" && @current_msg == ""}
        tabindex="2"
        class={[
          "flex justify-center items-center py-1 px-2",
          "text-gray-100 text-base font-semibold",
          "rounded-r",
          "focus-visible:outline-none focus:outline-none focus:ring-violet-500 group",
          disabled && "bg-violet-800/20",
          !disabled && "bg-violet-800/50"
        ]}
      >
        <%= cond do %>
          <% @msg == "" && @current_msg != "" -> %>
            <.icon name="hero-backspace-mini" class="h-4 w-4 m-1" />
          <% @msg == "" && @current_msg == "" -> %>
            <.icon
              name="hero-paper-airplane-mini"
              class="h-4 w-4 group-focus:translate-x-1 group-focus:-translate-y-1 group-focus:rotate-[-25deg] transition-transform duration-300"
            />
          <% true -> %>
            <.icon
              name="hero-paper-airplane-mini"
              class="h-4 w-4 group-focus:translate-x-1 group-focus:-translate-y-1 group-focus:rotate-[-25deg] transition-transform duration-300"
            />
        <% end %>
      </button>
    </form>
    """
  end

  attr :id, :string, required: true
  attr :socket_id, :string, required: true
  attr :users, :list, required: true

  def sidebar_navigation_link(assigns) do
    ~H"""
    <li
      id={@id}
      phx-hook="BroadcastHoveredHook"
      data-hovered-by={(hovered_by = hovered_by_user(@socket_id, @users, @id))[:name]}
      style={
        hovered_by && "border-color: #{hovered_by.color}; background-color: #{hovered_by.color}50;"
      }
      class={[
        "w-full p-4 cursor-pointer",
        "border-l-2 border-transparent hover:border-gray-500 hover:bg-violet-50",
        "transition-colors duration-300"
      ]}
    >
      <.squeleton class="bg-slate-300" />
    </li>
    """
  end

  attr :id, :string, required: true
  attr :socket_id, :string, required: true
  attr :users, :list, required: true
  attr :class, :string, default: nil
  attr :rest, :global, default: %{}

  def card_link(assigns) do
    ~H"""
    <button
      id={@id}
      phx-hook="BroadcastHoveredHook"
      data-hovered-by={(hovered_by = hovered_by_user(@socket_id, @users, @id))[:name]}
      style={hovered_by && "border-color: #{hovered_by.color}; --tw-ring-color: #{hovered_by.color};"}
      class={[
        "relative cursor-pointer",
        "bg-white border border-gray-200 hover:border-slate-500",
        "ring-inset hover:ring-[3px] ring-slate-500",
        "rounded-md",
        "flex flex-col p-6 items-start gap-4",
        "transition-colors duration-150 group",
        hovered_by && "ring-[3px]"
      ]}
      {@rest}
    >
      <.squeleton class="bg-gray-200 w-10" />
      <.squeleton class="bg-slate-300 w-24" />

      <div
        class={[
          "absolute top-2 right-2 w-4 h-4 bg-transparent rounded-full",
          "opacity-0 group-hover:opacity-100",
          hovered_by && "opacity-100",
          "transition duration-150"
        ]}
        style={"background-color: #{hovered_by && hovered_by.color || "rgb(100 116 139)" };"}
      />
    </button>
    """
  end

  defp hovered_by_user(socket_id, users, el_id) do
    Enum.find(users, &(MapSet.member?(&1.hovered_elements, el_id) && &1.socket_id != socket_id))
  end

  defp focused_by_user(socket_id, users, el_id) do
    Enum.find(users, &(MapSet.member?(&1.focused_elements, el_id) && &1.socket_id != socket_id))
  end

  attr :class, :string, default: nil

  def squeleton(assigns) do
    ~H"""
    <div class={["w-12 h-2 rounded-full pointer-events-none", @class]} />
    """
  end

  ### Server

  @impl true
  def mount(_params, session, socket) do
    socket_id = socket.id

    name = session["name"]
    color = session["color"]

    initial_users =
      if connected?(socket) do
        Presence.track(self(), @cursorview, socket_id, %{
          socket_id: socket_id,
          name: name,
          color: color,
          camera_on: false,
          msg: "",
          x: 50,
          y: 50,
          is_cursor_pressed: false,
          is_halo_key_pressed: false,
          hovered_elements: MapSet.new(),
          focused_elements: MapSet.new()
        })

        LiveroomWeb.Endpoint.subscribe(@cursorview)

        list_users()
      else
        []
      end

    socket
    |> assign(
      socket_id: socket_id,
      name: name,
      color: color,
      camera_on: false,
      msg: "",
      current_msg: "",
      users: initial_users
    )
    |> ok()
  end

  @impl true
  def handle_event("cursor-move", %{"x" => x, "y" => y}, socket) do
    send_event(:cursor_moved, socket.id, x, y)
    {:noreply, socket}
  end

  def handle_event("cursor-click-down", _, socket) do
    send_event(:cursor_click_down, socket.id)
    {:noreply, socket}
  end

  def handle_event("cursor-click-up", _, socket) do
    send_event(:cursor_click_up, socket.id)
    {:noreply, socket}
  end

  def handle_event("element-hovered", %{"id" => id}, socket) do
    send_event(:element_hovered, socket.id, id)
    {:noreply, socket}
  end

  def handle_event("element-not-hovered", %{"id" => id}, socket) do
    send_event(:element_not_hovered, socket.id, id)
    {:noreply, socket}
  end

  def handle_event("element-focused", %{"id" => id}, socket) do
    send_event(:element_focused, socket.id, id)
    {:noreply, socket}
  end

  def handle_event("element-not-focused", %{"id" => id}, socket) do
    send_event(:element_not_focused, socket.id, id)
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

  def handle_event("camera_on", _, socket) do
    {:noreply, assign(socket, camera_on: true)}
  end

  def handle_event("camera_off", _, socket) do
    {:noreply, assign(socket, camera_on: false)}
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
    |> JS.hide(to: "#msg-form")
  end

  defp send_event(:cursor_moved, socket_id, x, y) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{x: x, y: y}))
  end

  defp send_event(:element_hovered, socket_id, el_id) do
    Presence.update(
      self(),
      @cursorview,
      socket_id,
      &Map.merge(&1, %{hovered_elements: MapSet.put(&1.hovered_elements, el_id)})
    )
  end

  defp send_event(:element_not_hovered, socket_id, el_id) do
    Presence.update(
      self(),
      @cursorview,
      socket_id,
      &Map.merge(&1, %{hovered_elements: MapSet.delete(&1.hovered_elements, el_id)})
    )
  end

  defp send_event(:element_focused, socket_id, el_id) do
    Presence.update(
      self(),
      @cursorview,
      socket_id,
      &Map.merge(&1, %{focused_elements: MapSet.put(&1.focused_elements, el_id)})
    )
  end

  defp send_event(:element_not_focused, socket_id, el_id) do
    Presence.update(
      self(),
      @cursorview,
      socket_id,
      &Map.merge(&1, %{focused_elements: MapSet.delete(&1.focused_elements, el_id)})
    )
  end

  defp send_event(:message_sent, socket_id, msg) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{msg: msg}))
  end

  defp send_event(:cursor_click_down, socket_id) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{is_cursor_pressed: true}))
  end

  defp send_event(:cursor_click_up, socket_id) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{is_cursor_pressed: false}))
  end

  defp send_event(:halo_key_down, socket_id) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{is_halo_key_pressed: true}))
  end

  defp send_event(:halo_key_up, socket_id) do
    Presence.update(self(), @cursorview, socket_id, &Map.merge(&1, %{is_halo_key_pressed: false}))
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
