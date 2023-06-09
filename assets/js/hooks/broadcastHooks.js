export const BroadcastHoveredHook = {
  mounted() {
    this.el.addEventListener("mouseover", (event) => {
      const id = (event.target || event.srcElement).id;
      this.pushEvent("liveroom-element-mouseover", { id });
    });

    this.el.addEventListener("mouseout", (event) => {
      const id = (event.target || event.srcElement).id;
      this.pushEvent("liveroom-element-mouseout", { id });
    });
  },
};

export const BroadcastFocusedHook = {
  mounted() {
    this.el.addEventListener("focus", (event) => {
      const id = (event.target || event.srcElement).id;
      this.pushEvent("liveroom-element-focus", { id });
    });

    this.el.addEventListener("blur", (event) => {
      const id = (event.target || event.srcElement).id;
      this.pushEvent("liveroom-element-blur", { id });
    });
  },
};
