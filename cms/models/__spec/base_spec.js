import assert from 'assert'

import Base from './../base.js'

describe('base', () => {

	var base

	beforeEach(() => {
		base = Base.create({ id: 'testid', name: 'name', jsonValue: [ 1, 2, 3 ] })
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

	describe('getAttributeForFormField', () => {
		it('returns json value as a string', () => {
			assert.equal(base.getAttributeForFormField(base.fields[2]), '[1,2,3]')
		})
	})

	describe('getSqlUpdateCommand', () => {
		it('returns sql update command', () => {
			assert.equal(base.getSqlUpdateCommand(), "UPDATE testresources SET id='testid', name='name', jsonValue='[1,2,3]' WHERE id='testid';")
		})
	})

})