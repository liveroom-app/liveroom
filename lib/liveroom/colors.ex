defmodule Liveroom.Colors do
  # NOTE: List of Tailwind colors, shade 300.
  #       See https://tailwindcss.com/docs/customizing-colors#default-color-palette
  @admin_colors [
    # red-300
    "#fca5a5",
    # orange-300
    "#fdba74",
    # amber-300
    "#fcd34d",
    # yellow-300
    "#fde047",

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
  @client_colors [
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
    "#93c5fd"
  ]
  @colors @admin_colors ++ @client_colors

  def get_random_color(type \\ nil)

  def get_random_color(nil = _type) do
    Enum.random(@colors)
  end

  def get_random_color(type) when type in [:admin, "admin"] do
    Enum.random(@admin_colors)
  end

  def get_random_color(type) when type in [:client, "client"] do
    Enum.random(@client_colors)
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
