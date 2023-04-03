defmodule Liveroom.Analytics.Umami do
  require Logger

  @domain "liveroom.app"

  def send_event(event, url, user_agent, ip, opts \\ []) do
    if is_enabled?() do
      Req.post!(
        "/api/collect",
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
      type: "pageview",
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
          event_name: event,
          event_data: Keyword.get(opts, :props, nil)
        })
    }
  end

  defp payload(url, opts) do
    %{
      website: website_id(),
      url: url,
      hostname: @domain,
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
