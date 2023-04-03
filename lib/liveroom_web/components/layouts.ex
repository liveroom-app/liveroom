defmodule LiveroomWeb.Layouts do
  use LiveroomWeb, :html

  def render("app.html", assigns) do
    ~H"""
    <div class="min-h-[100dvh] grid grid-cols-1 grid-rows-[auto_1fr_auto] overflow-hidden">
      <.flash_group flash={@flash} />

      <%!-- <LiveroomWeb.Header.render /> --%>

      <main class="h-full overflow-x-hidden flex-col flex items-center">
        <%= @inner_content %>
      </main>
    </div>
    """
  end

  def render("root.html", assigns) do
    ~H"""
    <!DOCTYPE html>
    <html lang="en" style="scrollbar-gutter: stable;">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content={get_csrf_token()} />

        <meta name="theme-color" content="#111827" />
        <meta name="description" content="Collaborate live with your users." />

        <%!-- NOTE: Check rendering with https://socialsharepreview.com --%>

        <%!-- Facebook Open Graph meta tags --%>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={assigns[:page_title] || "Liveroom"} />
        <meta
          property="og:description"
          content={assigns[:page_description] || "Collaborate live with your users."}
        />
        <meta property="og:url" content={assigns[:current_url] || "https://liveroom.app"} />
        <meta
          property="og:image"
          content={
            assigns[:page_image] ||
              LiveroomWeb.Endpoint.static_url() <> ~p"/images/liveroom_og_image.jpg"
          }
        />

        <%!-- Twitter Card meta tags --%>
        <meta name="twitter:card" content={assigns[:page_twitter_card] || "summary_large_image"} />
        <meta name="twitter:domain" content="liveroom.app" />

        <.live_title><%= assigns[:page_title] || "Liveroom" %></.live_title>

        <%!-- <link rel="manifest" href={~p"/manifest.json"} /> --%>
        <link rel="icon" href={~p"/favicon.ico"} />
        <%!-- <link rel="icon" href={~p"/favicon.ico"} sizes="any" /> --%>
        <%!-- <link rel="icon" href={~p"/images/icons/icon.svg"} type="image/svg+xml" /> --%>
        <link rel="apple-touch-icon" href={~p"/images/icons/apple-touch-icon.png"} />

        <link phx-track-static rel="stylesheet" href={~p"/assets/app.css"} />

        <script defer phx-track-static type="text/javascript" src={~p"/assets/app.js"}>
        </script>
      </head>

      <body class="h-full bg-background antialiased">
        <%= @inner_content %>
      </body>
    </html>
    """
  end
end
