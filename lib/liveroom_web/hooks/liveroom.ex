defmodule LiveroomWeb.Hooks.Liveroom do
  import Phoenix.LiveView
  import Phoenix.Component

  alias LiveroomWeb.Presence

  @cursorview "cursorview"

  ### API

  def broadcast_user_changes(socket, attrs) when is_map(attrs) do
    broadcast_user_changes(socket, fn _ -> attrs end)
  end

  def broadcast_user_changes(socket, attrs) when is_function(attrs, 1) do
    Presence.update(self(), @cursorview, socket.id, &Map.merge(&1, attrs.(&1)))
  end

  def list_users do
    @cursorview
    |> Presence.list()
    |> Enum.map(fn {_socket_id, presence} -> presence[:metas] end)
    |> List.flatten()
  end

  ### Hooks

  def on_mount(:default, _params, _session, socket) do
    {:cont,
     socket
     |> assign_initial_state()
     |> attach_hook(
       :liveroom_event,
       :handle_event,
       fn
         "liveroom-cursor-moved", %{"x" => x, "y" => y} = _params, socket ->
           broadcast_user_changes(socket, %{x: x, y: y})
           {:halt, socket}

         "liveroom-cursor-click-down", _params, socket ->
           broadcast_user_changes(socket, %{is_cursor_pressed: true})
           {:halt, socket}

         "liveroom-cursor-click-up", _params, socket ->
           broadcast_user_changes(socket, %{is_cursor_pressed: false})
           {:halt, socket}

         "liveroom-element-hovered", %{"id" => id} = _params, socket ->
           broadcast_user_changes(
             socket,
             &%{hovered_elements: MapSet.put(&1.hovered_elements, id)}
           )

           {:halt, socket}

         "liveroom-element-not-hovered", %{"id" => id} = _params, socket ->
           broadcast_user_changes(
             socket,
             &%{hovered_elements: MapSet.delete(&1.hovered_elements, id)}
           )

           {:halt, socket}

         "liveroom-element-focused", %{"id" => id} = _params, socket ->
           broadcast_user_changes(
             socket,
             &%{focused_elements: MapSet.put(&1.focused_elements, id)}
           )

           {:halt, socket}

         "liveroom-element-not-focused", %{"id" => id} = _params, socket ->
           broadcast_user_changes(
             socket,
             &%{focused_elements: MapSet.delete(&1.focused_elements, id)}
           )

           {:halt, socket}

         "liveroom-halo-key-down", _params, socket ->
           broadcast_user_changes(socket, %{is_halo_key_pressed: true})
           {:halt, socket}

         "liveroom-halo-key-up", _params, socket ->
           broadcast_user_changes(socket, %{is_halo_key_pressed: false})
           {:halt, socket}

         _event, _params, socket ->
           {:cont, socket}
       end
     )
     |> attach_hook(:liveroom_presence_diff, :handle_info, fn
       %{event: "presence_diff", payload: _payload}, socket ->
         {:halt, refresh_users(socket)}

       _msg, socket ->
         {:cont, socket}
     end)}
  end

  ### Helpers

  defp assign_initial_state(socket) do
    socket_id = socket.id
    name = Liveroom.Names.generate()
    color = Liveroom.Colors.get_random_color()

    initial_users =
      if connected?(socket) do
        Presence.track(self(), @cursorview, socket_id, %{
          socket_id: socket_id,
          name: name,
          color: color,
          # camera_on: false,
          msg: "",
          x: 50,
          y: 50,
          is_cursor_pressed: false,
          is_halo_key_pressed: false,
          hovered_elements: MapSet.new(),
          focused_elements: MapSet.new(),
          inputs: %{}
        })

        LiveroomWeb.Endpoint.subscribe(@cursorview)

        list_users()
      else
        []
      end

    assign(socket, :liveroom, %{
      socket_id: socket_id,
      users: initial_users,
      name: name,
      color: color,
      msg: ""
      # current_msg: "",
      # camera_on: false
    })
  end

  defp refresh_users(socket) do
    update(socket, :liveroom, &Map.put(&1, :users, list_users()))
  end
end
