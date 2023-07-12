defmodule LiveroomWeb.AdminLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Components.UserBanner

  def render(assigns) do
    ~H"""
    <div id="admin_live" class="min-h-[100dvh] flex flex-col items-stretch space-y-8 bg-slate-100">
      <div
        id="presence_cards_container"
        phx-hook="LiveKitHook"
        data-livekitwsurl={Liveroom.LiveKit.ws_url()}
        data-livekittoken={
          Liveroom.LiveKit.generate_token(
            @_liveroom_room_id,
            @_liveroom_user_id,
            nil
            # NOTE: This causes re-generation of token after each LiveView updates
            # @_liveroom_users[@_liveroom_user_id][:name]
          )
        }
        data-cameraprefix="livekit_camera_"
        data-screensharingprefix="livekit_screensharing_"
        class="flex flex-wrap items-start gap-8 mt-8 mb-32 px-8"
      >
        <.live_component
          :for={
            {user_id, _user} <-
              Enum.sort_by(
                @_liveroom_users,
                fn {_user_id, user} -> user.joined_at end,
                {:asc, DateTime}
              )
          }
          :if={_is_other_user = user_id != @_liveroom_user_id}
          module={__MODULE__.PresenceCard}
          id={"presence_card_#{user_id}"}
          card_user_id={user_id}
          current_user_id={@_liveroom_user_id}
          current_user_name={@_liveroom_users[@_liveroom_user_id][:name]}
          inner_width={@analytics_data.inner_width}
          inner_height={@analytics_data.inner_height}
          users={@_liveroom_users}
          room_id={@_liveroom_room_id}
        />
      </div>

      <UserBanner.render
        class="z-[1000]"
        user_id={@_liveroom_user_id}
        name={@_liveroom_users[@_liveroom_user_id][:name]}
        color={@_liveroom_users[@_liveroom_user_id][:color]}
      />
    </div>
    """
  end

  ### Live Components

  defmodule PresenceCard do
    use LiveroomWeb, :live_component

    alias LiveroomWeb.Components.Cursor

    attr :id, :string, required: true
    attr :users, :map, required: true
    attr :card_user_id, :string, required: true
    attr :current_user_id, :string, required: true
    attr :current_user_name, :string, required: true
    attr :inner_width, :integer, required: true
    attr :inner_height, :integer, required: true
    attr :room_id, :string, required: true
    attr :rest, :global

    def render(assigns) do
      card_user = assigns.users[assigns.card_user_id]

      ratio = (card_user.inner_width / card_user.inner_height) |> Float.round(2)

      # NOTE: The goal is to have the full card user screen visible,
      #       without overflowing on the current user (admin) screen.
      #       If ratio > 1, width is greater than height, so we use width as the reference.
      #       Else, if ratio < 1, height is greater than width, so we use height as the reference.
      {view_width, view_height} =
        case ratio > 1.0 do
          true ->
            view_width = 0.8 * assigns.inner_width
            view_height = view_width / ratio
            {view_width, view_height}

          false ->
            view_height = 0.7 * assigns.inner_height
            view_width = view_height * ratio
            {view_width, view_height}
        end

      assigns =
        assign(assigns,
          ratio: ratio,
          view_width: round(view_width),
          view_height: round(view_height)
        )

      ~H"""
      <div
        id={@id}
        phx-hook="AnimateHook"
        data-watched={
          # NOTE: If there is a cursor playground (user is a client),
          #       then we animate the card if the card user moves OR if the current user moves.
          #       Else, if the user is an admin, we animate the card only if the card user moves.
          case card_user = @users[@card_user_id] do
            %{type: :client} -> card_user.phx_ref <> @users[@current_user_id].phx_ref
            %{type: :admin} -> card_user.phx_ref
          end
        }
        data-animateonmount="true"
        data-timeout="60000"
        class={[
          "bg-white rounded-xl overflow-hidden",
          "opacity-75 data-[animated]:opacity-100",
          "shadow-none data-[animated]:shadow-md",
          "transition-all duration-300"
        ]}
        style={"--color: #{color = @users[@card_user_id].color}; --color30: #{color}30;"}
      >
        <div class="flex flex-col items-stretch">
          <div class="px-4">
            <%!-- Name & Screen size --%>
            <div class="flex flex-wrap justify-between items-baseline gap-x-16 py-4">
              <p class="flex items-center gap-2">
                <span class="text-sm font-semibold rounded-full py-1 px-3 bg-[--color] select-all">
                  <%= @users[@card_user_id].name %>
                </span>
                <span
                  :if={@users[@card_user_id].type == :admin}
                  name="hero-shield-check-solid"
                  class="text-xs text-neutral-800 bg-neutral-800/10 rounded-full py-0.5 px-2"
                >
                  admin
                </span>
              </p>
              <p class="text-xs font-medium font-mono">
                <%= @users[@card_user_id].inner_width %> x <%= @users[@card_user_id].inner_height %>
              </p>
            </div>

            <div class="flex flex-wrap items-start gap-x-4 pb-4">
              <video
                id={"livekit_camera_#{@card_user_id}"}
                class="w-48 aspect-video rounded bg-neutral-100"
                phx-update="ignore"
              />

              <table class="my-1 text-xs text-neutral-800/75">
                <%!-- user_id --%>
                <tr class="[&_td]:px-2">
                  <td class="select-none">user_id</td>
                  <td class="font-medium font-mono select-all"><%= @users[@card_user_id].id %></td>
                </tr>
                <%!-- current_url --%>
                <tr class="[&_td]:px-2">
                  <td class="select-none">current_url</td>
                  <td class="font-medium font-mono select-all">
                    <%= @users[@card_user_id].current_url %>
                  </td>
                </tr>
                <%!-- phx_ref --%>
                <tr class="[&_td]:px-2">
                  <td class="select-none">phx_ref</td>
                  <td class="font-medium font-mono select-all"><%= @users[@card_user_id].phx_ref %></td>
                </tr>
              </table>
            </div>
          </div>

          <%!-- Cursors Playground --%>
          <div :if={@users[@card_user_id].type == :client} class="flex flex-col items-center p-4">
            <%!-- TODO: listen to mouse click only inside the container in TrackCursorHook --%>
            <%!-- TODO: same for keyboard press? --%>
            <%!-- TODO: Use only 1 instance of LiveKit Screensharing Hook
                  and attach each tracks to each Presence Card video element --%>
            <div
              id={"cursors_playground_#{@card_user_id}"}
              phx-hook="TrackCursorsHook"
              data-mode="container"
              data-mouseclick="true"
              data-keyboardpress="true"
              style={"width: #{@view_width}px; height: #{@view_height}px;"}
              class={[
                "relative rounded overflow-hidden",
                "bg-[--color30]",
                "border-2 border-[--color]"
              ]}
            >
              <video
                id={"livekit_screensharing_#{@card_user_id}"}
                class="absolute inset-0"
                phx-update="ignore"
              />

              <.live_component
                :for={{user_id, user} <- @users}
                :if={
                  # TODO: only show when livekit screensharing is NOT connected
                  user_id == @card_user_id
                }
                module={Cursor}
                id={"cursor_#{@card_user_id}_#{user_id}"}
                is_self={user_id == @users[@current_user_id].id}
                show_self={
                  # TODO: only show when livekit screensharing is NOT connected
                  false
                }
                show_halo={
                  # TODO: only show when livekit screensharing is NOT connected
                  false
                }
                user_id={user_id}
                x={user.x}
                y={user.y}
                name={user.name}
                color={user.color}
                is_escape_key_down={user.is_escape_key_down}
                is_mouse_down={user.is_mouse_down}
                msg={user.msg}
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
end
