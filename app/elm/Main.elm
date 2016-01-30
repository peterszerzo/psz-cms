import Debug exposing (log)

import Effects exposing (Effects, none, Never)

import StartApp as StartApp

import Task

import App.Elm.Globe exposing (init, view, update, Action)


app =
  StartApp.start { 
      init = init
    , view = view
    , update = update
    , inputs = [ 
      Signal.map (\geoData -> App.Elm.Globe.SetGeoData geoData) addGeoData
    ]
  }

port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks

port addGeoData : Signal List

main =
  app.html