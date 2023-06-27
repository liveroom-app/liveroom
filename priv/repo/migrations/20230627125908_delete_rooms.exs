defmodule Liveroom.Repo.Migrations.DeleteRooms do
  use Ecto.Migration

  def change do
    drop table(:rooms)
  end
end
