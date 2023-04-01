export const InitUserHook = {
  mounted() {
    add_user_connection(this.el.dataset.userUuid);
  },
  destroyed() {
    remove_user_connection(this.el.dataset.userUuid);
  },
};
