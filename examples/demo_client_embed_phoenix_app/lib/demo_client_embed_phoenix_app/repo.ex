defmodule DemoClientEmbedPhoenixApp.Repo do
  use Ecto.Repo,
    otp_app: :demo_client_embed_phoenix_app,
    adapter: Ecto.Adapters.Postgres
end
