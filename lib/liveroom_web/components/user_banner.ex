defmodule LiveroomWeb.Components.UserBanner do
  use LiveroomWeb, :html

  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :class, :string, default: nil

  def render(assigns) do
    ~H"""
    <div class={[
      "fixed bottom-0 inset-x-0",
      "flex justify-center items-center py-6 px-6",
      "bg-slate-100 border-t border-slate-200",
      "shadow-2xl",
      @class
    ]}>
      <%!-- welcome --%>
      <div class="absolute left-4 inset-y-0 flex items-center">
        <h1 class="font-semibold">Welcome 👋</h1>
      </div>

      <%!-- name --%>
      <p
        class="mx-auto font-semibold rounded-full py-1.5 px-6"
        style={@color && "background-color: #{@color}"}
      >
        <%= @name %>
      </p>

      <%!-- liveroom logo --%>
      <div class="absolute right-4 inset-y-0 flex items-center">
        <a
          href="https://liveroom.app"
          target="_blank"
          class="flex items-center py-1 pl-1 pr-3 font-semibold rounded-md hover:bg-slate-200/60 transition-colors"
        >
          <img
            src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/liveroom_logo.png"}
            class="w-10 h-10 pt-1"
          />
          <span class="text-xl font-bold text-accent">Liveroom</span>
        </a>
      </div>
    </div>
    """
  end
end
