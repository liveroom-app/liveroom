defmodule LiveroomWeb.AdminLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Components.Cursor
  alias LiveroomWeb.Components.UserBanner

  @reduced_opacity 0.75

  def render(assigns) do
    ~H"""
    <div id="admin_live" class="min-h-[100dvh] flex flex-col items-stretch space-y-8 bg-slate-100">
      <div class="flex flex-reverse flex-wrap items-start gap-8 mt-8 mb-32 px-8">
        <.presence_card
          :for={{user_id, user} <- @_liveroom_users}
          :if={_is_other_user = user_id != @_liveroom_user_id}
          user={user}
          current_user={@_liveroom_users[@_liveroom_user_id]}
          inner_width={@analytics_data.inner_width}
        />
      </div>

      <UserBanner.render
        class="z-[100]"
        name={@_liveroom_users[@_liveroom_user_id][:name]}
        color={@_liveroom_users[@_liveroom_user_id][:color]}
      />
    </div>
    """
  end

  attr :user, :map, required: true
  attr :current_user, :map, required: true
  attr :inner_width, :integer, required: true
  attr :rest, :global

  def presence_card(assigns) do
    ratio = Float.round(assigns.user.inner_width / assigns.user.inner_height, 2)

    # view_width: min(max(assigns.user.inner_width, min_width), max_width)
    #
    # NOTE: Formula is `client_width * final_ratio` with
    #        - final_ratio = 90vw / 3200
    #        - 1vw = admin_width / 100
    view_width =
      (assigns.user.inner_width * (90 / 1920) * (assigns.inner_width / 100))
      |> max(_min_width = 150)
      |> min(_max_width = 90 / 100 * assigns.inner_width)
      |> round()

    view_height = (view_width / ratio) |> round()

    assigns =
      assign(assigns,
        ratio: ratio,
        view_width: view_width,
        view_height: view_height
      )

    ~H"""
    <div
      id={"presence_card_" <> @user.id}
      phx-hook="AnimateBackgroundHook"
      data-phxref={@user.phx_ref <> @current_user.phx_ref}
      data-opacity={reduced_opacity()}
      data-opacityanimated={1}
      data-boxshadow="none"
      data-boxshadowanimated=""
      class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
      style={"opacity: #{reduced_opacity()};"}
    >
      <div class="flex flex-col items-stretch">
        <div class="pb-2">
          <%!-- Name & Screen size --%>
          <div class="flex flex-wrap justify-between items-baseline gap-x-16 py-3 px-4">
            <p class="flex items-center space-x-1">
              <span class="font-semibold select-all"><%= @user.name %></span>
              <.icon
                :if={@user.type == :admin}
                name="hero-shield-check-solid"
                class="block w-[18px] h-[18px] bg-neutral-800"
              />
            </p>
            <p class="text-xs font-medium font-mono">
              <%= @user.inner_width %> x <%= @user.inner_height %>
            </p>
          </div>

          <%!-- user_id & phx_ref --%>
          <table class="w-fit my-1 mx-2 text-xs text-neutral-800/75">
            <tr class="[&_td]:px-2">
              <td class="select-none">user_id</td>
              <td class="font-medium font-mono select-all"><%= @user.id %></td>
            </tr>
            <tr class="[&_td]:px-2">
              <td class="select-none">phx_ref</td>
              <td class="font-medium font-mono select-all"><%= @user.phx_ref %></td>
            </tr>
          </table>
        </div>

        <%!-- Cursors Playground --%>
        <div class="flex flex-col items-center p-2">
          <%!-- TODO: listen to mouse click only inside the container in TrackCursorHook --%>
          <%!-- TODO: same for keyboard press? --%>
          <div
            id={"cursors_playground_" <> @user.id}
            phx-hook="TrackCursorsHook"
            data-mode="container"
            data-mouseclick="true"
            data-keyboardpress="true"
            style={"width: #{@view_width}px; height: #{@view_height}px; background-color: #{@user.color}30; border: solid 2px #{@user.color};"}
            class="relative rounded overflow-hidden"
          >
            <%!-- Other user cursor --%>
            <Cursor.render
              id={"cursor_" <> @user.id}
              is_self={false}
              user_id={@user.id}
              x={@user.x}
              y={@user.y}
              name={@user.name}
              color={@user.color}
              is_escape_key_down={@user.is_escape_key_down}
              is_mouse_down={@user.is_mouse_down}
              msg={@user.msg}
              mode={:container}
              container_width={@view_width}
              container_height={@view_height}
            />
            <%!-- Current user cursor --%>
            <Cursor.render
              id={"cursor_" <> @user.id <> "_self"}
              is_self={true}
              show_self={true}
              user_id={@current_user.id}
              x={@current_user.x}
              y={@current_user.y}
              name={@current_user.name}
              color={@current_user.color}
              is_escape_key_down={@current_user.is_escape_key_down}
              is_mouse_down={@current_user.is_mouse_down}
              msg={@current_user.msg}
              mode={:container}
              container_width={@view_width}
              container_height={@view_height}
            />
          </div>
        </div>
      </div>
    </div>
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
      name -> name <> " (admin) - " <> room_id
    end
  end

  defp reduced_opacity, do: @reduced_opacity
end
