defmodule LiveroomWeb.ClientLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Components.CursorV1
  alias LiveroomWeb.Components.UserBanner

  @reduced_opacity 0.75

  def render(assigns) do
    ~H"""
    <div
      id="client_live"
      phx-hook="TrackCursorsHook"
      data-mode="fullscreen"
      data-phantomenabled={inspect(@phantom_enabled)}
      class="relative min-h-[100dvh] flex flex-col bg-slate-50 overflow-hidden"
    >
      <%!-- You --%>
      <div :if={not @phantom_enabled} class="space-y-8 mt-8 px-8">
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
      <div :if={not @phantom_enabled} class="space-y-8 mt-16 mb-32 px-8">
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

      <%= if not @phantom_enabled do %>
        <CursorV1.render
          :for={meta <- @_liveroom_v1_metas}
          :if={meta.socket_id != @_liveroom_v1_socket_id}
          id={"cursor_v1_" <> meta.socket_id}
          socket_id={@_liveroom_v1_socket_id}
          meta_socket_id={meta.socket_id}
          meta_x={meta.x}
          meta_y={meta.y}
          meta_name={meta.name}
          meta_color={meta.color}
        />
      <% end %>

      <UserBanner.render
        :if={not @phantom_enabled}
        name={@_liveroom_v1_name}
        color={@_liveroom_v1_color}
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
      phx-hook="AnimateBackgroundHook"
      data-phxref={@phx_ref}
      data-opacity={reduced_opacity()}
      data-opacityanimated={1}
      data-boxshadow="none"
      data-boxshadowanimated="none"
      class="flex flex-col sm:flex-row sm:flex-wrap items-baseline gap-y-2 gap-x-8 transition-all duration-300"
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

  def mount(%{"session_id" => session_id} = _params, _session, %{assigns: assigns} = socket) do
    {:ok,
     assign(socket,
       phantom_enabled: assigns[:live_action] == :phantom,
       page_title:
         case assigns[:_liveroom_v1_name] do
           nil -> session_id
           name -> name <> " - " <> session_id
         end
     ), layout: false}
  end

  ### Helpers

  def reduced_opacity, do: @reduced_opacity
end
