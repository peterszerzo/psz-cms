import { combineReducers } from 'redux'

import postEntitiesReducer from './posts.js'
import geoEntitiesReducer from './geo.js'

/*
 *
 *
 */
export default combineReducers({
	posts: postEntitiesReducer,
	geo: geoEntitiesReducer
})