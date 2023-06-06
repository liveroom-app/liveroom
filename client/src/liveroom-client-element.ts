import { html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import LiveState, { connectElement } from "phx-live-state";

@customElement("liveroom-client-element")
export class LiveroomClientElement extends LitElement {
  @property()
  url: string | undefined;

  @state()
  comments: Array<Comment> = [];

  liveState: LiveState | undefined;

  connectedCallback() {
    super.connectedCallback();

    console.log(`connecting to ${this.url}`);

    const liveState = new LiveState({
      url: this.url,
      topic: `comments:${window.location.href}`,
    });

    connectElement(liveState, this, {
      properties: ["comments"],
      events: {
        send: ["add_comment"],
        receive: ["comment_added"],
      },
    });
  }

  @query('input[name="author"]')
  author: HTMLInputElement | undefined;

  @query('input[name="text"]')
  text: HTMLInputElement | undefined;

  addComment(e: Event) {
    this.dispatchEvent(
      new CustomEvent("add_comment", {
        detail: {
          author: this.author?.value,
          text: this.text?.value,
        },
      })
    );
    e.preventDefault();
  }

  render() {
    return html`
      <div part="new-comment">
        <form part="form" @submit=${this.addComment}>
          <div part="comment-field-author">
            <label part="author-label" for="author">Author</label>
            <input part="author-input" id="author" name="author" required />
          </div>

          <div part="comment-field-text">
            <label part="comment-label" for="comment">Comment</label>
            <input part="comment-input" id="comment" name="text" required />
          </div>

          <button part="add-comment-button">Add Comment</button>
        </form>
      </div>

      <div part="previous-comments">
        ${this.comments?.map(
          (comment) => html`
            <div part="comment">
              <div part="comment-text">${comment.text}</div>

              <div part="byline">
                <span part="comment-author">${comment.author}</span> on
                <span part="comment-created-at">${comment.inserted_at}</span>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

// Types
type Comment = {
  author: string;
  inserted_at: string;
  text: string;
};

declare global {
  interface HTMLElementTagNameMap {
    "liveroom-client-element": LiveroomClientElement;
  }
}
