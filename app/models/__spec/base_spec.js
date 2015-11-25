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

	describe('getAttributeForFormField', () => {
		it('returns json value as a string', () => {
			assert.equal(base.getAttributeForFormField('jsonValue'), '[1,2,3]')
		})
	})

	describe('getSqlUpdateCommand', () => {
		var model = Base.create({ id: 'id', name: 'name' })
		it('returns sql update command', () => {
			assert.equal(model.getSqlUpdateCommand(), "UPDATE testresources SET (id='id',name='name') WHERE (id='id');")
		})
	})

})