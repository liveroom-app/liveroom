import { html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import LiveState, { liveState, liveStateConfig } from "phx-live-state";

@customElement("liveroom-client-element")
@liveState({
  topic: "comments:new",
  properties: ["comments"],
  events: {
    send: ["add_comment"],
    receive: ["comment_added"],
  },
})
export class LiveroomClientElement extends LitElement {
  @property({ attribute: "url" })
  @liveStateConfig("url")
  url!: string;

  @state()
  comments: Array<Comment> = [];

  liveState: LiveState | undefined;

  @query('input[name="author"]')
  author: HTMLInputElement | undefined;

  @query('input[name="text"]')
  text: HTMLInputElement | undefined;

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
                <span part="comment-author">${comment.author}</span> at
                <span part="comment-created-at">${comment.inserted_at}</span>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  addComment(e: Event) {
    this.dispatchEvent(
      new CustomEvent("add_comment", {
        detail: {
          author: this.author?.value,
          text: this.text?.value,
        },
      })
    );
    // clear text
    this.text!.value = "";
    e.preventDefault();
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
