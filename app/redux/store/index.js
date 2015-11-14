import { createStore } from 'redux'
import reducer from './../reducers/index.js'

console.log(reducer)

var store = createStore(reducer, {})

export default store