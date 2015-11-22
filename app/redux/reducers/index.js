import uiReducer from './ui.js'
import testReducer from './test.js'

import { combineReducers } from 'redux'

export default combineReducers({
	ui: uiReducer,
	test: testReducer
})