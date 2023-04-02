defmodule LiveroomWeb.Room.NewLive do
  use LiveroomWeb, :live_view

  alias Liveroom.Repo
  alias Liveroom.Organizer.Room

  @impl true
  def render(assigns) do
    ~H"""
    <div class="min-h-screen w-full flex flex-col justify-center items-center">
      <div class="max-w-xs w-full flex flex-col items-center gap-12 rounded-lg bg-brand/5 border border-gray-400 shadow-lg p-8">
        <h1 class="font-semibold text-brand text-lg">Create a New Room</h1>

        <form
          id="room_form"
          phx-change="validate"
          phx-submit="save"
          class="w-full flex flex-col gap-4"
        >
          <input
            class="rounded bg-brand/5"
            type="text"
            name="title"
            label="Title"
            placeholder="Title"
          />
          <input
            class="rounded bg-brand/5"
            type="text"
            name="slug"
            label="Slug"
            placeholder="Slug (5 letters is enough)"
          />

          <button
            type="submit"
            class="bg-brand text-white font-semibold py-2 px-4 rounded shadow group"
            phx-disable-with="Entering..."
          >
            Enter
            <.icon
              name="hero-arrow-right-mini"
              class="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>
      </div>
    </div>
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
