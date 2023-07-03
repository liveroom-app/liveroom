import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LiveState, connectElement } from "phx-live-state";

@customElement("liveroom-client-element")
export class LiveroomClientElement extends LitElement {
  @property({ attribute: "url" })
  url!: string;

  @property({ attribute: "room_id" })
  room_id!: string;

  liveState: LiveState | undefined;

  @state()
  me: User<"client"> | undefined;

  @state()
  users: { [key: string]: User } = {};

  render() {
    return html`
      <div id="users-container">
        ${Object.values(this.users).map(
          (client) =>
            html`
              <div
                id="user-${client.id}"
                class="user"
                data-isself="${client.id == this.me?.id}"
                style="--color: ${client.color}; --x: ${client.x}vw; --y: ${client.y}vh;"
              >
                <svg
                  class="cursor"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="1,99 1,1 69.3,69.3 29.1,69.3" />
                </svg>
                <span class="name">${client.name}</span>
                <div
                  class="halo"
                  data-show="${client.is_mouse_down ||
                  client.is_escape_key_down}"
                />
              </div>
            `
        )}
      </div>

      <div class="banner" style="--color: ${this.me?.color}">
        <div class="pills">
          <div class="current_user">
            <span class="colorpoint"></span>
            <p class="name">${this.me?.name}</p>
          </div>

          <div class="other_users">
            <span>${Object.values(this.users).length}</span>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
              />
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    // Setup LiveState
    const liveState = new LiveState({
      url: this.url,
      topic: `liveroom-livestate:${this.room_id}`,
      params: {
        room_id: this.room_id,
        current_url: window.origin,
        inner_width: window.innerWidth,
        inner_height: window.innerHeight,
      },
    });
    connectElement(liveState, this, {
      properties: ["room_id", "me", "users"],
      events: {
        send: [
          "mouse_move",
          "mouse_down",
          "mouse_up",
          "key_down",
          "key_up",
          "window_resize",
        ],
        receive: [],
      },
    });
    this.liveState = liveState;

    // Setup event listeners
    window.addEventListener("mousemove", this._throttledDispatchMouseMove);
    window.addEventListener("mousedown", this._dispatchMouseDown.bind(this));
    window.addEventListener("mouseup", this._dispatchMouseUp.bind(this));
    window.addEventListener("keydown", this._dispatchKeyDown.bind(this));
    window.addEventListener("keyup", this._dispatchKeyUp.bind(this));
    window.addEventListener("resize", this._dispatchWindowResize.bind(this));
  }
  disconnectedCallback() {
    // Remove event listeners
    window.removeEventListener("resize", this._dispatchWindowResize.bind(this));
    window.removeEventListener("keyup", this._dispatchKeyUp.bind(this));
    window.removeEventListener("keydown", this._dispatchKeyDown.bind(this));
    window.removeEventListener("mouseup", this._dispatchMouseUp.bind(this));
    window.removeEventListener("mousedown", this._dispatchMouseDown.bind(this));
    window.removeEventListener("mousemove", this._throttledDispatchMouseMove);

    // Disconnect LiveState
    this.liveState && this.liveState.disconnect();

    super.disconnectedCallback();
  }

  _throttledDispatchMouseMove = throttle(
    this._dispatchMouseMove.bind(this),
    15 // 15ms throttle interval = ~66.6 fps
    // 10 // 10ms throttle interval = 100 fps
  );
  _dispatchMouseMove(e: MouseEvent) {
    if (this.me) {
      this.dispatchEvent(
        new CustomEvent("mouse_move", {
          detail: {
            user_id: this.me.id,
            x: Number((e.pageX / window.innerWidth) * 100).toFixed(2), // in %
            y: Number((e.pageY / window.innerHeight) * 100).toFixed(2), // in %
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
            user_id: this.me.id,
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
            user_id: this.me.id,
          },
        })
      );
    }
  }
  _dispatchKeyDown(e: KeyboardEvent) {
    // NOTE: To avoid sending multiple keydown events when a key is held down.
    const firstTimeKeyIsPressed = !e.repeat;

    if (firstTimeKeyIsPressed && INTERESTING_KEYS.includes(e.key) && this.me) {
      this.dispatchEvent(
        new CustomEvent("key_down", {
          detail: {
            key: e.key,
            user_id: this.me.id,
          },
        })
      );
    }
  }
  _dispatchKeyUp(e: KeyboardEvent) {
    if (INTERESTING_KEYS.includes(e.key) && this.me) {
      this.dispatchEvent(
        new CustomEvent("key_up", {
          detail: {
            key: e.key,
            user_id: this.me.id,
          },
        })
      );
    }
  }
  _dispatchWindowResize(_e: UIEvent) {
    if (this.me) {
      this.dispatchEvent(
        new CustomEvent("window_resize", {
          detail: {
            inner_width: window.innerWidth,
            inner_height: window.innerHeight,
            user_id: this.me.id,
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
    }

    .user .halo {
      transform: scale(0);
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
    .user .halo[data-show="true"] {
      transform: scale(1);
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

// Constants

const INTERESTING_KEYS = ["Escape"];

// Helpers

function throttle(func: (...args: any[]) => any, limit: number) {
  let lastCall = 0;
  return function (...args: any[]) {
    let now = Date.now();
    if (now - lastCall > limit) {
      lastCall = now;
      // @ts-ignore
      return func.apply(this, args);
    }
  };
}

// Types

type UserType = "client" | "admin";

type User<T extends UserType = UserType> = {
  id: string;
  room_id: string;
  phx_ref: string;
  phx_ref_prev: string;
  type: T;
  name: string;
  color: string;
  joined_at: string;
  current_url: string;
  inner_width: string;
  inner_height: string;
  x: string;
  y: string;
  msg: string;
  is_mouse_down: boolean;
  is_escape_key_down: boolean;
  hovered_elements: Object;
  focused_elements: Object;
  inputs: Object;
};

declare global {
  interface HTMLElementTagNameMap {
    "liveroom-client-element": LiveroomClientElement;
  }
}
