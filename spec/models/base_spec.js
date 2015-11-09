import assert from 'assert';
import mocha from 'mocha';
import { Model, Collection } from './../../app/models/base.js'; 

describe('Collection', () => {

	describe('toCamelizedJson', () => {

		it('camelizes json for model', () => {
			var model = new Model({ some_field: 1 });
			assert.deepEqual(model.toCamelizedJson(), { SomeField: 1 });
		});

		it('camelizes json for collection', () => {
			var model = new Collection([ { some_field: 1 }, { some_other_field: 2 } ]);
			assert.deepEqual(model.toCamelizedJson(), [ { SomeField: 1 }, { SomeOtherField: 2 } ]);
		});

	});

	describe('setUrl', () => {

		it('sets url', () => {
			var coll = new Collection();
			coll.setUrl({ 'a': 'b' });
			assert.equal(coll.url, '/api/v1/bases?a=b&');
		});

	});

	describe('resetToRandom', () => {

		it('sets url', () => {
			var coll = new Collection({ id: 1 }, { id: 2 }, { id: 3 });
			coll.resetToRandom();
			assert.equal(coll.models.length, 1);
		});

	});

	describe('parse', () => {

		it('underscorizes keys', () => {
			var coll = new Collection();
			assert.deepEqual(coll.parse({ SomeKey: 1 }), { some_key: 1 });
		});

	});

});