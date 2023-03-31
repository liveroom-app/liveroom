export const HandleIceCandidateOfferHook = {
  mounted() {
    const data = this.el.dataset;
    const from_user = data.fromUserUuid;
    const ice_candidate = JSON.parse(data.iceCandidate);
    const peer_connection = users[from_user].peer_connection;

    console.log("new ice candidate from", from_user, ice_candidate);

    peer_connection.addIceCandidate(ice_candidate);
  },
};

export const HandleSdpOfferHook = {
  mounted() {
    const data = this.el.dataset;
    const from_user = data.fromUserUuid;
    const sdp = data.sdp;

    if (sdp != "") {
      console.log("new sdp OFFER from", from_user, sdp);
      create_peer_connection(this, from_user, sdp);
    }
  },
};

export const HandleAnswerHook = {
  mounted() {
    const data = this.el.dataset;
    const from_user = data.fromUserUuid;
    const sdp = data.sdp;
    const peer_connection = users[fromUser].peerConnection;

    if (sdp != "") {
      console.log("new sdp ANSWER from", from_user, sdp);
      peer_connection.setRemoteDescription({ type: "answer", sdp });
    }
  },
};
