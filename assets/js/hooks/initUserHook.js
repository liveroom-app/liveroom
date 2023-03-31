export const InitUserHook = {
  mounted() {
    addUserConnection(this.el.dataset.userUuid);
  },
  destroyed() {
    removeUserConnection(this.el.dataset.userUuid);
  },
};
