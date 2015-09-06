import assert from 'assert';
import mocha from 'mocha';
import geomUtil from './../../app/assets/script/geometry_utilities.js';

describe('geomUtil', () => {

	describe('sphericalToCartesian', () => {

		it('converts spherical to cartesian', () => {
			var coordinates = geomUtil.sphericalToCartesian(0, 0, 1);
			assert.deepEqual(coordinates, [ 1, 0, 0 ]);
		});

		it('converts spherical to cartesian', () => {
			var coordinates = geomUtil.sphericalToCartesian(0, 90, 1);
			assert.deepEqual(coordinates, [ 0, 0, 1 ]);
		});

	});

	describe('getDistance', () => {

		it('finds distance between two points', () => {
			var distance = geomUtil.getDistance([ 5, 0, 0 ], [ 0, 12, 0 ]);
			assert.deepEqual(distance, 13);
		});


	});

});