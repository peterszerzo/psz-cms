module Globe where

import Debug
import Html exposing (div, button, text, fromElement)
import Html.Events exposing (onClick)
import Effects exposing (Effects, none, Never)
import Graphics.Collage exposing (collage, move, filled, ngon)
import Graphics.Element exposing (..)
import Color exposing (rgba)

import Polygon


type alias Model = { coordinates: (List Polygon.Model) }


init =
  ({ coordinates = [] }, none)


type Action = SetCoordinates (List Polygon.Model) | NoOp

update: Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    NoOp -> (model, none)
    SetCoordinates coord -> ({ model | coordinates = coord }, none)

--
-- canvas: (List Polygon.Model) -> Html.Html
-- canvas coordinatesList =
--  let
--    shapes = List.map Polygon.view coordinatesList
--  in
--    fromElement (collage 300 300 shapes)

view address model =
  div []
    [ div [] [ text (toString (List.length model.coordinates)) ]
    -- , (canvas model.coordinates)
    ]
