function fetch(state, action) {
	switch (action.type) {
		case 'FETCH_POSTS':
			if (action.status === success) {
				return Object.assign({}, state, { posts: action.response })
			}
			break
		case 'FETCH_POST':
			if (action.status === success) {
				return Object.assign({}, state, { post: action.response[0] })
			}
			break
		default:
			return state
	}
}

export default fetch