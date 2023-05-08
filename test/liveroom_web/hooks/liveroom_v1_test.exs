defmodule LiveroomWeb.Hooks.LiveroomV1Test do
  use ExUnit.Case, async: true

  alias LiveroomWeb.Hooks.LiveroomV1

  doctest LiveroomV1, import: true

  test inspect(&LiveroomV1.update_metas/3) do
    test_cases = [
      # empty
      %{
        metas: [],
        joins: %{},
        leaves: %{},
        result: []
      },
      # empty with 1 join
      %{
        metas: [],
        joins: %{
          "socket_1" => %{
            metas: [
              %{socket_id: "socket_1", phx_ref: "ref_1", name: "name_1"}
            ]
          }
        },
        leaves: %{},
        result: [
          %{socket_id: "socket_1", phx_ref: "ref_1", name: "name_1"}
        ]
      },
      # 1 existing joins again
      %{
        metas: [
          %{socket_id: "socket_1", phx_ref: "ref_1", name: "name_1"}
        ],
        joins: %{
          "socket_1" => %{
            metas: [
              %{socket_id: "socket_1", phx_ref: "ref_1", name: "name_1"}
            ]
          }
        },
        leaves: %{},
        result: [
          %{socket_id: "socket_1", phx_ref: "ref_1", name: "name_1"}
        ]
      },
      # 1 existing leaves
      %{
        metas: [
          %{socket_id: "socket_1", phx_ref: "ref_1", name: "name_1"}
        ],
        joins: %{},
        leaves: %{
          "socket_1" => %{
            metas: [
              %{socket_id: "socket_1", phx_ref: "ref_1", name: "name_1"}
            ]
          }
        },
        result: []
      },
      # multi joins & leaves
      %{
        metas: [
          %{socket_id: "socket_1", phx_ref: "ref_1", name: "name_1"},
          %{socket_id: "socket_2", phx_ref: "ref_2ter", name: "name_2"}
        ],
        joins: %{
          "socket_2" => %{
            metas: [
              %{socket_id: "socket_2", phx_ref: "ref_2", name: "name_2"},
              %{socket_id: "socket_2", phx_ref: "ref_2bis", name: "name_2"}
            ]
          }
        },
        leaves: %{
          "socket_2" => %{
            metas: [
              %{socket_id: "socket_2", phx_ref: "ref_2ter", name: "name_2"}
            ]
          },
          "socket_3" => %{
            metas: [
              %{socket_id: "socket_3", phx_ref: "ref_3", name: "name_3"}
            ]
          }
        },
        result: [
          %{socket_id: "socket_1", phx_ref: "ref_1", name: "name_1"},
          %{socket_id: "socket_2", phx_ref: "ref_2", name: "name_2"}
        ]
      }
    ]

    for test_case <- test_cases do
      assert %Phoenix.LiveView.Socket{
               assigns: %{
                 __changed__: %{_liveroom_v1_metas: true},
                 _liveroom_v1_metas: updated_metas
               }
             } =
               LiveroomV1.update_metas(
                 struct!(Phoenix.LiveView.Socket)
                 |> Phoenix.Component.assign(_liveroom_v1_metas: test_case.metas),
                 test_case.joins,
                 test_case.leaves
               )

      assert updated_metas == test_case.result
    end
  end
end
