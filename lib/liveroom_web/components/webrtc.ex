defmodule LiveroomWeb.Components.WebRTC do
  use LiveroomWeb, :html

  attr :room_id, :string, required: true

  def render(assigns) do
    ~H"""
    <div id="room" phx-update="ignore" class="flex flex-col h-screen relative" data-room-id={@room_id}>
      <!-- mb-14 to keep disconnect with absolute value above the videos-->
      <section class="flex flex-col max-h-screen mb-14">
        <div class="p-4">
          <div id="participants-list" class="text-xl font-medium text-white"></div>
        </div>

        <div id="videochat-error" class="VideoChatError" style="display: none;"></div>

        <div id="videochat" class="px-2 md:px-20 overflow-y-auto">
          <template id="video-feed-template">
            <div name="video-feed" class="flex flex-col space-y-4 bg-gray-900 shadow overflow-hidden">
              <audio></audio>
              <video class=""></video>
              <div name="video-label" class="text-white text-shadow-lg p-2">Placeholder</div>
            </div>
          </template>

          <div class="flex flex-col justify-center items-center">
            <div id="videos-grid" class="grid grid-cols-2 grid-flow-row gap-4 justify-items-center">
            </div>
          </div>
        </div>

        <div class="h-20"></div>
      </section>

      <div id="controls" , class="flex-none flex justify-center h-8 pb-2 absolute inset-x-0 bottom-2">
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
