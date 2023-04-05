defmodule LiveroomWeb.Components.InteractiveDashboard do
  use LiveroomWeb, :live_component

  alias LiveroomWeb.Hooks

  attr :socket_id, :string, required: true
  attr :users, :list, required: true
  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :msg, :string, required: true
  attr :class, :string, default: nil

  @impl true
  def render(assigns) do
    ~H"""
    <div class={[
      "hidden relative sm:grid grid-cols-[minmax(150px,_25%)_1fr]",
      "bg-zinc-50 border-4 border-accent shadow-lg rounded-xl overflow-hidden",
      @class
    ]}>
      <nav class="bg-background px-4 py-6 border-r-gray-200 border-r">
        <p class="uppercase text-gray-300 font-semibold">Menu</p>

        <ul class="flex flex-col items-start gap-1 mt-8">
          <.sidebar_navigation_link
            id="sidebar_navigation_link_1"
            hovered_by={hovered_by_user(@socket_id, @users, "sidebar_navigation_link_1")}
          />
          <.sidebar_navigation_link
            id="sidebar_navigation_link_2"
            hovered_by={hovered_by_user(@socket_id, @users, "sidebar_navigation_link_2")}
          />
          <.sidebar_navigation_link
            id="sidebar_navigation_link_3"
            hovered_by={hovered_by_user(@socket_id, @users, "sidebar_navigation_link_3")}
          />
          <.sidebar_navigation_link
            id="sidebar_navigation_link_4"
            hovered_by={hovered_by_user(@socket_id, @users, "sidebar_navigation_link_4")}
          />
        </ul>
      </nav>

      <div class="flex flex-col">
        <header class="p-4 flex items-start justify-between border-b-gray-200 border-b">
          <div class="flex flex-col gap-4">
            <p class="text-2xl font-semibold text-gray-400">Your product</p>

            <div class="pl-1 flex items-center gap-4">
              <.squeleton :for={_i <- 1..4} class="bg-gray-300 w-12" />
            </div>
          </div>

          <.header_button
            id="header_button_1"
            hovered_by={hovered_by_user(@socket_id, @users, "header_button_1")}
          />
        </header>

        <div class="p-4 flex flex-col gap-4 h-full">
          <div class="flex gap-4 justify-start">
            <.card_link
              id="card_link_1"
              hovered_by={hovered_by_user(@socket_id, @users, "card_link_1")}
            />
            <.card_link
              id="card_link_2"
              hovered_by={hovered_by_user(@socket_id, @users, "card_link_2")}
            />
            <.card_link
              id="card_link_3"
              hovered_by={hovered_by_user(@socket_id, @users, "card_link_3")}
            />
          </div>

          <div class="bg-white border border-gray-200 w-full rounded-md shadow-md flex h-full p-6">
            <div class="flex flex-col gap-4">
              <.squeleton class="bg-slate-300 w-12" />
              <.interactive_text_input
                id="interactive_form"
                input_id="search_input_1"
                focused_by={focused_by_user(@socket_id, @users, "search_input_1")}
                inputs_by={inputs_by_user(@socket_id, @users, "search_input_1")}
                search={@search}
                myself={@myself}
              />
            </div>
          </div>
        </div>
      </div>

      <.pill
        name={@name}
        color={@color}
        camera_on={@camera_on}
        msg={@msg}
        current_msg={@current_msg}
        myself={@myself}
      />
    </div>
    """
  end

  ### Components

  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :camera_on, :boolean, required: true
  attr :msg, :string, required: true
  attr :current_msg, :string, required: true
  attr :myself, :any, required: true

  def pill(assigns) do
    ~H"""
    <div class="absolute bottom-2 inset-x-0 flex justify-center items-center">
      <div class="p-1 bg-accent backdrop-blur-sm text-white flex justify-around items-stretch gap-6 rounded-full shadow-lg">
        <video
          loop
          muted
          autoplay
          playsinline
          class="w-16 h-16 bg-gray-400 rounded-full shadow-2xl"
          src={LiveroomWeb.Endpoint.static_url() <> ~p"/videos/alex_avatar_video.webm"}
        />

        <.pill_toolbar camera_on={@camera_on} current_msg={@current_msg} myself={@myself} />

        <div
          style={"background-color: #{@color};"}
          class="w-16 h-16 flex justify-center items-center font-bold text-white bg-gray-200/25 rounded-full shadow-2xl overflow-hidden"
        >
          <video
            :if={@camera_on}
            id="local-video"
            phx-hook="JoinCallHook"
            style="transform: rotateY(180deg) scale(1.5);"
            playsinline
            autoplay
            muted
          />

          <span :if={!@camera_on} class="text-lg"><%= String.at(@name, 0) %></span>
        </div>
      </div>

      <.msg_form
        msg={@msg}
        current_msg={@current_msg}
        myself={@myself}
        class="hidden absolute bottom-[55px] inset-x-0"
      />
    </div>
    """
  end

  attr :camera_on, :boolean, required: true
  attr :current_msg, :string, required: true
  attr :myself, :any, required: true

  def pill_toolbar(assigns) do
    ~H"""
    <ul class="flex justify-between items-center gap-4">
      <button
        :if={!@camera_on}
        id="camera-on-button"
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 outline-none focus:outline-none focus:ring focus:ring-gray-100 transition-colors duration-300"
        phx-click={JS.push("camera_on", target: @myself)}
      >
        <.icon name="hero-video-camera" class="h-5 w-5 rounded md:hover:bg-dark-100 p-2" />
      </button>

      <button
        :if={@camera_on}
        id="camera-off-button"
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 outline-none focus:outline-none focus:ring focus:ring-gray-100 transition-colors duration-300"
        phx-click={JS.push("camera_off", target: @myself)}
      >
        <.icon name="hero-video-camera-slash" class="h-5 w-5 rounded md:hover:bg-dark-100 p-2" />
      </button>

      <button
        id="mic-button"
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 outline-none focus:outline-none focus:ring focus:ring-gray-100 transition-colors duration-300"
      >
        <.icon name="hero-microphone" class="h-5 w-5 rounded md:hover:bg-dark-100 p-2" />
      </button>

      <button
        id="chat-button"
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 outline-none focus:outline-none focus:ring focus:ring-gray-100 transition-colors duration-300"
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
  attr :myself, :any, required: true

  def msg_form(assigns) do
    ~H"""
    <form
      id="msg-form"
      phx-change={JS.push("message_updated", target: @myself)}
      phx-submit={js_send_message(@myself)}
      phx-keyup={js_send_message(@myself)}
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
          "text-sm text-white bg-accent placeholder-violet-200",
          "border-4 border-accent outline-none rounded-l-md resize-none",
          "focus:border-accent focus:outline-none focus:ring-0 focus:shadow-2xl"
        ]}
      />

      <button
        id="msg-form-submit-button"
        type="submit"
        disabled={@msg == "" && @current_msg == ""}
        tabindex="2"
        class={[
          "flex justify-center items-center py-1 px-2 rounded-r",
          "text-gray-100 text-base font-semibold",
          "focus-visible:outline-none focus:outline-none focus:ring-accent group",
          "bg-accent disabled:bg-accent/50"
        ]}
      >
        <%= cond do %>
          <% @msg == "" && @current_msg != "" -> %>
            <.icon name="hero-backspace-mini" class="h-4 w-4 m-1" />
          <% true -> %>
            <.icon
              name="hero-paper-airplane-mini"
              class="h-4 w-4 group-focus:-translate-x-0.5 group-focus:rotate-[-25deg] transition-transform duration-300"
            />
        <% end %>
      </button>
    </form>
    """
  end

  attr :id, :string, required: true
  attr :hovered_by, :map, required: true

  def sidebar_navigation_link(assigns) do
    ~H"""
    <li
      id={@id}
      phx-hook="BroadcastHoveredHook"
      data-hovered-by={@hovered_by[:name]}
      style={
        @hovered_by && "border-color: #{@hovered_by.color}; background-color: #{@hovered_by.color}50;"
      }
      class={[
        "relative w-full p-4",
        "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-transparent before:md:hover:bg-gray-500",
        "rounded md:hover:bg-violet-50 overflow-hidden",
        "cursor-pointer transition-colors duration-300"
      ]}
    >
      <.squeleton class="bg-slate-300" />
    </li>
    """
  end

  attr :id, :string, required: true
  attr :hovered_by, :map, required: true
  attr :class, :string, default: nil
  attr :rest, :global, default: %{}

  def header_button(assigns) do
    ~H"""
    <button
      id={@id}
      phx-hook="BroadcastHoveredHook"
      data-hovered-by={@hovered_by[:name]}
      class="py-3 px-8 bg-black md:hover:bg-zinc-600 rounded-md transition-colors duration-300"
      style={@hovered_by && "background-color: #{@hovered_by.color};"}
      tabindex="-1"
    >
      <.squeleton class="bg-white" />
    </button>
    """
  end

  attr :id, :string, required: true
  attr :hovered_by, :map, required: true
  attr :class, :string, default: nil
  attr :rest, :global, default: %{}

  def card_link(assigns) do
    ~H"""
    <button
      id={@id}
      phx-hook="BroadcastHoveredHook"
      data-hovered-by={@hovered_by[:name]}
      style={
        @hovered_by && "border-color: #{@hovered_by.color}; --tw-ring-color: #{@hovered_by.color};"
      }
      class={[
        "relative cursor-pointer",
        "bg-white border border-gray-200 md:hover:border-slate-500 focus:border-slate-500 focus-visible:border-slate-500",
        "ring-inset ring-slate-500 md:hover:ring-[3px] focus:ring-0 focus-visible:ring-0",
        "outline-none focus:outline-none focus-visible:outline-none",
        "rounded-md shadow-md",
        "flex flex-col p-6 items-start gap-4",
        "transition-colors duration-150 group",
        @hovered_by && "ring-[3px]"
      ]}
      {@rest}
    >
      <.squeleton class="bg-gray-200 w-10" />
      <.squeleton class="bg-slate-300 w-24" />

      <div
        class={[
          "absolute top-2 right-2 w-4 h-4 bg-transparent rounded-full",
          "opacity-0 md:group-hover:opacity-100",
          @hovered_by && "opacity-100",
          "transition duration-150 pointer-events-none"
        ]}
        style={"background-color: #{@hovered_by && @hovered_by.color || "rgb(100 116 139)" };"}
      />
    </button>
    """
  end

  attr :id, :string, required: true
  attr :input_id, :string, required: true
  attr :focused_by, :map, required: true
  attr :inputs_by, :map, required: true
  attr :search, :string, required: true
  attr :myself, :any, required: true
  attr :class, :string, default: nil

  def interactive_text_input(assigns) do
    assigns =
      assign(
        assigns,
        :inputs_by_input,
        assigns.inputs_by && assigns.inputs_by.inputs[assigns.input_id]
      )

    ~H"""
    <form
      id={@id}
      class={["relative", @class]}
      phx-change={JS.push("search_change_" <> @input_id, target: @myself)}
      phx-throttle="300"
    >
      <!-- Prevent implicit submission of the form when hitting the Enter key -->
      <button type="submit" disabled style="display: none" aria-hidden="true"></button>

      <%!-- NOTE: Weird bug with that, the form keeps reloading in the dom --%>
      <%!-- <input hidden type="text" name="id" value={@input_id} /> --%>

      <input
        id={@input_id}
        name="search"
        phx-hook="BroadcastFocusedHook"
        data-focused-by={@focused_by[:name]}
        data-inputs-by={@inputs_by[:name]}
        type="text"
        class={[
          "py-1 px-2",
          "text-xs text-gray-500 font-medium placeholder:text-gray-300 rounded",
          "outline-none focus:outline-none focus:ring-0",
          "border border-gray-200 md:hover:border-slate-500 focus:border-slate-500",
          "ring-inset focus:ring-[3px] ring-slate-500 focus:ring-slate-500",
          @focused_by && "ring-[3px]"
        ]}
        style={
          @focused_by && "border-color: #{@focused_by.color}; --tw-ring-color: #{@focused_by.color};"
        }
      />
      <span
        :if={
          @inputs_by_input &&
            @inputs_by_input.type == :text &&
            @inputs_by_input.value != "" &&
            @search == ""
        }
        class="absolute left-0 inset-y-0 text-xs px-2 flex items-center"
        style={"background-color: #{@inputs_by.color}15; color: #{@inputs_by.color};"}
      >
        <%= @inputs_by_input.value %>
      </span>
    </form>
    """
  end

  attr :class, :string, default: nil

  def squeleton(assigns) do
    ~H"""
    <div class={["w-12 h-2 rounded-full pointer-events-none", @class]} />
    """
  end

  ### Server

  @impl true
  def mount(socket) do
    socket
    |> assign(
      search: "",
      msg: "",
      current_msg: "",
      camera_on: false
    )
    |> ok()
  end

  @impl true
  def update(assigns, socket) do
    socket
    |> assign(assigns)
    |> ok()
  end

  @impl true
  def handle_event("search_change_" <> input_id, %{"search" => search}, socket) do
    Hooks.Liveroom.broadcast_user_changes(
      socket,
      &%{inputs: Map.put(&1.inputs, input_id, %{type: :text, value: search})}
    )

    {:noreply, assign(socket, search: search)}
  end

  def handle_event("send_message", %{"msg" => msg}, socket) do
    Hooks.Liveroom.broadcast_user_changes(socket, %{msg: msg})

    socket
    |> assign(msg: "", current_msg: msg)
    |> noreply()
  end

  def handle_event("message_updated", %{"msg" => msg}, socket) do
    socket
    |> assign(msg: msg)
    |> noreply()
  end

  def handle_event("camera_on", _, socket) do
    socket
    |> assign(camera_on: true)
    |> noreply()
  end

  def handle_event("camera_off", _, socket) do
    socket
    |> assign(camera_on: false)
    |> noreply()
  end

  ### Helpers

  defp hovered_by_user(socket_id, users, el_id) do
    Enum.find(users, &(MapSet.member?(&1.hovered_elements, el_id) && &1.socket_id != socket_id))
  end

  defp focused_by_user(socket_id, users, el_id) do
    Enum.find(users, &(MapSet.member?(&1.focused_elements, el_id) && &1.socket_id != socket_id))
  end

  defp inputs_by_user(socket_id, users, el_id) do
    Enum.find(users, &(&1.inputs[el_id] && &1.socket_id != socket_id))
  end

  defp js_send_message(js \\ %JS{}, myself) do
    js
    |> JS.push("send_message", target: myself)
    |> JS.hide(to: "#msg-form")
  end

  defp ok(socket), do: {:ok, socket}
  defp noreply(socket), do: {:noreply, socket}
end
