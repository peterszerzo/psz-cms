var $ = require('jquery');

module.exports = function(selector) {

	var self = {};

	self.generate = function() {

		var geoJson = { 
			type: "FeatureCollection",
			features: []
		};

		var removeEmptyStrings = function(array) {
			var i, max, newArray = [];
			for(i = 0, max = array.length; i < max; i += 1) {
				if (array[i] !== "") { newArray.push(array[i]); }
			}
			return newArray;
		};

		/* 
		 * Convert 20,10 to [10, 20].
		 * @param {string}
		 * @param {array} displacement - Optional displacement vector, defaults to [ 0, 0 ].
		 * @param {number} scale - Scale factor.
		 * @returns {array} point - Point array.
		 */
		var convertToPoint = function(string, displacement, scale) {
			var pt = string.split(',');
			displacement = displacement || [0, 0];
			pt[0] = parseInt(pt[0] * 100000, 10) / 100000;
			pt[1] = parseInt(pt[1] * 100000, 10) / 100000;
			return [ 
				(pt[0] + displacement[0]) * scale, 
				(pt[1] + displacement[1]) * scale 
			];
		};

		var isClockwiseTriangle = function(coordinates) {
			var pt1 = coordinates[0],
				pt2 = coordinates[1],
				pt3 = coordinates[2];

			// return difference between dot products
			var prod = (pt2[0] - pt1[0]) * (pt2[1] - pt1[1]) + (pt3[0] - pt2[0]) * (pt3[1] - pt2[1]);
			return (prod > 0);
		};

		$(selector + ' polygon').each(function() {

			var feature = {
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [ ]
					}
				},
				coords = [], repl,
				pointsAttr = $(this).attr('points'),
				point, startPoint,
				pointStrings, pointString,
				i, max, clean = [];

			pointStrings = removeEmptyStrings(pointsAttr.split(/\s\n*/));

			for(i = 0, max = pointStrings.length; i < max; i += 1) {
				pointString = pointStrings[i];
				point = convertToPoint(pointString, [ -180, -90 ], 0.5);
				if (i === 0) { startPoint = point; }
				coords.push(point);
			}

			coords.push(startPoint);

			// Replace second and third points if triangle is counterclockwise.

			var repl;

			if(isClockwiseTriangle(coords)) {
				repl = coords[1];
				coords[1] = coords[2];
				coords[2] = repl;
			}

			feature.geometry.coordinates[0] = coords;
			geoJson.features.push(feature);

		});

		// console.log(geoJson);

		$.ajax({
			url: '/dev/save', 
			data: { geo: JSON.stringify(geoJson) },
			type: 'post'
		});

	};

	return self;

};