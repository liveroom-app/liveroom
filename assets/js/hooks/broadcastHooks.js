export const BroadcastHoveredHook = {
  mounted() {
    this.el.addEventListener("mouseover", (event) => {
      const id = (event.target || event.srcElement).id;
      this.pushEvent("element-hovered", { id });
    });

    this.el.addEventListener("mouseout", (event) => {
      const id = (event.target || event.srcElement).id;
      this.pushEvent("element-not-hovered", { id });
    });
  },
};

export const BroadcastFocusedHook = {
  mounted() {
    this.el.addEventListener("focus", (event) => {
      const id = (event.target || event.srcElement).id;
      this.pushEvent("element-focused", { id });
    });

    this.el.addEventListener("blur", (event) => {
      const id = (event.target || event.srcElement).id;
      this.pushEvent("element-not-focused", { id });
    });
  },
};
