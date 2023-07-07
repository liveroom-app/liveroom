export const AnimateHook = {
  mounted() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-watched"
        ) {
          this.applyTemporaryDataAttribute();
        }
      });
    });

    this.observer.observe(this.el, { attributes: true });

    if (this.el.dataset.animateonmount === "true") {
      this.applyTemporaryDataAttribute();
    }
  },

  destroyed() {
    this.observer?.disconnect();
    clearTimeout(this.timeout_ref);
  },

  applyTemporaryDataAttribute() {
    this.el.setAttribute("data-animated", "true");

    this.restartTimeout(() => {
      this.el.removeAttribute("data-animated");
    });
  },

  restartTimeout(handler) {
    clearTimeout(this.timeout_ref);

    const timeout = this.el.dataset.timeout
      ? parseInt(this.el.dataset.timeout, 10)
      : 300;

    this.timeout_ref = setTimeout(() => {
      handler();
      this.timeout_ref = null;
    }, timeout);
  },
};
