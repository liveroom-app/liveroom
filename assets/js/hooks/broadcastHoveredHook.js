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
