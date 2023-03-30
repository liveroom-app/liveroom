defmodule Liveroom.Names do
  @names [
    "Mayra",
    "Keith",
    "Mabel",
    "Lana",
    "Celine",
    "Yahya",
    "Robin",
    "Daniel",
    "Reece",
    "Margaret",
    "Rian",
    "Cyrus",
    "Naya",
    "Amber",
    "Kara",
    "Emmett",
    "Bella",
    "Annalise",
    "Chloe",
    "Brayden"
  ]

  def generate do
    Enum.random(@names)
  end
end
