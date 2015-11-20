export default function reducer(state = {}, action) {

	if (action.type === 'SET_TEST_PROP') {
		state.testProp = 'just set test prop'
	} else {
		state.testProp = 'default test prop'
	}

	return state

}