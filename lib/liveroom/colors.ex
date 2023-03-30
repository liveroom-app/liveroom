defmodule Liveroom.Colors do
  def get_hsl(string) do
    hue =
      string
      |> to_charlist()
      |> Enum.sum()
      |> rem(360)

    "hsl(#{hue}, 70%, 40%)"
  end
end
