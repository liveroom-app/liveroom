export const JoinCallHook = {
  mounted() {
    void this.initStream();
  },
  async initStream() {
    try {
      // Gets our local media from the browser and stores it as a const, stream.
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
        width: "1280",
      });
      // Stores our stream in the global constant, localStream.
      localStream = stream;
      // Sets our local video element to stream from the user's webcam (stream).
      document.getElementById("local-video").srcObject = stream;
    } catch (e) {
      console.log(e);
    }
  },
};
