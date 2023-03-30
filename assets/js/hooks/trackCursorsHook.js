export const TrackCursorsHook = {
  mounted() {
    document.addEventListener("mousemove", (e) => {
      const x = (e.pageX / window.innerWidth) * 100; // in %
      const y = (e.pageY / window.innerHeight) * 100; // in %

      this.pushEvent("cursor-move", { x, y });
    });
  },
};
