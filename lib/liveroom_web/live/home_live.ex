defmodule LiveroomWeb.HomeLive do
  alias LiveroomWeb.Components.Playground
  use LiveroomWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <.section class="bg-zinc-50 w-full">
      <.hero />

      <div
        id="playground_container"
        class="hidden w-full max-w-4xl border-4 border-black rounded-3xl sm:flex flex-col"
      >
        <div class="px-5 py-5">
          <%= live_render(@socket, Playground, id: "playground-#{@socket.id}") %>
        </div>

        <div class="flex flex-col-reverse sm:flex-row border-t-4 w-full border-black py-4 px-7 justify-between gap-2">
          <p class="uppercase tracking-widest font-bold">Playground</p>

          <div class="flex items-center gap-2 shrink-0">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
              <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-300" />
            </span>
            <p class="">2 users live in the room</p>
          </div>
        </div>
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

  def hero(assigns) do
    ~H"""
    <header class="flex relative flex-col items-center gap-10 md:gap-20 w-full md:max-w-7xl">
      <h1 class="text-3xl font-bold text-accent flex items-center gap-3">
        <img src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/liveroom_logo.png"} class="w-6 h-6" />
        Liveroom
      </h1>

      <img
        src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/cursor_left.svg"}
        class="w-20 sm:w-28 absolute top-32 -right-0 sm:-right-4 sm:top-48"
      />

      <img
        src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/cursor_right.svg"}
        class="w-20 sm:w-28 absolute top-72 -left-4"
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
    </header>
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
      class="rounded-[10px] bg-slate-900 text-white text-lg font-semibold px-6 py-4"
    >
      <%= render_slot(@inner_block) %>
    </a>
    """
  end

  def features(assigns) do
    ~H"""
    <div class="w-full">
      <ul class="mx-auto grid grid-cols-[repeat(auto-fit,_minmax(min(13rem,_100%),1fr))] max-w-3xl gap-14">
        <.feature_card>
          <:illustration>
            <div class="bg-[url('../../../priv/static/images/liveroom_screenshot.png')] h-full w-full debug" />
          </:illustration>

          <:title>Live interactions</:title>

          <:description>
            Everyone has their own live cursor and can interact with the app. As if you were in the same room.
          </:description>
        </.feature_card>

        <.feature_card>
          <:title>Video chat</:title>
          <:description>See and talk to each other in a click.</:description>
        </.feature_card>

        <.feature_card>
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
        <.feature_card>
          <:title>For Sales teams</:title>
          <:description>
            Drop the boring slides and passive screenshares. Bring the customer along with you in your product demos.
          </:description>
        </.feature_card>

        <.feature_card>
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

  def feature_card(assigns) do
    ~H"""
    <li class="flex flex-col gap-8">
      <div class="h-52 rounded-[20px] grid place-items-center bg-card-pattern">
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
        Follow <a class="font-bold" href="https://twitter.com/Liveroom_app">@liveroom</a> for invites
      </small>
    </footer>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
