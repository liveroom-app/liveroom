export const AnimateBackgroundHook = {
  mounted() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-phxref"
        ) {
          this.animate();
        }
      });
    });

    this.observer.observe(this.el, { attributes: true });

    this.animate();
  },

  destroyed() {
    this.observer?.disconnect();
    clearTimeout(this.timeout);
  },

  animate() {
    this.el.style.opacity = this.el.dataset.opacityanimated;
    this.el.style.boxShadow = this.el.dataset.boxshadowanimated;

    this.restartTimeout(() => {
      this.el.style.opacity = this.el.dataset.opacity;
      this.el.style.boxShadow = this.el.dataset.boxshadow;
    });
  },

  restartTimeout(handler) {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      handler();
      this.timeout = null;
    }, this.el.dataset.timeout || 5000);
  },
};
