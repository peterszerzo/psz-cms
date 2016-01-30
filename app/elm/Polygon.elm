module App.Elm.Polygon where

import Html exposing (div)

type alias Model = List (List Float)

init : List (List Float) -> Model
init coordinates =
  coordinates


view address model =
  div []