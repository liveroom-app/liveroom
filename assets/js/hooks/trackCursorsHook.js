const INTERESTING_KEYS = ["Escape"];

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

          this.pushEvent("liveroom-mousemove", { x, y });
        });
        break;
      }
      case "fullscreen": {
        window.addEventListener("mousemove", (e) => {
          const xRatio = e.pageX / window.innerWidth;
          const x = Number(xRatio * 100).toFixed(2); // in %

          const yRatio = e.pageY / window.innerHeight;
          const y = Number(yRatio * 100).toFixed(2); // in %

          this.pushEvent("liveroom-mousemove", { x, y });
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
        this.pushEvent("liveroom-mousedown");
      });
      window.addEventListener("mouseup", (e) => {
        this.pushEvent("liveroom-mouseup");
      });
    }

    // Keyboard press
    if (this.el.dataset.keyboardpress) {
      window.addEventListener("keydown", (e) => {
        // NOTE: To avoid sending multiple keydown events when a key is held down.
        const firstTimeKeyIsPressed = !e.repeat;

        if (firstTimeKeyIsPressed && INTERESTING_KEYS.includes(e.key))
          this.pushEvent("liveroom-keydown", { key: e.key });
      });

      window.addEventListener("keyup", (e) => {
        if (INTERESTING_KEYS.includes(e.key))
          this.pushEvent("liveroom-keyup", { key: e.key });
      });
    }
  },
};
