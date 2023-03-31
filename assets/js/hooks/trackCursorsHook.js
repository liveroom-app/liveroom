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
      if (e.key === HALO_KEY) this.pushEvent("halo-key-down");
      if (e.keyCode === HALO_KEY_CODE) this.pushEvent("halo-key-down");
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === HALO_KEY) this.pushEvent("halo-key-up");
      if (e.keyCode === HALO_KEY_CODE) this.pushEvent("halo-key-up");
    });
  },
};

// const HALO_KEY = "Space";
// const HALO_KEY_CODE = 32;
const HALO_KEY = "Escape";
const HALO_KEY_CODE = 27;
