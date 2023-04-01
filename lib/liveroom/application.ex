defmodule Liveroom.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      LiveroomWeb.Telemetry,
      # Start the Ecto repository
      Liveroom.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Liveroom.PubSub},
      # Start Finch
      {Finch, name: Liveroom.Finch},
      LiveroomWeb.Presence,
      # Start the Endpoint (http/https)
      LiveroomWeb.Endpoint
      # LiveroomWeb.Stun
      # Start a worker by calling: Liveroom.Worker.start_link(arg)
      # {Liveroom.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Liveroom.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    LiveroomWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
