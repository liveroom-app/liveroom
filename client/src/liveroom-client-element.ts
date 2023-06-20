import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { liveState, liveStateConfig } from "phx-live-state";

@customElement("liveroom-client-element")
@liveState({
  topic: "liveroom:test_room",
  properties: ["room", "me", "clients"],
  events: {
    send: ["mouse_moved", "mouse_down", "mouse_up"],
    receive: [],
  },
})
export class LiveroomClientElement extends LitElement {
  @liveStateConfig("url")
  @property({ attribute: "url" })
  url!: string;

  @property({ attribute: "room" })
  room!: string;

  @state()
  me: Client | undefined;

  @state()
  clients: { [key: string]: Client } = {};

  render() {
    return html`
      <div id="users-container">
        ${Object.values(this.clients).map(
          (client) =>
            html`
              <div
                id="user-${client.id}"
                class="user"
                data-isself="${client.id == this.me?.id}"
                data-ismousedown="${client.is_mouse_down}"
                style="--color: ${client.color}; --x: ${client.x}px; --y: ${client.y}px"
              >
                <svg
                  class="cursor"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="1,99 1,1 69.3,69.3 29.1,69.3" />
                </svg>
                <span class="name">${client.name}</span>
                <div class="halo" />
              </div>
            `
        )}
        <!-- TODO: show admin users -->
      </div>

      <div class="banner" style="--color: ${this.me?.color}">
        <div class="pills">
          <div class="current_user">
            <span class="colorpoint"></span>
            <p class="name">${this.me?.name}</p>
          </div>

          <div class="other_users">
            <span>${Object.values(this.clients).length}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    // Mouse move
    window.addEventListener("mousemove", this._dispatchMouseMoved.bind(this));

    // Mouse click
    window.addEventListener("mousedown", this._dispatchMouseDown.bind(this));
    window.addEventListener("mouseup", this._dispatchMouseUp.bind(this));
  }
  disconnectedCallback() {
    window.removeEventListener("mouseup", this._dispatchMouseUp.bind(this));
    window.removeEventListener("mousedown", this._dispatchMouseDown.bind(this));
    window.removeEventListener(
      "mousemove",
      this._dispatchMouseMoved.bind(this)
    );
    super.disconnectedCallback();
  }

  _dispatchMouseMoved(e: MouseEvent) {
    if (this.me) {
      this.dispatchEvent(
        new CustomEvent("mouse_moved", {
          detail: {
            client_id: this.me.id,
            x: e.pageX,
            y: e.pageY,
          },
        })
      );
    }
  }
  _dispatchMouseDown(_e: MouseEvent) {
    if (this.me) {
      this.dispatchEvent(
        new CustomEvent("mouse_down", {
          detail: {
            client_id: this.me.id,
          },
        })
      );
    }
  }
  _dispatchMouseUp(_e: MouseEvent) {
    if (this.me) {
      this.dispatchEvent(
        new CustomEvent("mouse_up", {
          detail: {
            client_id: this.me.id,
          },
        })
      );
    }
  }

  static styles = css`
    .user {
      z-index: 1000;
      position: absolute;
      top: 0;
      left: 0;
      color: var(--color);
      user-select: none;
      transform: translate(var(--x), var(--y));
      // filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2));
    }

    .user .halo {
      position: absolute;
      top: -50px;
      left: -50px;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      background-color: var(--color);
      opacity: 0.2;
      transition: transform 0.15s ease-out;
    }
    .user[data-ismousedown="false"] .halo {
      transform: scale(0);
    }

    .user .cursor {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      transform-origin: top left;
      transform: rotate(-25deg);
    }
    .user[data-isself="true"] .cursor {
      display: none;
    }

    .user .name {
      position: absolute;
      top: 12px;
      left: 17px;
      padding: 1px 8px;
      font-size: 14px;
      font-weight: 600;
      color: black;
      background-color: var(--color);
      white-space: nowrap;
      border-radius: 9999px;
    }
    .user[data-isself="true"] .name {
      display: none;
    }

    .banner {
      position: fixed;
      bottom: 12px;
      inset-inline: 0;
      display: flex;
      justify-content: center;
      justify-items: center;
    }

    .banner .pills {
      display: flex;
      justify-content: between;
      align-items: center;
      gap: 36px;
      padding: 3px 8px;
      background-color: white;
      border-radius: 9999px;
    }

    .banner .pills .current_user {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    .banner .pills .current_user .colorpoint {
      display: block;
      width: 14px;
      height: 14px;
      border-radius: 100%;
      background-color: var(--color);
    }
    .banner .pills .current_user .name {
      margin: 0;
      font-size: 14px;
      font-weight: bold;
      color: black;
    }

    .banner .pills .other_users {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      color: gray;
    }
    .banner .pills .other_users span {
      font-size: 14px;
      font-weight: bold;
    }
    .banner .pills .other_users svg {
      width: 18px;
      opacity: 0.8;
    }
  `;
}

// Types
type Client = {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  is_mouse_down: boolean;
  joined_at: string;
};

declare global {
  interface HTMLElementTagNameMap {
    "liveroom-client-element": LiveroomClientElement;
  }
}
