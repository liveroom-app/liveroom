defmodule LiveroomWeb.Header do
  use LiveroomWeb, :html

  attr :class, :string, default: nil

  def render(assigns) do
    ~H"""
    <header>header</header>
    """
  end
end
