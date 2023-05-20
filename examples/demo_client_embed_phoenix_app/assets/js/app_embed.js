import "phoenix_html";
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");

// const url ="/live"
// const url = "http://localhost:4000/session/abc/client_embed";
const url = "http://localhost:4000/live";

let liveSocket = new LiveSocket(url, Socket, {
  params: { _csrf_token: csrfToken },
});

liveSocket.connect();

window.liveSocketEmbed = liveSocket;
