defmodule LiveroomWeb.HomeLive do
  alias LiveroomWeb.Components.Playground
  use LiveroomWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <.section class="bg-zinc-50">
      <.hero />

      <div
        id="playground_container"
        class="w-full max-w-4xl border-4 border-black rounded-3xl flex flex-col"
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
    """
  end

  def hero(assigns) do
    ~H"""
    <header class="flex relative flex-col items-center gap-10 md:gap-14 w-full">
      <h1 class="text-3xl font-bold text-accent flex items-center gap-3">
        <img src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/liveroom_logo.png"} class="w-6 h-6" />
        Liveroom
      </h1>

      <img
        src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/cursor_left.svg"}
        class="w-16 xs:w-24 absolute top-32 -right-0 xs:-right-4 sm:top-48 sm:right-5"
      />

      <img
        src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/cursor_right.svg"}
        class="w-16 xs:w-24 absolute top-72 -left-4"
      />

      <h2 class="font-bold text-4xl sm:text-3xl md:text-6xl lg:text-7xl text-center leading-none">
        Sit next to your customers
      </h2>

      <h3 class="font-medium text-lg sm:text-xl text-gray-500 text-center max-w-xs">
        Liveroom lets you instantly join your customer in your product with live cursors, video call and interactions.
      </h3>

      <a
        href="https://tally.so/r/wQ1EvX"
        class="rounded-[10px] bg-slate-900 text-white text-lg font-semibold px-6 py-4"
      >
        Join waitlist
      </a>
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

  def features(assigns) do
    ~H"""
    <div>
      features lol
    </div>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
