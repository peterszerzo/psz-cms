/*
 *
 *
 */
export default function postEntitiesReducer(state = {}, action) {

	var { type, data } = action

	switch(type) {

		case 'FETCH_ALL_POST_SUMMARIES_SUCCESS':
			let summaries = {}
			summaries.status = 'success'
			summaries.data = data
			return Object.assign({}, state, { summaries: summaries })

		case 'FETCH_SINGLE_POST_SUCCESS':
			let singleEntity = {}
			singleEntity.status = 'success'
			singleEntity.data = data
			// Use this change object to create a new version of state.byId without mutating.
			let change = {}
			change[data.id] = singleEntity
			let byId = Object.assign({}, state.byId, change)
			return Object.assign({}, state, { byId: byId })

		default:
			return state

	}

}