const TIMEOUT_DELAY = 10 * 1000;

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
    this.observer.disconnect();
    if (this.timeout) clearTimeout(this.timeout);
  },

  animate() {
    const opacity = this.el.dataset.opacity;

    this.el.style.opacity = 1;
    this.el.style.boxShadow = undefined;

    this.restartTimeout(() => {
      this.el.style.opacity = opacity;
      this.el.style.boxShadow = "none";
    });
  },

  restartTimeout(handler) {
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.timeout = null;
      handler();
    }, TIMEOUT_DELAY);
  },
};
