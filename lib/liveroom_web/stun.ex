defmodule LiveroomWeb.Stun do
  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, [])
  end

  @impl true
  def init(_) do
    {:ok, socket} = :gen_udp.open(0, [:binary, :inet])
    {:ok, _} = :stun_listener.add_listener({127, 0, 0, 1}, 3478, :udp, [socket])

    {:ok, []}
  end
end
