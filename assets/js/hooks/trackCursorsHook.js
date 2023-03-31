export const TrackCursorsHook = {
  mounted() {
    // Mouse move
    document.addEventListener("mousemove", (e) => {
      const x = (e.pageX / window.innerWidth) * 100; // in %
      const y = (e.pageY / window.innerHeight) * 100; // in %

      this.pushEvent("cursor-move", { x, y });
    });

    // Keyboard press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Space") this.pushEvent("space-key-down");
      if (e.keyCode === 32) this.pushEvent("space-key-down");
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Space") this.pushEvent("space-key-up");
      if (e.keyCode === 32) this.pushEvent("space-key-up");
    });
  },
};
