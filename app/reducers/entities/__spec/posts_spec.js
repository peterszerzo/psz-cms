import 'babel-polyfill'

import assert from 'assert'

import postEntitiesReducer from './../posts.js'

describe('postEntitiesReducer', () => {

	it('adds new post summaries on successful fetch', () => {
		var action = {
			type: 'FETCH_ALL_POST_SUMMARIES_SUCCESS',
			value: [ { id: '1', name: '1' }, { id: '1', name: '1' } ]
		}
		assert.deepEqual(postEntitiesReducer({}, action), {
			summaries: {
				status: 'success',
				data: [ { id: '1', name: '1' }, { id: '1', name: '1' } ]
			}
		})
	})

})