const HALO_KEY = "Escape";
const HALO_KEY_CODE = 27;

export const TrackCursorsHook = {
  mounted() {
    // Mouse move
    switch (this.el.dataset.mode) {
      case "container": {
        this.el.addEventListener("mousemove", (e) => {
          const xRatio = e.layerX / this.el.offsetWidth;
          const x = Number(xRatio * 100).toFixed(2); // in %

          const yRatio = e.layerY / this.el.offsetHeight;
          const y = Number(yRatio * 100).toFixed(2); // in %

          this.pushEvent("liveroom-cursor-moved", { x, y });
        });
        break;
      }
      case "fullscreen": {
        window.addEventListener("mousemove", (e) => {
          const x = Number((e.pageX / window.innerWidth) * 100).toFixed(2); // in %
          const y = Number((e.pageY / window.innerHeight) * 100).toFixed(2); // in %

          this.pushEvent("liveroom-cursor-moved", { x, y });
        });
        break;
      }
    }

    // Resize window
    window.addEventListener("resize", (e) => {
      this.pushEvent("liveroom-window-resize", {
        inner_width: window.innerWidth,
        inner_height: window.innerHeight,
      });
    });

    // Mouse click
    if (this.el.dataset.mouseclick) {
      window.addEventListener("mousedown", (e) => {
        this.pushEvent("liveroom-cursor-click-down");
      });
      window.addEventListener("mouseup", (e) => {
        this.pushEvent("liveroom-cursor-click-up");
      });
    }

    // Keyboard press
    if (this.el.dataset.keyboardpress) {
      window.addEventListener("keydown", (e) => {
        if (e.key === HALO_KEY || e.keyCode === HALO_KEY_CODE)
          this.pushEvent("liveroom-halo-key-down");
      });

      window.addEventListener("keyup", (e) => {
        if (e.key === HALO_KEY || e.keyCode === HALO_KEY_CODE)
          this.pushEvent("liveroom-halo-key-up");
      });
    }
  },
};
