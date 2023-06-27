defmodule LiveroomWeb.Components.CursorV1 do
  use LiveroomWeb, :html

  @container_padding_t 2
  @container_padding_b 4
  @container_padding_l 2
  @container_padding_r 4

  attr :id, :string, required: true
  attr :is_self, :boolean, required: true
  attr :user_id, :string, required: true
  attr :x, :string, required: true
  attr :y, :string, required: true
  attr :name, :string, required: true
  attr :color, :string, required: true
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
    <span
      id={@id}
      style={"color: #{@color}; transform: translate(#{@translate_x}, #{@translate_y});"}
      class={[
        "z-[100] absolute top-0 left-0 min-w-[25px] min-h-[25px] flex flex-col justify-start items-start",
        "pointer-events-none select-none"
      ]}
    >
      <%!-- <div
            id={"cursor_blink_#{@user_id}"}
            style={"background-color: #{@color}25; border-color: #{@color};"}
            class={[
              not @meta_is_halo_key_pressed && not @meta_is_cursor_pressed && "scale-0",
              "z-40 absolute -top-16 -left-16 h-32 w-32 border rounded-full shadow-md",
              "transition-transform duration-150 ease-out"
            ]}
          /> --%>

      <.cursor class="z-50 absolute top-0 left-0 shadow-2xl" />

      <%!-- data-isself={@is_self} --%>
      <span
        style={"background-color: #{@color};"}
        class={
          [
            "z-50 mt-[20px] ml-[25px] py-1 px-3",
            "text-sm text-brand font-semibold whitespace-nowrap",
            "rounded-full shadow-2xl"
            # "data-[isself]:bg-stone-950 data-[isself]:text-stone-50"
          ]
        }
      >
        <%= @name %>
      </span>
    </span>
    """
  end

  ### Components

  attr :class, :string, default: nil

  def cursor(assigns) do
    ~H"""
    <svg
      width="25px"
      class={["-rotate-[25deg] origin-top-left", @class]}
      viewBox="0 0 100 100"
      fill="currentColor"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <polygon points="1,99 1,1 69.3,69.3 29.1,69.3" />
    </svg>
    """
  end
end
