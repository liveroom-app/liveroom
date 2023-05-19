defmodule LiveroomWeb.Components.WebRTC do
  use LiveroomWeb, :html

  # attr :mode, :atom, values: [:admin, :client_embed], required: true
  attr :room_id, :string, required: true
  attr :class, :string, default: nil

  def render(assigns) do
    ~H"""
    <div
      id="room"
      phx-update="ignore"
      class={[
        "relative w-fit px-10 flex flex-col",
        @class
      ]}
      data-room-id={@room_id}
    >
      <section class="flex flex-col">
        <div class="hidden p-4">
          <div id="participants-list" class="text-xl font-medium text-white"></div>
        </div>

        <div id="videochat-error" class="VideoChatError" style="display: none;"></div>

        <div id="videochat" class="px-2 md:px-20 overflow-y-auto">
          <template id="video-feed-template">
            <div
              name="video-feed"
              class="relative flex flex-col space-y-2 py-2 px-6 bg-slate-300/20 backdrop-blur-sm border border-slate-300/50 rounded-md overflow-hidden"
            >
              <audio></audio>

              <div class="aspect-square w-full rounded-full overflow-hidden">
                <video class="h-20 w-20 object-cover"></video>
              </div>

              <div name="video-label" class="text-center text-blue-900 text-sm font-semibold">
                Placeholder
              </div>
            </div>
          </template>

          <div class="flex flex-col justify-center items-center">
            <div id="videos-grid" class="flex gap-16"></div>
          </div>
        </div>
      </section>

      <div id="controls" class="hidden flex-none justify-center h-8 pb-2 absolute inset-x-0 bottom-2">
        <button id="disconnect" class="text-white text-2xl font-normal hover:text-gray-400">
          Disconnect
        </button>
      </div>
    </div>

    <script defer phx-track-static type="text/javascript" src={~p"/assets/webrtc_app.js"}>
    </script>
    """
  end
end
