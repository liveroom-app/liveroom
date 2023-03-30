defmodule Liveroom.Repo do
  use Ecto.Repo,
    otp_app: :liveroom,
    adapter: Ecto.Adapters.Postgres
end
