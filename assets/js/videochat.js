export const users = {};

export function add_user_connection(user_uuid) {
  if (users[user_uuid] === undefined) {
    users[user_uuid] = { peer_connection: null };
  }

  return users;
}

export function remove_user_connection(user_uuid) {
  delete users[user_uuid];
  return users;
}

/**
 *
 * @param {*} lv Our LiveView hook's `this` object.
 * @param {*} from_user The user to create the peer connection with.
 * @param {*} offer Stores an SDP offer if it was passed to the function.
 * @returns
 */
export function create_peer_connection(lv, from_user, offer) {
  console.log("creating peer connection...");

  // Creates a variable for our peer connection to reference within
  // this function's scope.
  const new_peer_connection = new RTCPeerConnection({
    iceServers: [
      // We're going to get into STUN servers later, but for now, you
      // may use ours for this portion of development.
      // { urls: "stun:liveroom.app:3478" },
      { urls: "stun:stun.easyvoip.com:3478" },
    ],
  });

  // Add this new peer connection to our `users` object.
  if (users[from_user] && new_peer_connection)
    users[from_user].peer_connection = new_peer_connection;

  // Add each local track to the RTCPeerConnection.
  localStream
    .getTracks()
    .forEach((track) => new_peer_connection.addTrack(track, localStream));

  // If creating an answer, rather than an initial offer.
  if (offer !== undefined && new_peer_connection) {
    new_peer_connection.setRemoteDescription({ type: "offer", sdp: offer });
    new_peer_connection
      .createAnswer()
      .then((answer) => {
        new_peer_connection.setLocalDescription(answer);
        console.log("Sending this ANSWER to the requester:", answer);
        lv.pushEvent("new_answer", { to_user: from_user, description: answer });
      })
      .catch((err) => console.log(err));
  }

  if (new_peer_connection)
    new_peer_connection.onicecandidate = async ({ candidate }) => {
      // from_user is the new value for to_user because we're sending this data back
      // to the sender
      lv.pushEvent("new_ice_candidate", { to_user: from_user, candidate });
    };

  // Don't add the `onnegotiationneeded` callback when creating an answer due to
  // a bug in Chrome's implementation of WebRTC.
  if (offer === undefined && new_peer_connection) {
    new_peer_connection.onnegotiationneeded = async () => {
      try {
        new_peer_connection
          .createOffer()
          .then((offer) => {
            new_peer_connection.setLocalDescription(offer);
            console.log("Sending this OFFER to the requester:", offer);
            lv.pushEvent("new_sdp_offer", {
              to_user: from_user,
              description: offer,
            });
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    };
  }

  // When the data is ready to flow, add it to the correct video.
  if (new_peer_connection)
    new_peer_connection.ontrack = async (event) => {
      console.log("Track received:", event);
      document.getElementById(`remote-video-${from_user}`).srcObject =
        event.streams[0];
    };

  return new_peer_connection;
}
