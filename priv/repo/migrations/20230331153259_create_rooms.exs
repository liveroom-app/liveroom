defmodule Liveroom.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :title, :string
      add :slug, :string

      timestamps()
    end

    create unique_index(:rooms, :slug)
  end
end
