import { createStore } from 'redux'
import reducer from './../reducers/index.js'

var store = createStore(reducer, {})

export default store