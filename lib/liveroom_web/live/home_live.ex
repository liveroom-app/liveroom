defmodule LiveroomWeb.HomeLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Hooks

  @impl true
  def render(assigns) do
    ~H"""
    <%!-- <.section class="relative bg-[url('/images/texture.png')] w-full !pt-0"> --%>
    <.section class="relative w-full !pt-0">
      <.hero />

      <div class="w-full flex flex-col items-center">
        <div class="my-4 mx-4 text-sm flex items-center gap-2 shrink-0">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-300" />
          </span>

          <p class="font-semibold">
            <%= case length(@liveroom.users) do %>
              <% 1 -> %>
                1 user
              <% n -> %>
                <%= n %> users
            <% end %>
            live in the room
          </p>
        </div>

        <.dashboard
          socket_id={@liveroom.socket_id}
          users={@liveroom.users}
          name={@liveroom.name}
          color={@liveroom.color}
          msg={@liveroom.msg}
          current_msg={@current_msg}
          camera_on={@camera_on}
          class="aspect-video w-full h-full"
        />
      </div>
    </.section>

    <.section>
      <.features />
    </.section>

    <.section class="bg-zinc-50 border-4 border-t-0 border-black rounded-b-3xl w-[calc(100%+8px)] self-center">
      <.call_to_action />
    </.section>

    <.footer />
    """
  end

  ### Components

  def hero(assigns) do
    ~H"""
    <header class="relative w-full md:max-w-7xl flex flex-col items-center gap-20 pt-8">
      <h1 class="text-3xl font-bold text-accent flex items-center gap-3">
        <img src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/liveroom_logo.png"} class="w-6 h-6" />
        Liveroom
      </h1>

      <img
        src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/cursor_left.svg"}
        class="w-20 sm:w-28 absolute top-16 -right-0 sm:-right-4 sm:top-48"
      />

      <img
        src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/cursor_right.svg"}
        class="w-20 sm:w-28 absolute top-96 sm:top-72 -left-4"
      />

      <div class="flex flex-col gap-8 items-center">
        <.heading>
          Sit next to your customers
        </.heading>

        <h3 class="font-medium text-lg sm:text-xl text-gray-500 text-center max-w-[40ch]">
          Liveroom lets you instantly join your customer in your product with live cursors, video call and interactions.
        </h3>
      </div>

      <.button_link>
        Join waitlist
      </.button_link>

      <.ellipse_1 class="absolute top-0 mx-auto -translate-x-16 -translate-y-8 blur-xl opacity-50 mix-blend-multiply" />
      <.ellipse_2 class="absolute -bottom-[400px] mx-auto -translate-x-28 blur-xl opacity-50" />
      <.ellipse_3 class="absolute -bottom-72 mx-auto translate-x-32 blur-xl opacity-50" />
    </header>
    """
  end

  attr :class, :string, default: nil

  def ellipse_1(assigns) do
    ~H"""
    <svg
      class={["w-[441px] h-[130px]", @class]}
      viewBox="0 0 441 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        opacity="0.4"
        cx="220.806"
        cy="2.47565"
        rx="98.8922"
        ry="233.666"
        transform="rotate(-68.09 220.806 2.47565)"
        fill="#CE72EF"
      />
    </svg>
    """
  end

  attr :class, :string, default: nil

  def ellipse_2(assigns) do
    ~H"""
    <svg
      class={["w-[538px] h-[397px]", @class]}
      viewBox="0 0 538 397"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        opacity="0.2"
        cx="269.28"
        cy="202.62"
        rx="159.413"
        ry="296.111"
        transform="rotate(120 269.28 202.62)"
        fill="#4F46E5"
      />
    </svg>
    """
  end

  attr :class, :string, default: nil

  def ellipse_3(assigns) do
    ~H"""
    <svg
      class={["w-[205px] h-[278px]", @class]}
      viewBox="0 0 205 278"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="102.454"
        cy="139.043"
        rx="76.8538"
        ry="153.804"
        transform="rotate(-150 102.454 139.043)"
        fill="#0E62FE"
        fill-opacity="0.16"
      />
    </svg>
    """
  end

  attr :class, :string, default: nil
  slot :inner_block, required: true

  def section(assigns) do
    ~H"""
    <section class={["flex flex-col items-center gap-10 py-24 md:gap-14 xl:py-32 px-8", @class]}>
      <%= render_slot(@inner_block) %>
    </section>
    """
  end

  slot :inner_block, required: true

  def heading(assigns) do
    ~H"""
    <h2 class="font-bold text-4xl sm:text-3xl md:text-6xl lg:text-7xl text-center leading-none">
      <%= render_slot(@inner_block) %>
    </h2>
    """
  end

  slot :inner_block, required: true

  def button_link(assigns) do
    ~H"""
    <a
      href="https://tally.so/r/wQ1EvX"
      tabindex="-1"
      class="rounded-[10px] bg-slate-900 md:hover:bg-slate-900/90 text-white text-lg font-semibold px-6 py-4"
    >
      <%= render_slot(@inner_block) %>
    </a>
    """
  end

  def features(assigns) do
    ~H"""
    <div class="w-[75%] sm:w-full">
      <ul class="mx-auto grid grid-cols-[repeat(auto-fit,_minmax(min(13rem,_100%),1fr))] max-w-3xl gap-14">
        <.feature_card class="bg-green-50">
          <:illustration>
            <img src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/cursor_left.svg"} class="w-28" />
          </:illustration>
          <:title>Live interactions</:title>
          <:description>
            Everyone has their own live cursor and can interact with the app. As if you were in the same room.
          </:description>
        </.feature_card>

        <.feature_card class="bg-teal-50">
          <:illustration>
            <video autoplay loop muted playsinline class="w-32 rounded-full">
              <source src="https://framerusercontent.com/modules/assets/ge2Me0IRiwzCbzbHBSqNP1Jy8~mzJIzKX21b2-SoRj68_OWjTBqUgxuWGnqWrSsHztBGU.webm" />
            </video>
          </:illustration>
          <:title>Video chat</:title>
          <:description>See and talk to each other in a click.</:description>
        </.feature_card>

        <.feature_card class="bg-purple-50">
          <:illustration>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-16 h-16 text-indigo-500"
            >
              <path
                d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
              </path>
            </svg>
          </:illustration>

          <:title>Direct links</:title>
          <:description>Easily join anyone anywhere in your product.</:description>
        </.feature_card>
      </ul>
    </div>
    """
  end

  def call_to_action(assigns) do
    ~H"""
    <.heading>
      Too far from your customers?
    </.heading>

    <h3 class="text-2xl font-bold text-gray-700">
      We can help with that
    </h3>

    <div class="w-full">
      <ul class="mx-auto grid grid-cols-[repeat(auto-fit,_minmax(min(13rem,_100%),1fr))] max-w-3xl gap-14">
        <.feature_card class="bg-white">
          <:illustration>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 text-indigo-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </:illustration>

          <:title>For Sales teams</:title>
          <:description>
            Drop the boring slides and passive screenshares. Bring the customer along with you in your product demos.
          </:description>
        </.feature_card>

        <.feature_card class="bg-white">
          <:illustration>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-16 h-16 text-indigo-500"
            >
              <path
                d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
              </path>
            </svg>
          </:illustration>

          <:title>For Customer support teams</:title>
          <:description>Get the perfect context and troubleshoot in real time.</:description>
        </.feature_card>
      </ul>
    </div>

    <.button_link>
      Join waitlist
    </.button_link>
    """
  end

  slot :title, required: true
  slot :description, required: true
  slot :illustration, default: nil
  attr :class, :string, default: nil

  def feature_card(assigns) do
    ~H"""
    <li class="flex flex-col gap-8">
      <div class={["h-52 rounded-[20px] grid place-items-center", @class]}>
        <%= render_slot(@illustration) %>
      </div>

      <div class="flex flex-col gap-[10px]">
        <h4 class="text-2xl font-bold">
          <%= render_slot(@title) %>
        </h4>

        <p class="text-xl font-medium text-gray-500">
          <%= render_slot(@description) %>
        </p>
      </div>
    </li>
    """
  end

  def footer(assigns) do
    ~H"""
    <footer class="p-8 grid place-items-center bg-background">
      <small class="text-sm text-gray-400">
        Follow
        <a tabindex="-1" class="font-bold" href="https://twitter.com/Liveroom_app">
          @liveroom
        </a>
        for invites
      </small>
    </footer>
    """
  end

  attr :socket_id, :string, required: true
  attr :users, :list, required: true
  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :camera_on, :boolean, required: true
  attr :msg, :string, required: true
  attr :current_msg, :string, required: true
  attr :class, :string, default: nil

  def dashboard(assigns) do
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
        <header class="p-4 flex items-start justify-between border-b-gray-200 border-b">
          <div class="flex flex-col gap-4">
            <p class="text-2xl font-semibold text-gray-400">Your product</p>

            <div class="pl-1 flex items-center gap-4">
              <.squeleton :for={_i <- 1..4} class="bg-gray-300 w-12" />
            </div>
          </div>

          <button
            id="header_button_1"
            phx-hook="BroadcastHoveredHook"
            data-hovered-by={
              (hovered_by = hovered_by_user(@socket_id, @users, "header_button_1"))[:name]
            }
            class="bg-black px-8 py-3 rounded-md md:hover:bg-zinc-600 transition-colors duration-300"
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

          <div class="bg-white border border-gray-200 w-full rounded-md shadow-md flex h-full p-6">
            <div class="flex flex-col gap-4">
              <.squeleton class="bg-slate-300 w-12" />
              <.text_input id="search_input_1" socket_id={@socket_id} users={@users} />
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

          <span :if={!@camera_on} class="text-lg"><%= String.at(@name, 0) %></span>
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
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 outline-none focus:outline-none focus:ring focus:ring-gray-100 transition-colors duration-300"
        phx-click="camera_on"
      >
        <.icon name="hero-video-camera" class="h-5 w-5 rounded md:hover:bg-dark-100 p-2" />
      </button>

      <button
        :if={@camera_on}
        id="camera-off-button"
        class="py-1.5 px-2 rounded md:hover:bg-gray-100/25 outline-none focus:outline-none focus:ring focus:ring-gray-100 transition-colors duration-300"
        phx-click="camera_off"
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
          "text-white bg-accent placeholder-violet-200",
          "border-4 border-accent outline-none rounded-l-md resize-none",
          "focus:border-accent focus:outline-none focus:ring-0 focus:shadow-2xl",
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
          "focus-visible:outline-none focus:outline-none focus:ring-accent group",
          disabled && "bg-accent/20",
          !disabled && "bg-accent"
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
        "bg-white border border-gray-200 md:hover:border-slate-500 focus:border-slate-500 focus-visible:border-slate-500",
        "ring-inset ring-slate-500 md:hover:ring-[3px] focus:ring-0 focus-visible:ring-0",
        "outline-none focus:outline-none focus-visible:outline-none",
        "rounded-md shadow-md",
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
          "opacity-0 md:group-hover:opacity-100",
          hovered_by && "opacity-100",
          "transition duration-150"
        ]}
        style={"background-color: #{hovered_by && hovered_by.color || "rgb(100 116 139)" };"}
      />
    </button>
    """
  end

  attr :id, :string, required: true
  attr :users, :list, required: true
  attr :socket_id, :string, required: true
  attr :class, :string, default: nil

  def text_input(assigns) do
    ~H"""
    <input
      id={@id}
      phx-hook="BroadcastFocusedHook"
      data-focused-by={(focused_by = focused_by_user(@socket_id, @users, @id))[:name]}
      type="text"
      class={[
        "py-1 px-2 text-xs text-gray-500 font-medium rounded",
        "outline-none focus:outline-none",
        "border border-gray-200 md:hover:border-slate-500 focus:border-slate-500",
        "ring-inset focus:ring-[3px] ring-slate-500 focus:ring-slate-500",
        focused_by && "ring-[3px]",
        @class
      ]}
      style={
        focused_by &&
          "border-color: #{focused_by.color}; --tw-ring-color: #{focused_by.color};"
      }
    />
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
  def mount(_params, _session, socket) do
    socket
    |> assign(
      msg: "",
      current_msg: "",
      camera_on: false
    )
    |> ok()
  end

  @impl true
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

  defp js_send_message(js \\ %JS{}) do
    js
    |> JS.push("send_message")
    |> JS.hide(to: "#msg-form")
  end

  defp ok(socket), do: {:ok, socket}
  defp noreply(socket), do: {:noreply, socket}
end
