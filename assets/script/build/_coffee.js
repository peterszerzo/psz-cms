(function() {
  this.psz = {};

  angular.module('psz', []).controller('projects', function($scope, $http) {
    return $http.get('assets/data/projects.json').success(function(projects) {
      return $scope.projects = projects;
    });
  });

}).call(this);

(function() {
  this.psz.globe = function() {
    var self;
    self = {};
    self.start = function() {
      var $el, draw, eye, getDistance, getFeatureOpacity, getPath, height, lambda, phi, sphericalToCartesian, subtractAngles, svg, update, updateDimensions, updateEye, updateGeoPaths, width;
      $el = $('.header__globe');
      width = $el.width();
      height = $el.height();
      svg = void 0;
      lambda = d3.scale.linear().domain([0, width]).range([-180, 180]);
      phi = d3.scale.linear().domain([0, height]).range([90, -90]);
      eye = {
        lambda0: 0,
        phi0: 0,
        updateByMouse: function(context) {
          var p;
          p = d3.mouse(context);
          this.lambda0 = -lambda(p[0]);
          return this.phi0 = -phi(p[1]);
        },
        update: function(dLambda, dPhi) {
          this.lambda0 += dLambda;
          return this.phi0 += dPhi;
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
        return eye.update(0.2, 0.2);
      };
      getPath = function() {
        var path, projection;
        projection = d3.geo.orthographic().scale(width * 0.7).rotate([0, 0, 0]).translate([width / 2, height / 2 * 1.6]);
        projection.rotate([-eye.lambda0, -eye.phi0]);
        path = d3.geo.path().projection(projection);
        return path;
      };
      updateGeoPaths = function() {
        var path;
        path = getPath();
        return svg.selectAll('path').attr({
          d: path,
          opacity: getFeatureOpacity
        });
      };
      update = function() {
        updateEye();
        return updateGeoPaths();
      };
      draw = function(data) {
        svg = d3.select('.header__globe').append('svg');
        updateDimensions();
        $(window).on('resize', updateDimensions);
        svg.selectAll('path').data(data.features).enter().append('path').attr({
          "class": 'geopath'
        });
        updateGeoPaths();
        return setInterval(update, 50);
      };
      $.get('assets/data/geo/countries.geo.json', draw);
      subtractAngles = function(angle1, angle2) {
        if (angle1 < 90 && angle2 > 270) {
          return Math.abs(angle1 + 360 - angle2);
        }
        if (angle2 < 90 && angle1 > 270) {
          return Math.abs(angle2 + 360 - angle1);
        }
        return Math.abs(angle1 - angle2);
      };
      sphericalToCartesian = function(lambda, phi, r) {
        var degToRad;
        if (r == null) {
          r = 1;
        }
        degToRad = 1 / 57;
        return [Math.cos(lambda * degToRad) * Math.cos(phi * degToRad) * r, Math.sin(lambda * degToRad) * Math.cos(phi * degToRad) * r, Math.sin(phi * degToRad) * r];
      };
      getDistance = function(lambda1, phi1, lambda2, phi2) {
        var distance, pos1, pos2;
        pos1 = sphericalToCartesian(lambda1, phi1);
        pos2 = sphericalToCartesian(lambda2, phi2);
        distance = Math.pow(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2) + Math.pow(pos2[2] - pos1[2], 2), 0.5);
        return distance;
      };
      return getFeatureOpacity = function(feature) {
        var centroid, delta, deltaMax, distance, lambda1, phi1;
        centroid = d3.geo.centroid(feature);
        lambda1 = centroid[0];
        phi1 = centroid[1];
        distance = getDistance(eye.lambda0, eye.phi0, lambda1, phi1);
        delta = distance / 2;
        deltaMax = 0.3;
        if (delta > deltaMax) {
          return 0;
        }
        return Math.pow((deltaMax - delta) / deltaMax, 1) * 0.4;
      };
    };
    self.stop = function() {
      return $(window).off('resize, updateDimensions');
    };
    return self;
  };

}).call(this);
