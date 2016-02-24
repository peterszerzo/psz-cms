import Effects exposing (Effects, none, Never)
import StartApp as StartApp
import Task

import Globe
import Polygon


app =
  StartApp.start {
      init = Globe.init
    , view = Globe.view
    , update = Globe.update
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
