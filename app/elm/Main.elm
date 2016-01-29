import Color exposing (..)
import Graphics.Collage exposing (..)
import Graphics.Element exposing (..)


main : Element
main =
  collage 300 300
    [ ngon 3 75
        |> filled clearGrey
        |> move (-10,0)
    ]


clearGrey : Color
clearGrey =
  rgba 111 111 111 0.6