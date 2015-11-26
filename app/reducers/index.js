import { combineReducers } from 'redux'

import uiReducer from './ui.js'
import testReducer from './test.js'
import entitiesReducer from './entities/index.js'

/*
 * Combine reducers from this directory.
 *
 */
export default combineReducers({
	ui: uiReducer,
	entities: entitiesReducer,
	test: testReducer
})