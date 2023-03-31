defmodule Liveroom.Colors do
  @colors [
    # NOTE: List of Tailwind colors, shade 300.
    #       See https://tailwindcss.com/docs/customizing-colors#default-color-palette

    # red-300
    "#fca5a5",
    # orange-300
    "#fdba74",
    # amber-300
    "#fcd34d",
    # yellow-300
    "#fde047",
    # lime-300
    "#bef264",
    # green-300
    "#86efac",
    # emerald-300
    "#6ee7b7",
    # teal-300
    "#5eead4",
    # cyan-300
    "#67e8f9",
    # sky-300
    "#7dd3fc",
    # blue-300
    "#93c5fd",
    # indigo-300
    "#a5b4fc",
    # violet-300
    "#c4b5fd",
    # purple-300
    "#d8b4fe",
    # fuchsia-300
    "#f0abfc",
    # pink-300
    "#f9a8d4",
    # rose-300
    "#fda4af"
  ]

  def get_random_color do
    Enum.random(@colors)
  end

  # def get_hsl(string) do
  #   hue =
  #     string
  #     |> to_charlist()
  #     |> Enum.sum()
  #     |> rem(360)

  #   "hsl(#{hue}, 60%, 60%)"
  # end
end
