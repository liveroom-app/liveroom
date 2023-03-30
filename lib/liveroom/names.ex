defmodule Liveroom.Names do
  def generate do
    title = ~w(Sir Sr Prof Saint Ibn Lady Madam Mistress Herr Dr) |> Enum.random()

    name =
      [
        ~w(B C D F G H J K L M N P Q R S T V W X Z),
        ~w(o a i ij e ee u uu oo aj aa oe ou eu),
        ~w(b c d f g h k l m n p q r s t v w x z),
        ~w(o a i ij e ee u uu oo aj aa oe ou eu)
      ]
      |> Enum.map(fn l -> Enum.random(l) end)
      |> Enum.join()

    "#{title} #{name}"
  end
end
