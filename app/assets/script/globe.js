var d3 = require('d3'),
    Eye = require('./eye.js'),
    geomUtil = require('./geometry_utilities.js');

/*
 * Globe animation module.
 * @returns {object} self - Module object with public API.
 */
module.exports = function(fileName) {

    var self = {
        timeStep: 0.02,
        width: 0,
        height: 0,
        svg: undefined,
        eye: undefined
    };

    self.start = function() {
        self.setup();
        d3.json('data/geo/' + fileName, self.draw);
    };

    self.stop = function() {
        return window.removeEventListener('resize', self.setDimensions);
    };

    self.setup = function() {
        self.svg = d3.select('.banner__globe').append('svg');
        self.setDimensions();
        self.eye = new Eye();
        window.addEventListener('resize', self.setDimensions);
    };

    self.tearDown = function() {
        if (self.animationIntervalId) {
            clearInterval(self.animationIntervalId);
        }
        window.removeEventListener('resize', self.setDimensions);
    };

    self.draw = function(error, data) {
        self.svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .on('click', function(feature) {
                window.location.assign('/things/random');
            });
        self.updateGeoPaths();
        self.animationIntervalId = setInterval(self.update, self.timeStep * 1000);
    };

    self.setDimensions = function() {
        self.width = window.outerWidth;
        self.height = window.outerHeight;
        if (self.svg) {
            self.svg.attr({
                width: window.outerWidth,
                height: window.outerHeight
            });
        }
    };

    /*
     * @returns {object} path
     */
    self.getPath = function() {
        var path, projection,
            minWH = Math.min(self.width, self.height);
        projection = d3.geo.orthographic().scale(self.width * 0.7).rotate([0, 0, 0]).translate([self.width / 2, self.height / 2 * 1.4]);
        projection.rotate([- self.eye.position[0], - self.eye.position[1]]);
        path = d3.geo.path().projection(projection);
        return path;
    };

    self.update = function() {
        self.eye.updateHarmonic(self.timeStep);
        self.updateGeoPaths();
    };

    self.getFeatureCentroid = function(feature) {
        var i, c, coord;
        // If centroid is already cached, return it.
        if (feature.geometry['_centroid_cache']) {
            return feature.geometry['_centroid_cache'];
        }
        c = [ 0, 0 ];
        coord = feature.geometry.coordinates;
        for (i = 0; i < 3; i += 1) { 
            c[0] += coordinates[0][i][0] / 3;
            c[1] += coordinates[0][i][1] / 3;
        }
        return c;
    };

    self.getFeatureOpacity = function(feature) {
        var centroid, centroidCheck, delta, deltaMax, distance, op;
        if (feature._isActive === true) { return 0.6; }
        centroid = self.getFeatureCentroid(feature);
        distance = geomUtil.getLongLatDistance(self.eye.position, centroid);
        delta = distance / 2;
        deltaMax = 0.4;
        if (delta > deltaMax) {
            return 0;
        }
        op = Math.pow((deltaMax - delta) / deltaMax, 3) * 0.7;
        return op;
    };

    self.updateGeoPaths = function() {
        var path = self.getPath();
        return self.svg.selectAll('path').attr({
            d: function(feature) { 
                return path(feature); 
            },
            'class': function(feature) {
                var cls = 'banner__geopath';
                return cls; 
            },
            opacity: self.getFeatureOpacity
        });
    };

    return self;

};