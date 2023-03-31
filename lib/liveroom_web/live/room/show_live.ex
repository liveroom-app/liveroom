defmodule LiveroomWeb.Room.ShowLive do
  @moduledoc """
  A LiveView for creating and joining chat rooms.
  """

  use LiveroomWeb, :live_view

  alias Phoenix.Socket.Broadcast
  alias Liveroom.Organizer
  alias Liveroom.ConnectedUser
  alias LiveroomWeb.Presence

  @impl true
  def render(assigns) do
    ~H"""
    <h1><%= @room.title %></h1>

    <h3>Connected Users:</h3>

    <ul>
      <li :for={uuid <- @connected_users}>
        <%= uuid %>
      </li>
    </ul>

    <div class="streams">
      <video
        id="local-video"
        width="600"
        style="transform: rotateY(180deg);"
        playsinline
        autoplay
        muted
      >
      </video>

      <video
        :for={uuid <- @connected_users}
        id={"remote-video-#{uuid}"}
        phx-hook="InitUserHook"
        data-user-uuid={uuid}
        playsinline
        autoplay
      >
      </video>
    </div>

    <button id="enter-room-btn" class="" phx-hook="JoinCallHook" phx-click="join_call">Enter</button>

    <div id="offer-requests">
      <span
        :for={request <- @offer_requests}
        id={"offer-request-from-user-#{request.from_user.uuid}"}
        phx-hook="HandleOfferRequestHook"
        data-user-uuid={request.from_user.uuid}
      />
    </div>

    <div id="sdp-offers">
      <span
        :for={sdp_offer <- @sdp_offers}
        id={"sdp-request-from-user-#{sdp_offer["from_user"]}"}
        phx-hook="HandleSdpOfferHook"
        data-from-user-uuid={sdp_offer["from_user"]}
      />
    </div>

    <div id="sdp-answers">
      <span
        :for={answer <- @answers}
        id={"sdp-answer-from-user-#{answer["from_user"]}"}
        phx-hook="HandleAnswerHook"
        data-from-user-uuid={answer["from_user"]}
        data-sdp={answer["description"]["sdp"]}
      />
    </div>

    <div id="ice-candidates">
      <span
        :for={ice_candidate_offer <- @ice_candidate_offers}
        id={"ice-candidate-from-user-#{ice_candidate_offer["from_user"]}"}
        phx-hook="HandleIceCandidateOfferHook"
        data-from-user-uuid={ice_candidate_offer["from_user"]}
        data-ice-candidate={Jason.encode!(ice_candidate_offer["candidate"])}
      />
    </div>
    """
  end

  ### Server

  @impl true
  def mount(%{"room_slug" => slug}, _session, socket) do
    user = create_connected_user()

    if connected?(socket) do
      Phoenix.PubSub.subscribe(Liveroom.PubSub, "room:" <> slug)
      Phoenix.PubSub.subscribe(Liveroom.PubSub, "room:" <> slug <> ":" <> user.uuid)
      {:ok, _} = Presence.track(self(), "room:" <> slug, user.uuid, %{})
    end

    case Organizer.get_room_by_slug(slug) do
      nil ->
        {:ok,
         socket
         |> put_flash(:error, "That room does not exist.")
         |> push_navigate(to: ~p"/room/new")}

      room ->
        {:ok,
         socket
         |> assign(
           room: room,
           user: user,
           slug: slug,
           connected_users: [],
           offer_requests: [],
           ice_candidates_offers: [],
           sdp_offers: [],
           answers: []
         )}
    end
  end

  @impl true
  def handle_event("join_call", _params, socket) do
    for user <- socket.assigns.connected_users do
      send_direct_message(
        socket.assigns.slug,
        user,
        "request_offers",
        %{from_user: socket.assigns.user}
      )
    end

    {:noreply, socket}
  end

  def handle_event("new_ice_candidate", payload, socket) do
    payload = Map.merge(payload, %{"from_user" => socket.assigns.user.uuid})

    send_direct_message(socket.assigns.slug, payload["toUser"], "new_ice_candidate", payload)
    {:noreply, socket}
  end

  def handle_event("new_sdp_offer", payload, socket) do
    payload = Map.merge(payload, %{"from_user" => socket.assigns.user.uuid})

    send_direct_message(socket.assigns.slug, payload["toUser"], "new_sdp_offer", payload)
    {:noreply, socket}
  end

  def handle_event("new_answer", payload, socket) do
    payload = Map.merge(payload, %{"from_user" => socket.assigns.user.uuid})

    send_direct_message(socket.assigns.slug, payload["toUser"], "new_answer", payload)
    {:noreply, socket}
  end

  @impl true
  def handle_info(%Broadcast{event: "presence_diff"}, socket) do
    {:noreply, assign(socket, connected_users: list_present(socket))}
  end

  def handle_info(%Broadcast{event: "request_offers", payload: request}, socket) do
    {:noreply, assign(socket, offer_requests: socket.assigns.offer_requests ++ [request])}
  end

  def handle_info(%Broadcast{event: "new_ice_candidate", payload: payload}, socket) do
    {:noreply,
     assign(socket, ice_candidate_offers: socket.assigns.ice_candidate_offers ++ [payload])}
  end

  def handle_info(%Broadcast{event: "new_sdp_offer", payload: payload}, socket) do
    {:noreply, assign(socket, sdp_offers: socket.assigns.ice_candidate_offers ++ [payload])}
  end

  def handle_info(%Broadcast{event: "new_answer", payload: payload}, socket) do
    {:noreply, assign(socket, answers: socket.assigns.answers ++ [payload])}
  end

  ### Helpers

  defp list_present(socket) do
    Presence.list("room:" <> socket.assigns.slug)
    # Phoenix Presence provide nice metadata, but we don't need it
    |> Enum.map(fn {k, _} -> k end)
  end

  defp create_connected_user do
    %ConnectedUser{uuid: Ecto.UUID.generate()}
  end

  defp send_direct_message(slug, to_user, event, payload) do
    LiveroomWeb.Endpoint.broadcast_from(
      self(),
      "room:" <> slug <> ":" <> to_user,
      event,
      payload
    )
  end
end
