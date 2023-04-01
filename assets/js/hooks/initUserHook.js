import { add_user_connection, remove_user_connection } from "../videochat";

export const InitUserHook = {
  mounted() {
    console.log("init user hook mounted", this.el.dataset.userUuid);

    add_user_connection(this.el.dataset.userUuid);
  },
  destroyed() {
    console.log("init user hook DESTROYED", this.el.dataset.userUuid);

    remove_user_connection(this.el.dataset.userUuid);
  },
};
