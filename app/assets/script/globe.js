var d3 = require('d3'),
    Eye = require('./eye.js'),
    geomUtil = require('./geometry_utilities.js');

/*
 * Globe animation module.
 * @returns {object} self - Module object with public API.
 */
module.exports = function(selector, fileName) {

    var self = {
        selector: selector,
        timeStep: 0.02,
        width: 0,
        height: 0,
        svg: undefined,
        eye: undefined
    };

    self.setDimensions = function() {
        self.width = window.innerWidth;
        self.height = window.innerHeight;
        if (self.svg) {
            self.svg.attr({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    };

    self.setup = function() {
        self.svg = d3.select('.banner__globe').append('svg');
        self.setDimensions();
        self.eye = new Eye();
        window.addEventListener('resize', self.setDimensions);
    };

    /*
     * @returns {object} path
     */
    self.getPath = function() {
        var path, projection;
        projection = d3.geo.orthographic().scale(self.width * 0.7).rotate([0, 0, 0]).translate([self.width / 2, self.height / 2 * 1.6]);
        projection.rotate([- self.eye.position[0], - self.eye.position[1]]);
        path = d3.geo.path().projection(projection);
        return path;
    };

    self.start = function() {

        var draw, long, lat;

        var update = function() {
            self.eye.updateHarmonic(self.timeStep);
            updateGeoPaths();
        };

        var updateGeoPaths = function() {
            var path;
            path = self.getPath();
            return self.svg.selectAll('path').attr({
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

        var draw = function(error, data) {
            self.setup();
            self.svg.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .on('click', function(feature) {
                    window.location.assign('/things/random');
                });
            updateGeoPaths();
            return setInterval(update, self.timeStep * 1000);
        };

        d3.json('data/geo/' + fileName, draw);

        var getFeatureCentroid = function(feature) {
            var i, c = [ 0, 0 ],
                coordinates = feature.geometry.coordinates;
            for (i = 0; i < 3; i += 1) { 
                c[0] += coordinates[0][i][0] / 3;
                c[1] += coordinates[0][i][1] / 3;
            }
            return c;
        };

        var getFeatureOpacity = function(feature) {
            var centroid, centroidCheck, delta, deltaMax, distance, long1, lat1, op;
            if (feature._isActive === true) { return 0.6; }
            centroid = getFeatureCentroid(feature);
            long1 = centroid[0];
            lat1 =  centroid[1];
            distance = geomUtil.getDistance(self.eye.position[0], self.eye.position[1], long1, lat1);
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
        return window.removeEventListener('resize', self.setDimensions);
    };
    
    return self;

};