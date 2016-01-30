module App.Elm.Counter where

import Debug exposing (log)

import Html exposing (div, button, text)
import Html.Events exposing (onClick)
import Effects exposing (Effects, none, Never)


init = 
  ({ count = 0, message = "Counter" }, none)


view address model =
  div []
    [ button [ onClick address Decrement ] [ text "-" ]
    , div [] [ text (toString model.count) ]
    , div [] [ text model.message ]
    , button [ onClick address Increment ] [ text "+" ]
    ]

type alias Model = { count: Int, message: String }

type Action = Increment | Decrement | TestMessage String

update: Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    Increment -> ({ model | count = model.count + 1 }, none)
    Decrement -> ({ model | count = model.count - 1 }, none)
    TestMessage message -> ({ model | message = message }, none)