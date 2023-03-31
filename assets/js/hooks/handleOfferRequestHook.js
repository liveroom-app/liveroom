export const HandleOfferRequestHook = {
  mounted() {
    console.log("new offer request from", this.el.dataset.fromUserUuid);

    const from_user = this.el.dataset.fromUserUuid;
    createPeerConnection(this, from_user);
  },
};
