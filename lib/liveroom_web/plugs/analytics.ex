defmodule LiveroomWeb.Plugs.Analytics do
  import Plug.Conn

  alias Liveroom.Analytics.Umami
  alias LiveroomWeb.RemoteIp

  def init(_params), do: nil

  def call(%Plug.Conn{} = conn, _params) do
    Task.start(fn -> send_event("pageview", conn) end)
    conn
  end

  @doc """
  To use for any event (pageview or 404 for example).
  """
  def send_event(event, %Plug.Conn{} = conn, props \\ %{}) do
    Umami.send_event(
      event,
      request_url(conn),
      get_user_agent(conn),
      RemoteIp.get(conn),
      referrer: get_referrer(conn),
      # screen_width is not available
      # screen_height is not available
      props: props
      # language is not available
    )
  end

  ### Helpers

  defp get_user_agent(%Plug.Conn{} = conn) do
    conn |> get_req_header("user-agent") |> List.first()
  end

  defp get_referrer(%Plug.Conn{} = conn) do
    conn |> get_req_header("referrer") |> List.first()
  end
end
