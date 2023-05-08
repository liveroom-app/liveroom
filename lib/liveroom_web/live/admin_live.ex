defmodule LiveroomWeb.AdminLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Components.CursorV1

  @reduced_opacity 0.5

  def render(assigns) do
    ~H"""
    <div id="admin_live" class="min-h-[100dvh] flex flex-col items-stretch space-y-8 bg-slate-50">
      <div class="flex flex-reverse flex-wrap items-start gap-8 mt-8 mb-32 px-8">
        <.presence_card
          :for={meta <- @_liveroom_v1_metas}
          :if={meta.socket_id != @_liveroom_v1_socket_id}
          meta={meta}
          self_meta={Enum.find(@_liveroom_v1_metas, &(&1.socket_id == @_liveroom_v1_socket_id))}
          socket_id={@_liveroom_v1_socket_id}
          inner_width={@analytics_data.inner_width}
        />
      </div>

      <h1
        class="fixed bottom-0 inset-x-0 flex items-baseline gap-1 py-4 px-8 text-xl"
        style={@_liveroom_v1_color && "background-color: #{@_liveroom_v1_color}50"}
      >
        <span>Welcome</span>
        <span class="text-xl font-semibold">
          <%= @_liveroom_v1_name %>
        </span>
        <span>👋</span>
      </h1>
    </div>
    """
  end

  attr :meta, :map, required: true
  attr :self_meta, :map, required: true
  attr :socket_id, :string, required: true
  attr :inner_width, :integer, required: true
  attr :rest, :global

  def presence_card(assigns) do
    assigns =
      assign(assigns,
        ratio: Float.round(assigns.meta.inner_width / assigns.meta.inner_height, 2),
        #
        # view_width: min(max(assigns.meta.inner_width, min_width), max_width)
        #
        # NOTE: Formula is `client_width * final_ratio` with
        #        - final_ratio = 90vw / 3840
        #        - 1vw = admin_width / 100
        view_width:
          (assigns.meta.inner_width * (90 / 1200) * (assigns.inner_width / 100))
          |> max(_min_width = 150)
          |> min(_max_width = 90 / 100 * assigns.inner_width)
          |> round()
      )

    assigns = assign(assigns, view_height: (assigns.view_width / assigns.ratio) |> round())

    ~H"""
    <div
      id={"presence_card_" <> @meta.socket_id}
      phx-hook="AnimateBackgroundHook"
      data-phxref={@meta.phx_ref <> @self_meta.phx_ref}
      data-opacity={reduced_opacity()}
      data-opacityanimated={1}
      data-boxshadow="none"
      data-boxshadowanimated=""
      class="rounded-xl shadow-md transition-all ease-in-out duration-300"
      style={"background-color: #{@meta.color}; opacity: #{reduced_opacity()};"}
    >
      <div class="flex flex-col items-stretch">
        <%!-- name & screen size --%>
        <div class="flex flex-wrap justify-between items-baseline gap-x-16 py-3 px-4">
          <p class="flex items-center space-x-1">
            <span class="font-semibold select-all"><%= @meta.name %></span>
            <.icon
              :if={@meta.type == :admin}
              name="hero-shield-check-solid"
              class="block w-[18px] h-[18px] bg-neutral-800"
            />
          </p>

          <p class="text-xs font-medium font-mono">
            <%= @meta.inner_width %> x <%= @meta.inner_height %>
          </p>
        </div>

        <%!-- socket_id & phx_ref --%>
        <table class="w-fit my-1 mx-2 text-xs text-neutral-800/75">
          <tr class="[&_td]:px-2">
            <td class="select-none">socket_id</td>
            <td class="font-medium font-mono select-all"><%= @meta.socket_id %></td>
          </tr>
          <tr class="[&_td]:px-2">
            <td class="select-none">phx_ref</td>
            <td class="font-medium font-mono select-all"><%= @meta.phx_ref %></td>
          </tr>
        </table>

        <%!-- cursors playground --%>
        <div class="flex flex-col items-center pt-4 pb-2 px-2">
          <div
            id={"cursors_playground_" <> @meta.socket_id}
            phx-hook="TrackCursorsHook"
            data-mode="container"
            style={"width: #{@view_width}px; height: #{@view_height}px;"}
            class="relative cursor-none bg-white/80 rounded shadow-inner overflow-hidden"
          >
            <%!-- :if={@meta.socket_id != @socket_id} --%>
            <CursorV1.render
              id={"cursor_v1_" <> @meta.socket_id}
              socket_id={@socket_id}
              meta_socket_id={@meta.socket_id}
              meta_x={@meta.x}
              meta_y={@meta.y}
              meta_name={@meta.name}
              meta_color={@meta.color}
              mode={:container}
              container_width={@view_width}
              container_height={@view_height}
            />
            <CursorV1.render
              id={"cursor_v1_" <> @meta.socket_id <> "_self"}
              socket_id={@socket_id}
              meta_socket_id={@self_meta.socket_id}
              meta_x={@self_meta.x}
              meta_y={@self_meta.y}
              meta_name={@self_meta.name}
              meta_color={@self_meta.color}
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

  def mount(_params, _session, socket) do
    {:ok, socket, layout: false}
  end

  ### Helpers

  def reduced_opacity, do: @reduced_opacity
end