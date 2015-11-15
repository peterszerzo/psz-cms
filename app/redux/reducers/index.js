export function reducer(state = {}, action) {

	if (action.type === 'SET_TEST_PROP') {
		state.testProp = true
	}

}