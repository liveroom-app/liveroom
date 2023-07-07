export const LiveKitScreensharingHook = {
  async mounted() {
    const { Room, RoomEvent, Track } = await import(
      "https://cdn.jsdelivr.net/npm/livekit-client@1.12.0/dist/livekit-client.esm.min.mjs"
    );

    this.room = new Room({ dynacast: true })
      .on(RoomEvent.TrackPublished, (publication, participant) => {
        console.log("[LiveKit] Track Published", publication, participant);

        if (
          participant.identity === this.el.dataset.remoteuserid &&
          publication.source === Track.Source.ScreenShare
        ) {
          console.log("[LiveKit] Subscribing to remote user screen share");
          publication.setSubscribed(true);
        }
      })
      .on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        console.log(
          "[LiveKit] Track Subscribed",
          track,
          publication,
          participant
        );

        if (
          participant.identity === this.el.dataset.remoteuserid &&
          publication.source === Track.Source.ScreenShare
        ) {
          console.log("[LiveKit] Attaching remote user screen share");
          track.attach(this.el);
        }
      });

    await this.room.connect(
      this.el.dataset.livekitwsurl,
      this.el.dataset.livekittoken,
      { autoSubscribe: false }
    );
    console.log("[LiveKit] Connected to room", this.room.name);

    const remoteParticipant = this.room.getParticipantByIdentity(
      this.el.dataset.remoteuserid
    );
    if (remoteParticipant) {
      console.log("[LiveKit] Got remote participant", remoteParticipant);

      const remoteTrack = remoteParticipant.getTrack(Track.Source.ScreenShare);

      if (remoteTrack) {
        console.log(
          "[LiveKit] Got remote participant screenshare track",
          remoteTrack
        );

        remoteTrack.setSubscribed(true);
        console.log("[LiveKit] Subscribed to remote user screenshare track");
      }
    }
  },
};
