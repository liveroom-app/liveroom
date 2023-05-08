defmodule LiveroomWeb.Hooks.Analytics do
  import Phoenix.LiveView
  import Phoenix.Component

  alias Phoenix.LiveView.Socket
  alias Liveroom.Analytics.Umami
  alias LiveroomWeb.RemoteIp

  @analytics_send_event "analytics_send_event"

  def on_mount(:default, _params, _session, %Socket{} = socket) do
    {:cont,
     socket
     |> assign_analytics_data()
     |> attach_hook(
       :analytics_pageview_event,
       :handle_params,
       fn _params, url, %Socket{} = socket ->
         if connected?(socket) do
           socket = update_analytics_url(socket, url)
           Task.start(fn -> send_event("pageview", socket) end)
           {:cont, socket}
         else
           {:cont, socket}
         end
       end
     )
     |> attach_hook(
       :analytics_send_event,
       :handle_event,
       fn
         @analytics_send_event, %{"event" => event} = params, %Socket{} = socket ->
           Task.start(fn ->
             send_event(event, socket, props: params["props"], url: params["url"])
           end)

           {:halt, socket}

         _event, _params, socket ->
           {:cont, socket}
       end
     )}
  end

  @doc """
  To use for any event (following an action of an user for example).
  """
  def send_event(event, %Socket{} = socket, opts \\ []) do
    Umami.send_event(
      event,
      opts[:url] || socket.assigns.analytics_data[:url],
      opts[:user_agent] || socket.assigns.analytics_data[:user_agent],
      opts[:user_ip] || socket.assigns.analytics_data[:user_ip],
      referrer: opts[:referrer] || socket.assigns.analytics_data[:referrer],
      screen_width: opts[:screen_width] || socket.assigns.analytics_data[:screen_width],
      screen_height: opts[:screen_height] || socket.assigns.analytics_data[:screen_height],
      props: opts[:props] || %{},
      language: opts[:language] || socket.assigns.analytics_data[:language]
    )
  end

  # NOTE: Not sure we will need this one with the client-side phx-hook.
  #       Let's keep it commented for now.
  # @doc """
  # JS hook to use for any event (phx binding, phx-click for example)
  # """
  # def js_send_event(js \\ %JS{}, event, props) do
  #   JS.push(js, @analytics_send_event, value: %{event: event, props: props})
  # end

  ### Helpers

  defp assign_analytics_data(%Socket{} = socket) do
    if connected?(socket) do
      socket
      |> assign(:analytics_data, %{
        user_ip: RemoteIp.get(socket),
        user_agent: get_connect_info(socket, :user_agent),
        referrer:
          get_connect_params(socket)["_live_referer"] || get_connect_params(socket)["referrer"],
        inner_width: get_connect_params(socket)["inner_width"],
        inner_height: get_connect_params(socket)["inner_height"],
        screen_width: get_connect_params(socket)["screen_width"],
        screen_height: get_connect_params(socket)["screen_height"],
        language: get_connect_params(socket)["language"]
      })
    else
      socket
    end
  end

  defp update_analytics_url(%Socket{} = socket, url) do
    assign(socket, :analytics_data, Map.put(socket.assigns.analytics_data, :url, url))
  end
end
