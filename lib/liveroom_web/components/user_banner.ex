defmodule LiveroomWeb.Components.UserBanner do
  use LiveroomWeb, :html

  attr :user_id, :string, required: true
  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :class, :string, default: nil

  def render(assigns) do
    ~H"""
    <div
      class={[
        "fixed bottom-0 inset-x-0",
        "flex justify-center items-center px-6",
        "bg-white border-t border-slate-200",
        "shadow-2xl",
        @class
      ]}
      style={"--color: #{@color};"}
    >
      <%!-- welcome --%>
      <div class="absolute left-4 inset-y-0 flex items-center">
        <p class="font-semibold">
          <span>👋 Welcome</span>
          <span class="ml-1 text-sm font-semibold rounded-full py-1 px-3 bg-[--color]">
            <%= @name %>
          </span>
        </p>
      </div>

      <%!-- self camera --%>
      <video
        id={"livekit_camera_#{@user_id}"}
        class="h-20 aspect-video my-2 rounded bg-neutral-100"
        phx-update="ignore"
      />

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
