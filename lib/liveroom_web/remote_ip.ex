defmodule LiveroomWeb.RemoteIp do
  @moduledoc """
  Adapted from https://github.com/plausible/analytics/blob/35ee2fe3fbea43a1112151fb950226e7d6e23433/lib/plausible_web/remote_ip.ex
  """

  def get(%Plug.Conn{} = conn) do
    headers = %{
      cf: List.first(Plug.Conn.get_req_header(conn, "cf-connecting-ip")),
      x: List.first(Plug.Conn.get_req_header(conn, "x-forwarded-for")),
      b: List.first(Plug.Conn.get_req_header(conn, "b-forwarded-for")),
      f: List.first(Plug.Conn.get_req_header(conn, "forwarded"))
    }

    get(conn.remote_ip, headers)
  end

  def get(%Phoenix.LiveView.Socket{} = socket) do
    remote_ip = Phoenix.LiveView.get_connect_info(socket, :peer_data)[:address]

    headers = %{
      cf: nil,
      x:
        Phoenix.LiveView.get_connect_info(socket, :x_headers)
        |> Map.new()
        |> Map.get("x-forwarded-for"),
      b: nil,
      f: nil
    }

    get(remote_ip, headers)
  end

  ### Helpers

  defp get(remote_ip, headers) do
    cf_connecting_ip = headers[:cf]
    x_forwarded_for = headers[:x]
    b_forwarded_for = headers[:b]
    forwarded = headers[:f]

    cond do
      cf_connecting_ip ->
        clean_ip(cf_connecting_ip)

      b_forwarded_for ->
        parse_forwarded_for(b_forwarded_for)

      x_forwarded_for ->
        parse_forwarded_for(x_forwarded_for)

      forwarded ->
        Regex.named_captures(~r/for=(?<for>[^;,]+).*$/, forwarded)
        |> Map.get("for")
        # IPv6 addresses are enclosed in quote marks and square brackets: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded
        |> String.trim("\"")
        |> clean_ip

      true ->
        to_string(:inet_parse.ntoa(remote_ip))
    end
  end

  # Removes port from both IPv4 and IPv6 addresses. From https://regexr.com/3hpvt
  # Removes surrounding [] of an IPv6 address
  @port_regex ~r/((\.\d+)|(\]))(?<port>:[0-9]+)$/
  defp clean_ip(ip_and_port) do
    ip =
      case Regex.named_captures(@port_regex, ip_and_port) do
        %{"port" => port} -> String.trim_trailing(ip_and_port, port)
        _ -> ip_and_port
      end

    ip
    |> String.trim_leading("[")
    |> String.trim_trailing("]")
  end

  defp parse_forwarded_for(header) do
    String.split(header, ",")
    |> Enum.map(&String.trim/1)
    |> List.first()
    |> clean_ip
  end
end
