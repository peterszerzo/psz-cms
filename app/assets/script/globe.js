var d3 = require('d3'),
    Eye = require('./eye.js');

/*
 * Globe animation module.
 * @returns {object} self - Module object with public API.
 */
module.exports = function(selector, fileName) {

    var timeStep = 0.02;

    var self = {
        selector: selector
    };

    self.start = function() {

        var draw, eye, height, long, lat, svg, width;

        var latScale, longScale;

        width = window.innerWidth;
        height = window.innerHeight;
        svg = void 0;

        longScale = d3.scale.linear().domain([0, width]).range([-180, 180]);
        latScale = d3.scale.linear().domain([0, height]).range([90, -90]);

        eye = new Eye();

        var updateDimensions = function() {
            width = window.innerWidth;
            height = window.innerHeight;
            return svg.attr({
                width: width,
                height: height
            });
        };

        /*
         * @returns {object} path
         */
        var getPath = function() {
            var path, projection;
            projection = d3.geo.orthographic().scale(width * 0.7).rotate([0, 0, 0]).translate([width / 2, height / 2 * 1.6]);
            projection.rotate([- eye.position[0], - eye.position[1]]);
            path = d3.geo.path().projection(projection);
            return path;
        };

        var updateGeoPaths = function() {
            var path;
            path = getPath();
            return svg.selectAll('path').attr({
                d: function(feature) { 
                    return path(feature); 
                },
                'class': function(feature) {
                    var cls = 'banner__geopath';
                    return cls; 
                },
                opacity: getFeatureOpacity
            });
        };

        var update = function() {
            eye.updateHarmonic(timeStep);
            updateGeoPaths();
        };

        var draw = function(data) {
            svg = d3.select('.banner__globe').append('svg');
            updateDimensions();
            window.addEventListener('resize', updateDimensions);
            svg.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .on('click', function(feature) {
                    window.location.assign('/things/random');
                });
            updateGeoPaths();
            return setInterval(update, timeStep * 1000);
        };

        $.get('data/geo/' + fileName, draw);

        var subtractAngles = function(angle1, angle2) {
            if (angle1 < 90 && angle2 > 270) {
                return Math.abs(angle1 + 360 - angle2);
            }
            if (angle2 < 90 && angle1 > 270) {
                return Math.abs(angle2 + 360 - angle1);
            }
            return Math.abs(angle1 - angle2);
        };

        var sphericalToCartesian = function(long, lat, r) {
            var degToRad;
            if (r == null) {
                r = 1;
            }
            degToRad = 1 / 57;
            return [Math.cos(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(lat * degToRad) * r];
        };

        var getDistance = function(long1, lat1, long2, lat2) {
            var distance, pos1, pos2;
            pos1 = sphericalToCartesian(long1, lat1);
            pos2 = sphericalToCartesian(long2, lat2);
            distance = Math.pow(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2) + Math.pow(pos2[2] - pos1[2], 2), 0.5);
            return distance;
        };

        var getFeatureCentroid = function(feature) {
            var i, c = [ 0, 0 ],
                coordinates = feature.geometry.coordinates;
            for (i = 0; i < 3; i += 1) { 
                c[0] += coordinates[0][i][0] / 3;
                c[1] += coordinates[0][i][1] / 3;
            }
            return c;
        };

        var maxOp = 0;

        var getFeatureOpacity = function(feature) {
            var centroid, centroidCheck, delta, deltaMax, distance, long1, lat1, op;
            if (feature._isActive === true) { return 0.6; }
            centroid = getFeatureCentroid(feature);
            long1 = centroid[0];
            lat1 =  centroid[1];
            distance = getDistance(eye.position[0], eye.position[1], long1, lat1);
            delta = distance / 2;
            deltaMax = 0.4;
            if (delta > deltaMax) {
                return 0;
            }
            op = Math.pow((deltaMax - delta) / deltaMax, 4) * 0.7;
            return op;
        };

    };

    self.stop = function() {
        return window.removeEventListener('resize', updateDimensions);
    };
    
    return self;

};