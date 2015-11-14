function reducer(state = { testProp: null }, action) {

	if (action.type === 'SET_TEST_PROP') {
		state.testProp = true
	}

}

export default reducer