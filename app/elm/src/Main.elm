import Effects exposing (Effects, none, Never)
import StartApp as StartApp
import Task

import Globe exposing (init, view, update, Action)
import Polygon


app =
  StartApp.start { 
      init = init
    , view = view
    , update = update
    , inputs = [ 
      Signal.map (\coordinates -> Globe.SetCoordinates coordinates) addCoordinates
    ]
  }

port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks

port addCoordinates : Signal (List Polygon.Model)

main =
  app.html