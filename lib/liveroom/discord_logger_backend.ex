defmodule Liveroom.DiscordLoggerBackend do
  @moduledoc """
  Custom Logger Backend to send log errors to a Discord channel.
  """

  @behaviour :gen_event

  alias Liveroom.Discord

  @impl true
  def init(_) do
    state = %{}
    {:ok, state}
  end

  @impl true
  def handle_call({:configure, _options}, state) do
    {:ok, :ok, state}
  end

  @impl true
  def handle_event({_level, group_leader, {Logger, _msg, _ts, _md}}, state)
      when node(group_leader) != node() do
    {:ok, state}
  end

  @impl true
  def handle_event({level, _group_leader, {Logger, msg, ts, md}}, state)
      when level in [:warn, :error] do
    Discord.send_log(level, msg,
      timestamp: parse_datetime_tuple!(ts),
      module: md[:module],
      function: md[:function],
      file: md[:file],
      line: md[:line]
    )

    {:ok, state}
  end

  @impl true
  def handle_event({_level, _group_leader, {Logger, _msg, _ts, _md}}, state) do
    {:ok, state}
  end

  @impl true
  def handle_event(:flush, state) do
    {:ok, state}
  end

  @impl true
  def handle_event(_, state) do
    {:ok, state}
  end

  ### Helpers

  @doc """
  Given datetime tuple is assumed in UTC.

  ## Examples

      iex> parse_datetime_tuple!({{2023, 1, 1}, {10, 5, 1, 30}})
      ~U[2023-01-01 10:05:01Z]
  """
  def parse_datetime_tuple!({{y, m, d}, {hh, mm, ss, _ms}} = _dt_tuple) do
    date = Date.from_erl!({y, m, d})
    time = Time.from_erl!({hh, mm, ss})
    DateTime.new!(date, time, "Etc/UTC")
  end
end
