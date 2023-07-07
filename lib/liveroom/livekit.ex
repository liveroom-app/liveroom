defmodule Liveroom.LiveKit do
  def generate_token(room_id, user_id, user_name) do
    # See https://github.com/livekit/server-sdk-js/blob/main/src/AccessToken.ts#L47

    now_in_seconds = :os.system_time(:seconds)
    ttl_in_seconds = 3 * 3600

    claims = %{
      "iss" => api_key(),
      "exp" => now_in_seconds + ttl_in_seconds,
      "nbf" => now_in_seconds,
      "sub" => user_id,
      "jti" => user_id,
      "name" => user_name,
      # "metadata" => nil,
      # "sha256" => nil,
      "video" => %{
        # See https://github.com/livekit/server-sdk-js/blob/main/src/grants.ts#L8
        "roomCreate" => true,
        "roomJoin" => true,
        # "roomList" => true,
        # "roomRecord" => true,
        # "roomAdmin" => true,
        "room" => room_id
      }
    }

    signer = Joken.Signer.create("HS256", api_secret())
    {:ok, jwt, _claims} = Joken.encode_and_sign(claims, signer)

    jwt
  end

  ### Config

  def ws_url, do: config!()[:ws_url]
  def api_key, do: config!()[:api_key]
  def api_secret, do: config!()[:api_secret]

  def config!, do: Application.fetch_env!(:liveroom, :livekit)
end
