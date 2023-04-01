# defmodule LiveroomWeb.Stun do
#   use GenServer

#   def start_link(_) do
#     GenServer.start_link(__MODULE__, [])
#   end

#   @impl true
#   def init(_) do
#     :stun_listener.add_listener(3478, :udp, [])
#     {:ok, []}
#   end
# end
