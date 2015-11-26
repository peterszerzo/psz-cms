/*
 * Sets window dimensions and scrolltop.
 *
 */
export default function uiReducer(state = { windowHeight: 100, scrollTop: 0 }, action) {

	var { type, data } = action

	switch (type) {

		case 'SET_WINDOW_DIMENSIONS':
			return Object.assign({}, state, { windowHeight: data.height, windowWidth: data.width })

		case 'SET_SCROLL_TOP':
			return Object.assign({}, state, { scrollTop: data })

		default:
			return state

	}

}