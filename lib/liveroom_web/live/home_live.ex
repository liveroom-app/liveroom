defmodule LiveroomWeb.HomeLive do
  alias LiveroomWeb.Components.Playground
  use LiveroomWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <.hero />

    <div id="playground_container" class="px-32">
      <%= live_render(@socket, Playground, id: "playground-#{@socket.id}") %>
    </div>
    """
  end

  def hero(assigns) do
    ~H"""
    <section class="flex flex-col items-center space-y-4 py-8 md:py-24 xl:py-32">
      <h1 class="font-black text-3xl">Where demos are live and collaborative.</h1>

      <h2 class="font-medium text-gray-400">
        Make your prospect feel like you&apos;re with them
      </h2>
    </section>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
