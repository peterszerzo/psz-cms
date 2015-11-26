import d3 from 'd3';
import { Events } from 'backbone';
import _ from 'underscore';

import Eye from './eye.js';
import geomUtil from './geometry_utilities.js';

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

    // Mix in events module.
    _.extend(self, Events);

    /*
     *
     *
     */
    self.start = function() {
        self.setup();
        d3.json('data/geo/' + fileName, self.draw);
    };


    /*
     *
     *
     */
    self.stop = function() {
        self.tearDown();
        self.removeElements();
    };


    /*
     *
     *
     */
    self.setup = function() {
        self.svg = d3.select('.banner__globe svg');
        self.eye = new Eye();
        window.addEventListener('resize', self.setDimensions);
    };


    /*
     *
     *
     */
    self.tearDown = function() {
        if (self.animationIntervalId) {
            clearInterval(self.animationIntervalId);
        }
        window.removeEventListener('resize', self.setDimensions);
    };


    /*
     *
     *
     */
    self.removeElements = function() {
        self.svg.selectAll('path').remove();
        self.svg.remove();
    };


    /*
     *
     *
     */
    self.onFeatureClick = function(feature) {
        if (self.onClick) {
            self.onClick();
        }
    };


    /*
     *
     *
     */
    self.onFeatureMouseEnter = function(feature) {
        feature._isActive = true;
        if (self.onHover) {
            self.onHover();
        }
    };


    /*
     *
     *
     */
    self.onFeatureMouseLeave = function(feature) {
        feature._isActive = false;
    };


    /*
     *
     *
     */
    self.draw = function(error, data) {
        self.svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .on('mouseenter', self.onFeatureMouseEnter.bind(self))
            .on('mouseleave', self.onFeatureMouseLeave.bind(self))
            .on('click', self.onFeatureClick);
        self.updateGeoPaths();
        self.trigger('rendered');
        self.animationIntervalId = setInterval(self.update, self.timeStep * 1000);
    };


    /*
     *
     *
     */
    self.setDimensions = function() {
        var minW = 800, minH = 600,
            w = Math.max(minW, self.props.ui.windowWidth),
            h = Math.max(minH, self.props.ui.windowHeight);
        self.width = w;
        self.height = h;
        if (self.svg) {
            self.svg.attr({
                width: w,
                height: h
            });
        }
    };


    /*
     * @returns {object} path
     */
    self.getPath = function() {
        var path, projection,
            minWH = Math.min(self.width, self.height),
            avgWH = (self.width + self.height) / 2;

        projection = d3.geo.orthographic()
            .scale(avgWH * 0.8)
            .rotate([- self.eye.position[0], - self.eye.position[1]])
            .translate([ window.innerWidth / 2, window.innerHeight / 2 ]);

        path = d3.geo.path().projection(projection);
        return path;
    };


    /*
     *
     *
     */
    self.update = function() {
        self.eye.updateHarmonic(self.timeStep);
        self.updateGeoPaths();
    };


    /*
     *
     *
     */
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


    /*
     *
     *
     */
    self.getFeatureOpacity = function(feature) {

        var centroid, centroidCheck, delta, deltaMax, distance, op;

        if (feature._isActive) { return 1; }

        centroid = self.getFeatureCentroid(feature);

        var position = self.eye.position;

        distance = geomUtil.getLongLatDistance(position, centroid);

        delta = distance / 2;
        deltaMax = 0.4;
        
        if (delta > deltaMax) {
            return 0;
        }

        op = Math.pow((deltaMax - delta) / deltaMax, 4) * 1;

        op = op.toFixed(2);

        return op; 

    };


    /*
     *
     *
     */
    self.updateGeoPaths = function() {
        var path = self.getPath();
        return self.svg.selectAll('path')
            .attr({
                'd': function(feature) { return path(feature); },
                'class': function(feature) { return 'banner__geopath'; }
            })
            .style('opacity', self.getFeatureOpacity);
    };

    return self;

};