export const LiveKitHook = {
  async mounted() {
    const { Room, RoomEvent, Track } = await import(
      "https://cdn.jsdelivr.net/npm/livekit-client@1.12.0/dist/livekit-client.esm.min.mjs"
    );

    this.room = new Room({ dynacast: true }).on(
      RoomEvent.TrackSubscribed,
      (track, publication, participant) => {
        console.log(
          "[LiveKit] Track Subscribed",
          track,
          publication,
          participant
        );

        switch (publication.source) {
          case Track.Source.Camera: {
            const camera_el = document.getElementById(
              this.el.dataset.cameraprefix + participant.identity
            );

            if (camera_el) {
              console.log(
                `[LiveKit] Attaching remote user camera (identity ${participant.identity})`
              );
              track.attach(camera_el);
            }

            break;
          }

          // TODO: handle microphone

          case Track.Source.ScreenShare: {
            const screensharing_el = document.getElementById(
              this.el.dataset.screensharingprefix + participant.identity
            );

            if (screensharing_el) {
              console.log(
                `[LiveKit] Attaching remote user screen share (identity ${participant.identity})`
              );
              track.attach(screensharing_el);
            }

            break;
          }
        }
      }
    );

    await this.room.connect(
      this.el.dataset.livekitwsurl,
      this.el.dataset.livekittoken,
      { autoSubscribe: true }
    );
    console.log("[LiveKit] Connected to room", this.room.name);

    await this.room.localParticipant.enableCameraAndMicrophone();
    console.log("[LiveKit] Local camera & mic enabled");
  },

  destroyed() {
    this.room?.disconnect();
  },
};
