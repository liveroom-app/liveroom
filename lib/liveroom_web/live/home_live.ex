defmodule LiveroomWeb.HomeLive do
  use LiveroomWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <.hero />
    """
  end

  def hero(assigns) do
    ~H"""
    <section>
      <h1>Where demos are live and collaborative.</h1>

      <h2>Make your prospect feel like you&apos;re with them</h2>
    </section>
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
