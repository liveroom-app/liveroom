defmodule LiveroomWeb.Room.NewLive do
  use LiveroomWeb, :live_view

  alias Liveroom.Repo
  alias Liveroom.Organizer.Room

  @impl true
  def render(assigns) do
    ~H"""
    <h1>Create a New Room</h1>

    <form id="room_form" phx-change="validate" phx-submit="save">
      <input type="text" name="title" label="Title" />
      <input type="text" name="slug" label="Slug" />

      <button type="submit" class="group" phx-disable-with="Entering...">
        Enter
        <.icon
          name="hero-arrow-right-mini"
          class="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
        />
      </button>
    </form>
    """
  end

  ### Components

  ### Server

  @impl true
  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> put_changeset()}
  end

  @impl true
  def handle_event("validate", room_params, socket) do
    {:noreply,
     socket
     |> put_changeset(room_params)}
  end

  def handle_event("save", _, %{assigns: %{changeset: changeset}} = socket) do
    case Repo.insert(changeset) do
      {:ok, room} ->
        {:noreply,
         socket
         |> push_navigate(to: ~p"/room/#{room.slug}")}

      {:error, changeset} ->
        {:noreply,
         socket
         |> assign(:changeset, changeset)
         |> put_flash(:error, "Could not save the room.")}
    end
  end

  ### Helpers

  defp put_changeset(socket, params \\ %{}) do
    socket
    |> assign(:changeset, Room.changeset(%Room{}, params))
  end
end
