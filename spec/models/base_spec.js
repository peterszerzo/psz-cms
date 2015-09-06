import assert from 'assert';
import mocha from 'mocha';
import { Model, Collection } from './../../app/models/base.js'; 

describe('Collection', () => {

	describe('setUrl', () => {

		it('sets url', () => {
			var coll = new Collection();
			coll.baseUrl = '/api/v1/base';
			coll.setUrl({ 'a': 'b' });
			assert.equal(coll.url, '/api/v1/base?a=b&');
		});

	});

});