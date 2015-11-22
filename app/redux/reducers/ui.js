export default function uiReducer(state = { windowHeight: 100, scrollTop: 0 }, action) {

	var { type, value } = action

	if (type === 'SET_WINDOW_DIMENSIONS') {
		state = Object.assign({}, state, { windowHeight: value.height, windowWidth: value.width })
	} else if (type === 'SET_SCROLL_TOP') {
		state = Object.assign({}, state, { scrollTop: value }) 
	}

	return state

}