import assert from 'assert'

import Base from './../base.js'

describe('base', () => {

	var base

	beforeEach(() => {
		base = Base.create({ id: 'testid', jsonValue: [ 1, 2, 3 ] })
	})

	describe('getUpdateUrl', () => {
		it('returns update url', () => {
			assert.equal(base.getUpdateUrl(), '/api/v2/testresources/testid')
		})
	})

	describe('getDeleteUrl', () => {
		it('returns update url', () => {
			assert.equal(base.getUpdateUrl(), '/api/v2/testresources/testid')
		})
	})

	describe('getValueAsString', () => {
		it('returns value as a string', () => {
			assert.equal(base.getValueAsString('jsonValue'), '[1,2,3]')
		})
	})

})