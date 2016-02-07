module Polygon where

import Html exposing (div)

import Graphics.Collage exposing (collage, move, filled, ngon, polygon)
import Graphics.Element exposing (..)

import Color exposing (rgba)

type alias Model = List (List Float)

view model =
  polygon [ (model[0][0], model[0][1]), (model[1][0], model[1][1]), (model[2][0], model[2][1]) ]
      |> filled (rgba 0 0 0 0.2)
      |> move (-10,0)