psz.geoJsonGenerator = function(selector) {

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
		 * @param {array} Optional displacement vector, defaults to [ 0, 0 ].
		 */
		var convertToPoint = function(string, displacement) {
			var pt = string.split(',');
			displacement = displacement || [0, 0];
			pt[0] = parseFloat(pt[0]);
			pt[1] = parseFloat(pt[1]);
			return [ pt[0] + displacement[0], pt[1] + displacement[1] ];
		};

		$(selector + ' polygon').each(function() {

			var feature = {
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [ [] ]
					}
				},
				pointsAttr = $(this).attr('points'),
				point, startPoint,
				pointStrings, pointString,
				i, max, clean = [];

			pointStrings = removeEmptyStrings(pointsAttr.split(/\s\n*/));

			for(i = 0, max = pointStrings.length; i < max; i += 1) {
				pointString = pointStrings[i];
				point = convertToPoint(pointString, [ -180, -90 ]);
				if (i === 0) { startPoint = point; }
				feature.geometry.coordinates[0].push(point);
			}

			feature.geometry.coordinates[0].push(startPoint);
			geoJson.features.push(feature);

		});

		console.log(geoJson);

		$.ajax({
			url: '/save', 
			data: { geo: JSON.stringify(geoJson) },
			type: 'post'
		});

	};

	return self;

};