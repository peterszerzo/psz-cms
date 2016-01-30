module App.Elm.Globe where

import Html exposing (div, button, text, fromElement)
import Html.Events exposing (onClick)
import Effects exposing (Effects, none, Never)

import Graphics.Collage exposing (collage, move, filled, ngon)
import Graphics.Element exposing (..)

import Color exposing (rgba)

import App.Elm.Polygon exposing (Model)


init = 
  ({ count = 0, geoData = {} }, none)

canvas = 
  fromElement (
    collage 300 300
      [ ngon 4 75
          |> filled (rgba 0 0 0 0.2)
          |> move (-10,0)
      , ngon 5 50
          |> filled (rgba 0 0 0 0.2)
          |> move (50,10)
      ]
  )


view address model =
  div []
    [ button [ onClick address Decrement ] [ text "-" ]
    , div [] [ text (toString model.count) ]
    , button [ onClick address Increment ] [ text "+" ]
    , canvas
    ]

type alias Model = { count: Int, geoData: List }

type Action = Increment | Decrement | SetGeoData List

update: Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    Increment -> ({ model | count = model.count + 1 }, none)
    Decrement -> ({ model | count = model.count - 1 }, none)
    SetGeoData geoData -> ({ model | geoData = geoData }, none)