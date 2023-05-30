defmodule Liveroom.Analytics.Umami do
  @moduledoc """
  Umami analytics client.

  See https://github.com/umami-software/umami/blob/586529a5ca2913f43a9b14a45ea65f99164abd61/pages/api/send.ts.
  """

  require Logger

  @domain "liveroom.app"

  def send_event(event, url, user_agent, ip, opts \\ []) do
    if is_enabled?() do
      Req.post!(
        "/api/send",
        body: body(event, url, opts) |> Jason.encode!(),
        base_url: base_url(),
        headers: [
          {"User-Agent", user_agent},
          # From CLIENT_IP_HEADER env var set in umami/fly.toml
          {"umami-client-ip", ip},
          {"Content-Type", "application/json"}
        ]
      )
    end
  end

  ### Helpers

  defp body("pageview", url, opts) do
    %{
      type: "event",
      payload:
        Map.merge(payload(url, opts), %{
          referrer: Keyword.get(opts, :referrer, nil)
        })
    }
  end

  defp body(event, url, opts) do
    %{
      type: "event",
      payload:
        Map.merge(payload(url, opts), %{
          name: event,
          data: Keyword.get(opts, :props, nil)
        })
    }
  end

  defp payload(url, opts) do
    %{
      website: website_id(),
      url: url,
      hostname: @domain,
      # title: Keyword.get(opts, :title, nil), # TODO: page title ?
      language: Keyword.get(opts, :language, nil),
      screen:
        screen(
          Keyword.get(opts, :screen_width, nil),
          Keyword.get(opts, :screen_height, nil)
        )
    }
  end

  defp screen(nil, _), do: ""
  defp screen(_, nil), do: ""
  defp screen(_, ""), do: ""
  defp screen("", _), do: ""
  defp screen(width, height), do: "#{width}x#{height}"

  defp is_enabled?, do: Application.get_env(:liveroom, :umami)[:enabled]
  defp base_url, do: Application.get_env(:liveroom, :umami)[:base_url]
  defp website_id, do: Application.get_env(:liveroom, :umami)[:website_id]
end
