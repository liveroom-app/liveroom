defmodule Liveroom.OrganizerFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Liveroom.Organizer` context.
  """

  @doc """
  Generate a room.
  """
  def room_fixture(attrs \\ %{}) do
    {:ok, room} =
      attrs
      |> Enum.into(%{
        slug: "some slug",
        title: "some title"
      })
      |> Liveroom.Organizer.create_room()

    room
  end
end
