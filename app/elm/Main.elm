import Debug exposing (log)

import Effects exposing (Effects, none, Never)

import StartApp as StartApp

import Task

import App.Elm.Counter exposing (init, view, update, Action)


app =
  StartApp.start { 
      init = init
    , view = view
    , update = update
    , inputs = [ 
      Signal.map (\message -> App.Elm.Counter.TestMessage message) test
    ]
  }

port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks

port test : Signal String

main =
  app.html