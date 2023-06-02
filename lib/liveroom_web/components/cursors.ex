defmodule LiveroomWeb.Components.Cursors do
  use LiveroomWeb, :html

  attr :socket_id, :string, required: true
  attr :users, :list, required: true

  def render(assigns) do
    ~H"""
    <ul
      id="playground_cursors"
      phx-hook="TrackCursorsHook"
      data-mode="fullscreen"
      data-mouseclick="true"
      data-keyboardpress="true"
      class="list-none "
    >
      <%!-- NOTE: A JS hook + passing color,x,y as data attributes would allow
                  to further optimize the payload over the wire.
                  But this feels like a good tradeoff, to have all the logic in one place. --%>
      <li
        :for={user <- @users}
        style={"--color: #{user.color}; --x: #{user.x}vw; --y: #{user.y}vh;"}
        class={[
          "text-[color:var(--color)]",
          "translate-x-[calc(var(--x)-10px)] translate-y-[calc(var(--y)-11px)]",
          "z-[100] absolute top-0 left-0 flex flex-col justify-start items-start pt-[24px]",
          "pointer-events-none select-none"
        ]}
      >
        <%!-- Halo --%>
        <div
          id={"cursor_blink_#{user.socket_id}"}
          data-hidden={not user.is_halo_key_pressed and not user.is_cursor_pressed}
          class={[
            "data-[hidden]:scale-0",
            "bg-[color:var(--color)]",
            "border-[color:var(--color)]",
            "opacity-25",
            "z-40 absolute -top-16 -left-16 h-32 w-32 border rounded-full shadow-md",
            "transition-transform duration-150 ease-out"
          ]}
        />

        <%!-- Cursor --%>
        <.cursor :if={user.socket_id != @socket_id} class="z-50 absolute top-0 left-0 shadow-2xl" />

        <%!-- Name --%>
        <span
          :if={user.socket_id != @socket_id}
          data-hidden={user.msg != ""}
          class={[
            "data-[hidden]:hidden",
            "bg-[color:var(--color)]",
            "z-50 ml-[30px] py-1 px-3 text-sm text-brand font-semibold whitespace-nowrap rounded-full shadow-2xl"
          ]}
        >
          <%= user.name %>
        </span>

        <%!-- Message --%>
        <span
          data-hidden={user.msg == ""}
          class={[
            "data-[hidden]:hidden",
            "bg-[color:var(--color)]",
            "z-50 ml-[30px] max-w-[50ch] py-1 px-3 text-sm truncate text-brand font-semibold whitespace-nowrap rounded-full shadow-2xl"
          ]}
        >
          <%= user.msg %>
        </span>
      </li>
    </ul>
    """
  end

  ### Components

  attr :class, :string, default: nil

  def cursor(assigns) do
    ~H"""
    <svg
      version="1.1"
      class={["-rotate-[25deg]", @class]}
      width="30px"
      height="30px"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 21 21"
      fill="currentColor"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <filter color-interpolation-filters="sRGB">
        <feDropShadow dx="1" dy="1" stdDeviation="0.5" flood-opacity="0.2" />
      </filter>

      <polygon points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6" />
      <polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5" />
      <%!-- <polygon filter="url(#shadow)" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6" />
      <polygon filter="url(#shadow)" points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5" /> --%>
    </svg>
    """
  end
end
