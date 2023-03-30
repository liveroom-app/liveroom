defmodule LiveroomWeb.Components.Playground do
  use LiveroomWeb, :live_view

  ### Render

  @impl true
  def render(assigns) do
    ~H"""
    Hey
    """
  end

  ### Components

  ### Server

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  ### Helpers
end
