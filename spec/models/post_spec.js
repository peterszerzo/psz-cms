import assert from 'assert'
import mocha from 'mocha'

import { Model, Collection } from './../../app/models/post.js'

describe('post', () => {

	describe('model', () => {

		it('works', () => {
			assert.equal(new Model({ post_group: 'apples' }).get('post_group'), 'apples')
		})

	})

})