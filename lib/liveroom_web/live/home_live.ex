defmodule LiveroomWeb.HomeLive do
  use LiveroomWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    Coucou
    """
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
