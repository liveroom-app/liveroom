defmodule LiveroomWeb.ClientLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Components.CursorV1

  @reduced_opacity 0.5

  def render(assigns) do
    ~H"""
    <div
      id="client_live"
      phx-hook="TrackCursorsHook"
      class="relative min-h-[100dvh] flex flex-col pb-32 bg-slate-50 overflow-hidden"
    >
      <h1
        class="flex items-baseline gap-1 py-4 px-8 text-xl shadow"
        style={"background-color: #{@_liveroom_v1_color}"}
      >
        <span>Welcome</span>
        <span class="text-xl font-semibold">
          <%= @_liveroom_v1_name %>
        </span>
        <span>👋</span>
      </h1>

      <%!-- You --%>
      <div class="space-y-8 mt-8 px-8">
        <h2 class="font-semibold">You</h2>
        <ul id="you" class="space-y-8 text-sm text-neutral-800/75">
          <.user
            :for={meta <- @_liveroom_v1_metas}
            :if={_is_self = meta.socket_id == @_liveroom_v1_socket_id}
            socket_id={meta.socket_id}
            phx_ref={meta.phx_ref}
            name={meta.name}
            color={meta.color}
            type={meta.type}
          />
        </ul>
      </div>

      <%!-- Other users --%>
      <div class="space-y-8 mt-16 px-8">
        <h2 class="font-semibold">Other users in the session</h2>
        <ul id="other_users" class="space-y-8 text-sm text-neutral-800/75">
          <.user
            :for={meta <- @_liveroom_v1_metas}
            :if={_is_other_user = meta.socket_id != @_liveroom_v1_socket_id}
            socket_id={meta.socket_id}
            phx_ref={meta.phx_ref}
            name={meta.name}
            color={meta.color}
            type={meta.type}
          />
        </ul>
      </div>

      <CursorV1.render
        :for={meta <- @_liveroom_v1_metas}
        id={"cursor_v1_" <> meta.socket_id}
        socket_id={@_liveroom_v1_socket_id}
        meta_socket_id={meta.socket_id}
        meta_x={meta.x}
        meta_y={meta.y}
        meta_name={meta.name}
        meta_color={meta.color}
      />
    </div>
    """
  end

  ### Components

  attr :socket_id, :string, required: true
  attr :phx_ref, :string, required: true
  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :type, :string, required: true

  def user(assigns) do
    ~H"""
    <li
      id={"user_" <> @socket_id}
      class="flex flex-col md:flex-row md:flex-wrap items-baseline gap-y-2 gap-x-8"
      phx-hook="AnimateBackgroundHook"
      data-phxref={@phx_ref}
      data-opacity={reduced_opacity()}
      data-opacityanimated={1}
      data-boxshadow="none"
      data-boxshadowanimated="none"
      class="flex flex-col sm:flex-row sm:flex-wrap items-baseline gap-y-2 gap-x-8 transition-all ease-in-out duration-300"
      style={"opacity: #{reduced_opacity()};"}
    >
      <p
        class="w-fit py-1 p-2.5 font-semibold select-all rounded-full"
        style={"background-color: #{@color};"}
      >
        <%= @name %>
      </p>

      <p class="font-medium font-mono select-all"><%= @type %></p>
      <p class="font-medium font-mono select-all"><%= @socket_id %></p>
      <p class="font-medium font-mono select-all"><%= @phx_ref %></p>
    </li>
    """
  end

  ### Server

  def mount(_params, _session, socket) do
    {:ok, socket, layout: false}
  end

  ### Helpers

  def reduced_opacity, do: @reduced_opacity
end
