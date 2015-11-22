export default function testReducer(state = 'not set', action) {

	var { type } = action

	if (type === 'SET_TEST_PROP') {
		state = 'set'
	} else {
		state = 'not set'
	}

	return state

}