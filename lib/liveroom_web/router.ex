defmodule LiveroomWeb.Router do
  use LiveroomWeb, :router

  alias LiveroomWeb.Hooks
  alias LiveroomWeb.Plugs

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {LiveroomWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    # no plug Plugs.Analytics, it is handled by a Liveview hook on mount
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :analytics do
    plug Plugs.Analytics
  end

  scope "/", LiveroomWeb do
    pipe_through :browser

    live_session :default, on_mount: [Hooks.Analytics, Hooks.Liveroom] do
      live "/", HomeLive, :index

      live "/new", Room.NewLive, :new
      live "/room/:room_slug", Room.ShowLive, :new
    end

    live_session :_liveroom_v1_admin, on_mount: [Hooks.Analytics, {Hooks.LiveroomV1, :admin}] do
      live "/session/:session_id/admin", AdminLive
    end

    live_session :_liveroom_v1_client, on_mount: [Hooks.Analytics, {Hooks.LiveroomV1, :client}] do
      live "/session/:session_id/client", ClientLive
    end
  end

  # Other scopes may use custom stacks.
  # scope "/api", LiveroomWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:liveroom, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: LiveroomWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
