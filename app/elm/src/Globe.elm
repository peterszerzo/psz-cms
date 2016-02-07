module Globe where

import Debug exposing (log)
import Html exposing (div, button, text, fromElement)
import Html.Events exposing (onClick)
import Effects exposing (Effects, none, Never)
import Graphics.Collage exposing (collage, move, filled, ngon)
import Graphics.Element exposing (..)
import Color exposing (rgba)

import Polygon exposing (..)


type alias Model = { coordinates: (List Polygon.Model) }


init = 
  ({ coordinates = [] }, none)


type Action = SetCoordinates (List Polygon.Model)

update: Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    SetCoordinates coordinates -> ({ model | coordinates = coordinates }, none)


getPolygonView = 
  \coordinates -> (Polygon.view coordinates)

canvas coordinatesList = 
  fromElement (
    collage 300 300 
      (List.map getPolygonView coordinatesList)
  )

view address model =
  div []
    [ div [] [ text (toString (List.length model.coordinates)) ]
    , canvas model.coordinates
    ]