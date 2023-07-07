defmodule LiveroomWeb.Components.Cursor do
  use LiveroomWeb, :live_component

  @container_padding_t 2
  @container_padding_b 4
  @container_padding_l 2
  @container_padding_r 4

  attr :id, :string, required: true
  attr :is_self, :boolean, required: true
  attr :show_self, :boolean, default: false
  attr :show_halo, :boolean, default: true
  attr :user_id, :string, required: true
  attr :x, :string, required: true
  attr :y, :string, required: true
  attr :name, :string, required: true
  attr :color, :string, required: true
  attr :is_escape_key_down, :boolean, required: true
  attr :is_mouse_down, :boolean, required: true
  attr :msg, :string, required: true
  attr :mode, :atom, values: ~w"full_screen container"a, required: true
  attr :container_width, :string, default: nil
  attr :container_height, :string, default: nil

  def render(assigns) do
    assigns =
      assign(
        assigns,
        case assigns.mode do
          :full_screen ->
            [
              translate_x: "#{assigns.x}vw",
              translate_y: "#{assigns.y}vh"
            ]

          :container ->
            {x, ""} = Float.parse(assigns.x)
            {y, ""} = Float.parse(assigns.y)

            [
              translate_x:
                (x / 100 * assigns.container_width)
                |> max(@container_padding_l)
                |> min(assigns.container_width - @container_padding_r)
                |> round()
                |> then(&"#{&1}px"),
              translate_y:
                (y / 100 * assigns.container_height)
                |> max(@container_padding_t)
                |> min(assigns.container_height - @container_padding_b)
                |> round()
                |> then(&"#{&1}px")
            ]
        end
      )

    ~H"""
    <div
      id={@id}
      style={"--color: #{@color}; --x: #{@translate_x}; --y: #{@translate_y};"}
      class={[
        "translate-x-[var(--x)] translate-y-[var(--y)]",
        "z-[1000] absolute top-0 left-0",
        "pointer-events-none select-none group"
      ]}
    >
      <%!-- Cursor --%>
      <.svg_cursor
        data-hidden={@is_self and not @show_self}
        class="data-[hidden]:hidden absolute top-0 left-0 text-[color:var(--color)]"
      />

      <%!-- Msg or Name --%>
      <span
        data-hidden={@is_self and not @show_self and @msg == ""}
        class={[
          "data-[hidden]:hidden",
          "absolute top-[20px] left-[16px] max-w-[50ch] py-1 px-2.5",
          "text-sm text-brand font-semibold truncate",
          "bg-[color:var(--color)]",
          "rounded-full shadow-sm"
        ]}
      >
        <%= if @msg != "", do: @msg, else: @name %>
      </span>

      <%!-- Halo --%>
      <%!-- TODO: how to have an background opacity of 25% while keeping the border at 100%? --%>
      <div
        :if={@show_halo}
        data-show={@is_escape_key_down || @is_mouse_down}
        class={[
          "scale-0 data-[show]:scale-100",
          "z-[-1] absolute -top-[60px] -left-[60px] h-[120px] w-[120px]",
          "bg-[color:var(--color)]",
          "border border-[color:var(--color)] rounded-full",
          "opacity-25 shadow-sm",
          "transition-transform duration-150 ease-out"
        ]}
      />
    </div>
    """
  end

  ### Components

  attr :class, :string, default: nil
  attr :rest, :global, default: %{}

  def svg_cursor(assigns) do
    ~H"""
    <svg
      width="23"
      viewBox="0 0 27 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      class={["rotate-6 origin-top-left", @class]}
      {@rest}
    >
      <%!-- TODO: find a way to do a proper, clean, shadow --%>
      <path d="M2.2706 0.0593359L25.4277 8.05957H25.45926C25.65896 8.13153 25.83096 8.25952 25.95221 8.42653C26.07357 8.59354 26.13851 8.79166 26.13851 8.99459C26.13851 9.19751 26.07357 9.39564 25.95221 9.56265C25.83096 9.72966 25.65896 9.85765 25.45926 9.92962L15.3543 13.7698L11.3124 23.37C11.2344 23.5561 11.0994 23.7156 10.9248 23.828C10.7503 23.9402 10.5443 24.0002 10.3335 24C10.1172 24 9.9061 23.9365 9.7291 23.8184C9.552 23.7004 9.4176 23.5332 9.344 23.34L0.9233 1.33937C0.8555 1.16076 0.8426 0.967504 0.8861 0.782189C0.9297 0.596873 1.0278 0.427163 1.1691 0.292901C1.3105 0.158639 1.4891 0.0653762 1.6841 0.0240151C1.8792 -0.0173461 2.0826 -0.00509504 2.2706 0.0593359Z" />
    </svg>
    """
  end
end
