module App.Elm.Globe where

import Debug exposing (log)

import Html exposing (div, button, text, fromElement)
import Html.Events exposing (onClick)
import Effects exposing (Effects, none, Never)

import Graphics.Collage exposing (collage, move, filled, ngon)
import Graphics.Element exposing (..)

import Color exposing (rgba)

import App.Elm.Polygon exposing (Model)


init = 
  ({ coordinates = [] }, none)

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
    [ div [] [ text (toString (List.length model.coordinates)) ]
    , canvas
    ]

type alias Model = { coordinates: (List App.Elm.Polygon.Model) }

type Action = SetCoordinates (List App.Elm.Polygon.Model)

update: Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    SetCoordinates coordinates -> ({ model | coordinates = coordinates }, none)