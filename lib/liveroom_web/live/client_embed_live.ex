defmodule LiveroomWeb.ClientEmbedLive do
  use LiveroomWeb, :live_view

  alias LiveroomWeb.Components.CursorV1

  def render(assigns) do
    ~H"""
    <div
      id="client_embed_live"
      phx-hook="TrackCursorsHook"
      data-mode="fullscreen"
      class="relative h-0 w-0"
    >
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
    </div>
    """
  end

  ### Server

  def mount(
        %{"session_id" => session_id} = _params,
        _session,
        %{assigns: %{_liveroom_v1_name: name}} = socket
      ) do
    {:ok,
     assign(socket,
       page_title:
         case name do
           nil -> session_id
           name -> name <> " - " <> session_id
         end
     ), layout: false}
  end
end
