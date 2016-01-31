import Effects exposing (Effects, none, Never)
import StartApp as StartApp
import Task

import App.Elm.Globe exposing (init, view, update, Action)
import App.Elm.Polygon exposing (Model)


app =
  StartApp.start { 
      init = init
    , view = view
    , update = update
    , inputs = [ 
      Signal.map (\coordinates -> App.Elm.Globe.SetCoordinates coordinates) addCoordinates
    ]
  }

port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks

port addCoordinates : Signal (List App.Elm.Polygon.Model)

main =
  app.html