defmodule LiveroomWeb.ClientLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Components.UserBanner
  alias LiveroomWeb.Components.CursorsPlayground

  @reduced_opacity 0.75

  def render(assigns) do
    ~H"""
    <CursorsPlayground.render current_user_id={@_liveroom_user_id} users={@_liveroom_users} />

    <div id="client_live" class="min-h-[100dvh] flex flex-col bg-slate-50">
      <%!-- Current user --%>
      <div class="space-y-8 mt-8 px-8">
        <h2 class="font-semibold">You</h2>
        <ul id="current_user" class="space-y-8 text-sm text-neutral-800/75">
          <.user
            :if={current_user = @_liveroom_users[@_liveroom_user_id]}
            user_id={current_user.id}
            phx_ref={current_user.phx_ref}
            name={current_user.name}
            color={current_user.color}
            type={current_user.type}
          />
        </ul>
      </div>

      <%!-- Other users --%>
      <div class="space-y-8 mt-16 mb-32 px-8">
        <h2 class="font-semibold">Other users in the session</h2>
        <ul id="other_users" class="space-y-8 text-sm text-neutral-800/75">
          <.user
            :for={{user_id, user} <- @_liveroom_users}
            :if={_is_other_user = user_id != @_liveroom_user_id}
            user_id={user_id}
            phx_ref={user.phx_ref}
            name={user.name}
            color={user.color}
            type={user.type}
          />
        </ul>
      </div>

      <UserBanner.render
        name={@_liveroom_users[@_liveroom_user_id][:name]}
        color={@_liveroom_users[@_liveroom_user_id][:color]}
      />
    </div>
    """
  end

  ### Components

  attr :user_id, :string, required: true
  attr :phx_ref, :string, required: true
  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :type, :string, required: true

  def user(assigns) do
    ~H"""
    <li
      id={"user_" <> @user_id}
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
      <p class="font-medium font-mono select-all"><%= @user_id %></p>
      <p class="font-medium font-mono select-all"><%= @phx_ref %></p>
    </li>
    """
  end

  ### Server

  def mount(%{"room_id" => room_id} = _params, _session, socket) do
    socket =
      assign(socket,
        page_title: page_title(socket, room_id)
      )

    {:ok, socket, layout: false}
  end

  ### Helpers

  defp page_title(
         %{assigns: %{_liveroom_user_id: current_user_id, _liveroom_users: users}} = _socket,
         room_id
       ) do
    case users[current_user_id][:name] do
      nil -> room_id
      name -> name <> " - " <> room_id
    end
  end

  defp reduced_opacity, do: @reduced_opacity
end
