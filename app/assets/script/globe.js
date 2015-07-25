psz.globe = function(selector, fileName) {

    var timeStep = 0.02;

    var self = {
        selector: selector
    };

    self.start = function() {

        var $el, draw, eye, getDistance, getFeatureOpacity, getPath, height, long, lat, sphericalToCartesian, subtractAngles, svg, update, updateDimensions, updateEye, updateGeoPaths, width;

        $el = $(self.selector);
        width = $el.width();
        height = $el.height();
        svg = void 0;

        longScale = d3.scale.linear().domain([0, width]).range([-180, 180]);
        latScale = d3.scale.linear().domain([0, height]).range([90, -90]);

        var s = 4;

        eye = {
            position: [ 0, 0 ],
            velocity: [ 3 * s, 3 * s / 2 ],
            springConstant: [ s / 50, s / 100 ],
            updateByMouse: function(context) {
                var p;
                p = d3.mouse(context);
                this.long = -longScale(p[0]);
                return this.lat = -latScale(p[1]);
            },
            updateConstant: function(dLong, dLat) {
                this.long += dLong;
                return this.lat += dLat;
            },
            updateHarmonic: function() {
                this._updateHarmonicVelocity();
                this._updateHarmonicPosition();
            },
            _updateHarmonicVelocity: function() {
                this.velocity[0] -= this.position[0] * this.springConstant[0] * timeStep;
                this.velocity[1] -= this.position[1] * this.springConstant[1] * timeStep;
            },
            _updateHarmonicPosition: function() {
                this.position[0] += this.velocity[0] * timeStep;
                this.position[1] += this.velocity[1] * timeStep;
            }
        };

        updateDimensions = function() {
            width = $el.width();
            height = $el.height();
            return svg.attr({
                width: width,
                height: height
            });
        };

        updateEye = function() {
            return eye.updateHarmonic(0.2, 0.2);
        };

        getPath = function() {
            var path, projection;
            projection = d3.geo.orthographic().scale(width * 0.7).rotate([0, 0, 0]).translate([width / 2, height / 2 * 1.6]);
            projection.rotate([- eye.position[0], - eye.position[1]]);
            path = d3.geo.path().projection(projection);
            return path;
        };

        updateGeoPaths = function() {
            var path;
            path = getPath();
            return svg.selectAll('path').attr({
                d: function(feature) { 
                    var b = path.bounds(feature);
                    var length = Math.abs(b[0][0] - b[1][0]);
                    var height = Math.abs(b[0][1] - b[1][1]);
                    //console.log(length + height);
                    //if (length + height > 2500) { return ''; }
                    return path(feature); 
                },
                opacity: getFeatureOpacity
            });
        };

        update = function() {
            eye.updateHarmonic();
            updateGeoPaths();
        };

        draw = function(data) {
            svg = d3.select('.banner__globe').append('svg');
            updateDimensions();
            $(window).on('resize', updateDimensions);
            svg.selectAll('path')
                .data(data.features)
                .enter()
                .append('path')
                .attr({
                    "class": function(feature) { 
                        return 'geopath'; 
                    }
            });
            updateGeoPaths();
            return setInterval(update, timeStep * 1000);
        };

        $.get('data/geo/' + fileName, draw);

        subtractAngles = function(angle1, angle2) {
            if (angle1 < 90 && angle2 > 270) {
                return Math.abs(angle1 + 360 - angle2);
            }
            if (angle2 < 90 && angle1 > 270) {
                return Math.abs(angle2 + 360 - angle1);
            }
            return Math.abs(angle1 - angle2);
        };

        sphericalToCartesian = function(long, lat, r) {
            var degToRad;
            if (r == null) {
                r = 1;
            }
            degToRad = 1 / 57;
            return [Math.cos(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(lat * degToRad) * r];
        };

        getDistance = function(long1, lat1, long2, lat2) {
            var distance, pos1, pos2;
            pos1 = sphericalToCartesian(long1, lat1);
            pos2 = sphericalToCartesian(long2, lat2);
            distance = Math.pow(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2) + Math.pow(pos2[2] - pos1[2], 2), 0.5);
            return distance;
        };

        getFeatureCentroid = function(feature) {
            var i, c = [ 0, 0 ],
                coordinates = feature.geometry.coordinates;
            for (i = 0; i < 3; i += 1) { 
                c[0] += coordinates[0][i][0] / 3;
                c[1] += coordinates[0][i][1] / 3;
            }
            return c;
        };

        var maxOp = 0;

        return getFeatureOpacity = function(feature) {
            var centroid, centroidCheck, delta, deltaMax, distance, long1, lat1, op;
            centroid = getFeatureCentroid(feature);
            long1 = centroid[0];
            lat1 =  centroid[1];
            distance = getDistance(eye.position[0], eye.position[1], long1, lat1);
            delta = distance / 2;
            deltaMax = 0.6;
            if (delta > deltaMax) {
                return 0;
            }
            op = Math.pow((deltaMax - delta) / deltaMax, 4) * 0.5;
            return op;
        };

    };

    self.stop = function() {
        return $(window).off('resize, updateDimensions');
    };
    
    return self;

};