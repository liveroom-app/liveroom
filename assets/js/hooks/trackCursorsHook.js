// const MAX_FPS = 60;
// const MAX_FPS = 30;
// const MAX_FPS = 10;
// const MILLISECONDS_PER_FRAME = 1000 / MAX_FPS;
// const DEBOUNCE = (MILLISECONDS_PER_FRAME * 0.75).toFixed();
// console.log("MILLISECONDS_PER_FRAME", MILLISECONDS_PER_FRAME);
// console.log("DEBOUNCE", DEBOUNCE);

export const TrackCursorsHook = {
  mounted() {
    // void import("../../vendor/lodash_debounce.js").then(
    //   ({ default: _debounce }) => {

    // Mouse move
    switch (this.el.dataset.mode) {
      case "container": {
        this.el.addEventListener(
          "mousemove",
          // _debounce((e) => {
          (e) => {
            const xRatio = e.layerX / this.el.offsetWidth;
            const x = Number(xRatio * 100).toFixed(2); // in %

            const yRatio = e.layerY / this.el.offsetHeight;
            const y = Number(yRatio * 100).toFixed(2); // in %

            this.pushEvent("liveroom-cursor-moved", { x, y });
          }
          // }, DEBOUNCE)
        );
        break;
      }
      case "fullscreen": {
        document.addEventListener(
          "mousemove",
          // _debounce((e) => {
          (e) => {
            const x = Number((e.pageX / window.innerWidth) * 100).toFixed(2); // in %
            const y = Number((e.pageY / window.innerHeight) * 100).toFixed(2); // in %

            this.pushEvent("liveroom-cursor-moved", { x, y });
          }
          // }, DEBOUNCE)
        );
        break;
      }
    }

    // Resize window
    window.addEventListener(
      "resize",
      // _debounce((e) => {
      (e) => {
        this.pushEvent("liveroom-window-resize", {
          inner_width: window.innerWidth,
          inner_height: window.innerHeight,
        });
      }
      // }, DEBOUNCE)
    );
    // }
    // );
  },
};
