(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Eye = (function () {
    function Eye() {
        _classCallCheck(this, Eye);

        var periodModifier = 2,
            amplitudeModifier = 2;

        this.position = [0, 0];
        this.velocity = [amplitudeModifier * periodModifier, amplitudeModifier * periodModifier / 2];
        this.springConstant = [periodModifier / 35, periodModifier / 70];
    }

    _createClass(Eye, [{
        key: "updateConstant",
        value: function updateConstant(vector) {
            this.position[0] += vector[0];
            this.position[1] += vector[1];
        }
    }, {
        key: "updateHarmonic",
        value: function updateHarmonic(timeStep) {
            this._updateHarmonicVelocity(timeStep);
            this._updateHarmonicPosition(timeStep);
        }
    }, {
        key: "_updateHarmonicVelocity",
        value: function _updateHarmonicVelocity(timeStep) {
            this.velocity[0] -= this.position[0] * this.springConstant[0] * timeStep;
            this.velocity[1] -= this.position[1] * this.springConstant[1] * timeStep;
        }
    }, {
        key: "_updateHarmonicPosition",
        value: function _updateHarmonicPosition(timeStep) {
            this.position[0] += this.velocity[0] * timeStep;
            this.position[1] += this.velocity[1] * timeStep;
        }
    }]);

    return Eye;
})();

module.exports = Eye;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var geomUtil = {

    subtractAngles: function subtractAngles(angle1, angle2) {
        if (angle1 < 90 && angle2 > 270) {
            return Math.abs(angle1 + 360 - angle2);
        }
        if (angle2 < 90 && angle1 > 270) {
            return Math.abs(angle2 + 360 - angle1);
        }
        return Math.abs(angle1 - angle2);
    },

    sphericalToCartesian: function sphericalToCartesian(long, lat) {
        var r = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

        var degToRad = Math.PI / 180;
        return [Math.cos(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(long * degToRad) * Math.cos(lat * degToRad) * r, Math.sin(lat * degToRad) * r];
    },

    getLongLatDistance: function getLongLatDistance(longLat1, longLat2) {
        var distance, pos1, pos2;
        pos1 = geomUtil.sphericalToCartesian(longLat1[0], longLat1[1]);
        pos2 = geomUtil.sphericalToCartesian(longLat2[0], longLat2[1]);
        distance = geomUtil.getDistance(pos1, pos2);
        return distance;
    },

    getDistance: function getDistance(pos1, pos2) {
        return Math.pow(Math.pow(pos2[0] - pos1[0], 2) + Math.pow(pos2[1] - pos1[1], 2) + Math.pow((pos2[2] || 0) - (pos1[2] || 0), 2), 0.5);
    }

};

exports["default"] = geomUtil;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

var d3 = require('d3'),
    Eye = require('./eye.js'),
    geomUtil = require('./geometry_utilities.js');

/*
 * Globe animation module.
 * @returns {object} self - Module object with public API.
 */
module.exports = function (fileName) {

    var self = {
        timeStep: 0.02,
        width: 0,
        height: 0,
        svg: undefined,
        eye: undefined
    };

    self.start = function () {
        self.setup();
        d3.json('data/geo/' + fileName, self.draw);
    };

    self.stop = function () {
        self.tearDown();
        self.removeElements();
    };

    self.setup = function () {
        self.svg = d3.select('.banner__globe').append('svg');
        self.setDimensions();
        self.eye = new Eye();
        window.addEventListener('resize', self.setDimensions);
    };

    self.tearDown = function () {
        if (self.animationIntervalId) {
            clearInterval(self.animationIntervalId);
        }
        window.removeEventListener('resize', self.setDimensions);
    };

    self.removeElements = function () {
        self.svg.selectAll('path').remove();
        self.svg.remove();
    };

    self.onFeatureClick = function (feature) {
        // this is a method assigned by the parent React component after self is first created.
        if (this.navigateToRandom != null) {
            this.navigateToRandom();
        }
    };

    self.onFeatureMouseEnter = function (feature) {
        if (this.triggerMessage != null) {
            this.triggerMessage();
        }
    };

    self.draw = function (error, data) {
        self.svg.selectAll('path').data(data.features).enter().append('path').on('mouseenter', self.onFeatureMouseEnter.bind(self)).on('click', self.onFeatureClick.bind(self));
        self.updateGeoPaths();
        self.animationIntervalId = setInterval(self.update, self.timeStep * 1000);
    };

    self.setDimensions = function () {
        self.width = window.innerWidth;
        self.height = window.innerHeight;
        if (self.svg) {
            self.svg.attr({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    };

    /*
     * @returns {object} path
     */
    self.getPath = function () {
        var path,
            projection,
            minWH = Math.min(self.width, self.height),
            avgWH = (self.width + self.height) / 2;
        projection = d3.geo.orthographic().scale(avgWH * 0.8).rotate([0, 0, 0]).translate([self.width / 2, self.height / 2]);
        projection.rotate([-self.eye.position[0], -self.eye.position[1]]);
        path = d3.geo.path().projection(projection);
        return path;
    };

    self.update = function () {
        self.eye.updateHarmonic(self.timeStep);
        self.updateGeoPaths();
    };

    self.getFeatureCentroid = function (feature) {
        var i, c, coord;
        // If centroid is already cached, return it.
        if (feature.geometry['_centroid_cache']) {
            return feature.geometry['_centroid_cache'];
        }
        c = [0, 0];
        coord = feature.geometry.coordinates;
        for (i = 0; i < 3; i += 1) {
            c[0] += coordinates[0][i][0] / 3;
            c[1] += coordinates[0][i][1] / 3;
        }
        return c;
    };

    self.getFeatureOpacity = function (feature) {
        var centroid, centroidCheck, delta, deltaMax, distance, op;
        if (feature._isActive === true) {
            return 0.6;
        }
        centroid = self.getFeatureCentroid(feature);
        distance = geomUtil.getLongLatDistance(self.eye.position, centroid);
        delta = distance / 2;
        deltaMax = 0.4;
        if (delta > deltaMax) {
            return 0;
        }
        op = Math.pow((deltaMax - delta) / deltaMax, 4) * 0.9;
        return op;
    };

    self.updateGeoPaths = function () {
        var path = self.getPath();
        return self.svg.selectAll('path').attr({
            d: function d(feature) {
                return path(feature);
            },
            'class': function _class(feature) {
                var cls = 'banner__geopath';
                return cls;
            },
            opacity: self.getFeatureOpacity
        });
    };

    return self;
};

},{"./eye.js":1,"./geometry_utilities.js":2,"d3":17}],4:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _componentsRoutesJsx = require('./components/routes.jsx');

var _componentsRoutesJsx2 = _interopRequireDefault(_componentsRoutesJsx);

global.psz = {

	start: function start() {
		console.log('Hi, Mom!');
		_reactRouter2['default'].run(_componentsRoutesJsx2['default'], _reactRouter2['default'].HistoryLocation, function (Root, state) {
			_react2['default'].render(_react2['default'].createElement(Root, null), global.document.getElementById('site'));
		});
	}

};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./components/routes.jsx":11,"react":214,"react-router":45}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _assetsScriptGlobeJs = require('./../../assets/script/globe.js');

var _assetsScriptGlobeJs2 = _interopRequireDefault(_assetsScriptGlobeJs);

var _reactRouter = require('react-router');

var Banner = (function (_React$Component) {
	_inherits(Banner, _React$Component);

	function Banner(props) {
		_classCallCheck(this, Banner);

		_get(Object.getPrototypeOf(Banner.prototype), 'constructor', this).call(this, props);
		this.state = {
			wasMessageTriggered: false,
			isMessageShowing: false
		};
	}

	_createClass(Banner, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'banner fill-parent' },
				React.createElement('div', { className: 'banner__background' }),
				React.createElement('div', { className: 'banner__globe' }),
				React.createElement(
					'div',
					{ className: 'banner__summary' },
					React.createElement(
						_reactRouter.Link,
						{ to: '/things?type=project' },
						React.createElement(
							'p',
							null,
							'a little room'
						),
						React.createElement(
							'p',
							null,
							'for some mindful code, design and writing'
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'banner__message', style: this.getMessageStyle() },
					'hey, welcome! click a triangle for random content'
				)
			);
		}
	}, {
		key: 'navigateToRandom',
		value: function navigateToRandom() {
			this.context.router.transitionTo('/things/random');
		}
	}, {
		key: 'getMessageStyle',
		value: function getMessageStyle() {
			if (this.state.isMessageShowing) {
				return { opacity: 0.6 };
			}
			return { opacity: 0 };
		}
	}, {
		key: 'triggerMessage',
		value: function triggerMessage() {
			var _this = this;

			if (this.state.wasMessageTriggered) {
				return;
			}
			this.setState({
				wasMessageTriggered: true,
				isMessageShowing: true
			});
			setTimeout(function () {
				_this.setState({ isMessageShowing: false });
			}, 4500);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.globeAnimation = (0, _assetsScriptGlobeJs2['default'])('geo.json');
			this.globeAnimation.navigateToRandom = this.navigateToRandom.bind(this);
			this.globeAnimation.triggerMessage = this.triggerMessage.bind(this);
			this.globeAnimation.start();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.globeAnimation.stop();
		}
	}]);

	return Banner;
})(React.Component);

Banner.contextTypes = {
	router: React.PropTypes.func
};

module.exports = Banner;

},{"./../../assets/script/globe.js":3,"react":214,"react-router":45}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Buttons = {};

Buttons.BackToMain = (function (_React$Component) {
	_inherits(_class, _React$Component);

	function _class() {
		_classCallCheck(this, _class);

		_get(Object.getPrototypeOf(_class.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"svg",
				{ viewBox: "0 0 200 200" },
				React.createElement(
					"g",
					null,
					React.createElement("polygon", { points: "169.869,122.333 104.26,84.454 169.869,46.575 " }),
					React.createElement("polygon", { points: "91.883,63.283 45.827,36.692 91.883,10.101 " }),
					React.createElement("polygon", { points: "132.218,186.898 76.302,154.616 132.218,122.333 " })
				)
			);
		}
	}]);

	return _class;
})(React.Component);

Buttons.Arrow = (function (_React$Component2) {
	_inherits(_class2, _React$Component2);

	function _class2() {
		_classCallCheck(this, _class2);

		_get(Object.getPrototypeOf(_class2.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(_class2, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"svg",
				{ viewBox: "0 0 200 200" },
				React.createElement(
					"g",
					null,
					React.createElement("polygon", { points: "137.878,67.196 100.001,132.804 62.122,67.196" })
				)
			);
		}
	}]);

	return _class2;
})(React.Component);

module.exports = Buttons;

},{"react":214}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _buttonsJsx = require('./buttons.jsx');

var _buttonsJsx2 = _interopRequireDefault(_buttonsJsx);

var _reactRouter = require('react-router');

var Header = (function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header() {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), 'constructor', this).call(this);
		this.state = {};
		this.state.buttons = [{
			name: 'projects',
			url: '/things?type=project'
		}, {
			name: 'blog',
			url: '/things?type=blog'
		}, {
			name: 'about',
			url: '/things/about'
		}].reverse();
	}

	_createClass(Header, [{
		key: 'getList',
		value: function getList() {
			var activeType = this.props.type;
			return this.state.buttons.map(function (button, index) {
				var isActive = activeType && (button.name === activeType || button.name.slice(0, -1) === activeType),
				    className = 'header__nav__item' + (isActive ? ' header__nav__item--active' : '');
				return _react2['default'].createElement(
					'li',
					{ className: className, key: index },
					_react2['default'].createElement(
						_reactRouter.Link,
						{ to: button.url },
						button.name
					)
				);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'header' },
				_react2['default'].createElement(
					_reactRouter.Link,
					{ className: 'header__main-link', to: '/' },
					_react2['default'].createElement(_buttonsJsx2['default'].BackToMain, null)
				),
				_react2['default'].createElement(
					'ul',
					{ className: 'header__nav' },
					_react2['default'].createElement(
						'li',
						{ className: 'header__nav__arrow' },
						_react2['default'].createElement(_buttonsJsx2['default'].Arrow, null)
					),
					this.getList()
				)
			);
		}
	}]);

	return Header;
})(_react2['default'].Component);

Header.contextTypes = {
	router: _react2['default'].PropTypes.func
};

module.exports = Header;

},{"./buttons.jsx":6,"react":214,"react-router":45}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Logos = {};

Logos.Neutral = (function (_React$Component) {
	_inherits(_class, _React$Component);

	function _class() {
		_classCallCheck(this, _class);

		_get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('circle', { cx: '200', cy: '200.712', r: '199.221' })
				)
			);
		}
	}]);

	return _class;
})(_react2['default'].Component);

Logos.OnDeletingMyFacebook = (function (_React$Component2) {
	_inherits(_class2, _React$Component2);

	function _class2() {
		_classCallCheck(this, _class2);

		_get(Object.getPrototypeOf(_class2.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class2, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('circle', { cx: '200', cy: '200.712', r: '199.221' })
				),
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('path', { fill: '#FFFFFF', d: 'M210.598,268.44v-62.438h20.958l3.138-24.334h-24.096v-15.535c0-7.045,1.957-11.846,12.059-11.846 l12.885-0.005v-21.765c-2.228-0.297-9.876-0.959-18.775-0.959c-18.577,0-31.296,11.34-31.296,32.165v17.944h-21.011v24.334h21.011 v62.438H210.598z' })
				)
			);
		}
	}]);

	return _class2;
})(_react2['default'].Component);

Logos.Playground1 = (function (_React$Component3) {
	_inherits(_class3, _React$Component3);

	function _class3() {
		_classCallCheck(this, _class3);

		_get(Object.getPrototypeOf(_class3.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class3, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('circle', { cx: '200', cy: '200', r: '199.221' })
				),
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('circle', { fill: '#FFFFFF', cx: '158.324', cy: '221.22', r: '14.422' }),
					_react2['default'].createElement('path', { fill: '#FFFFFF', d: 'M161.654,276c0,0,0,15.721,0,22.484s9,7.146,9,0.115c0-9.171,0-49.064,0-49.064 c4,2.98,6.238,13.956,6.81,17.625c0.803,5.158,8.206,4.979,7.634-0.638c-1.845-18.07-9.601-28.522-17.799-28.522h-16.353 c-9.267,0-16.259,10.452-18.104,28.522c-0.573,5.617,6.177,5.894,6.979,0.734c0.57-3.669,1.832-14.741,5.832-17.722 c0,0,0,39.894,0,49.064c0,7.03,9,6.648,9-0.115s0-22.484,0-22.484H161.654z' }),
					_react2['default'].createElement('path', { fill: '#FFFFFF', d: 'M243.074,244.333h-3.455c0,0,3-38.979,3-68s-6-83.416-6-106s3-69.747,3-69.747h3.455c0,0-3,49.956-3,69.747 s6,75.536,6,106S243.074,244.333,243.074,244.333z' }),
					_react2['default'].createElement('path', { fill: '#FFFFFF', d: 'M203.618,244.333h3.455c0,0-3-38.979-3-68s6-83.416,6-106s-3-69.747-3-69.747h-3.455c0,0,3,49.956,3,69.747 s-6,75.536-6,106S203.618,244.333,203.618,244.333z' }),
					_react2['default'].createElement('rect', { x: '192.737', y: '247', fill: '#FFFFFF', width: '60', height: '5.158' })
				)
			);
		}
	}]);

	return _class3;
})(_react2['default'].Component);

Logos.Battle = (function (_React$Component4) {
	_inherits(_class4, _React$Component4);

	function _class4() {
		_classCallCheck(this, _class4);

		_get(Object.getPrototypeOf(_class4.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class4, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('path', { d: 'M41.582,314.867C17.446,282.191,3.178,241.783,3.178,198.043C3.178,89.341,91.298,1.221,200,1.221 c108.701,0,196.821,88.12,196.821,196.822c0,46.417-16.068,89.083-42.946,122.736c-24.513,0.679-26.381,19.249-51.269,19.249 c-22.082,0-28.667-19.246-49.339-19.246c-21.643,0-28.978,19.246-50.307,19.246c-20.235,0-26.781-19.246-50.409-19.246 c-28.018,0-28.996,19.246-53.761,19.246c-14.316,0-21.007-5.577-28.764-10.724c1.43-17.26,19.223-141.517,168.749-174.651 C89.337,170.431,48.597,288.771,41.875,314.797' })
				)
			);
		}
	}]);

	return _class4;
})(_react2['default'].Component);

Logos.Atlas = (function (_React$Component5) {
	_inherits(_class5, _React$Component5);

	function _class5() {
		_classCallCheck(this, _class5);

		_get(Object.getPrototypeOf(_class5.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class5, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('path', { d: 'M199.135,399.16C89.263,398.686,0.582,309.228,1.059,199.354C1.536,89.482,90.992,0.801,200.865,1.279 c109.872,0.478,198.554,89.934,198.076,199.806C398.463,310.957,309.008,399.639,199.135,399.16z' })
				),
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('rect', { x: '124.062', y: '233.479', fill: '#FFFFFF', width: '152.028', height: '21.306' }),
					_react2['default'].createElement('rect', { x: '124.062', y: '189.956', fill: '#FFFFFF', width: '152.028', height: '21.762' }),
					_react2['default'].createElement('rect', { x: '161.499', y: '146.433', fill: '#FFFFFF', width: '114.592', height: '21.762' }),
					_react2['default'].createElement('path', { fill: '#FFFFFF', d: 'M123.91,157.39c0-6.696,5.479-12.175,12.175-12.175c6.696,0,12.174,5.479,12.174,12.175 s-5.479,12.175-12.174,12.175C129.388,169.564,123.91,164.086,123.91,157.39' })
				)
			);
		}
	}]);

	return _class5;
})(_react2['default'].Component);

Logos.About = (function (_React$Component6) {
	_inherits(_class6, _React$Component6);

	function _class6() {
		_classCallCheck(this, _class6);

		_get(Object.getPrototypeOf(_class6.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class6, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('circle', { cx: '200', cy: '200', r: '199.221' })
				),
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('circle', { fill: '#FFFFFF', cx: '140', cy: '273.987', r: '14.999' }),
					_react2['default'].createElement('circle', { fill: '#FFFFFF', cx: '200', cy: '282.987', r: '14.999' }),
					_react2['default'].createElement('circle', { fill: '#FFFFFF', cx: '260', cy: '273.987', r: '14.999' })
				)
			);
		}
	}]);

	return _class6;
})(_react2['default'].Component);

Logos.Kinetic = (function (_React$Component7) {
	_inherits(_class7, _React$Component7);

	function _class7() {
		_classCallCheck(this, _class7);

		_get(Object.getPrototypeOf(_class7.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class7, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('circle', { cx: '200', cy: '200', r: '198.806' })
				),
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M166.268,122.81 c-3.999-4-10.486-4-14.486,0c-4,4.001-4,10.486,0,14.487' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '200', y1: '156.542', x2: '166.268', y2: '122.81' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '268.706', y1: '225.247', x2: '214.486', y2: '171.028' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '185.513', y1: '171.028', x2: '151.781', y2: '137.297' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '246.975', y1: '232.491', x2: '200', y2: '185.516' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '200', y1: '279.467', x2: '153.024', y2: '232.491' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '185.513', y1: '293.953', x2: '131.294', y2: '239.734' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '275.514', y1: '383.954', x2: '200', y2: '308.44' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '295.135', y1: '374.603', x2: '214.486', y2: '293.953' }),
					_react2['default'].createElement('path', { fill: '#FFFFFF', stroke: '#FFFFFF', strokeWidth: '5.9271', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M124.488,383.952 l144.218-144.218c3.999-4,3.999-10.486,0-14.487c-4.001-4-10.488-4-14.488,0L104.863,374.603l8.875,5.308L124.488,383.952z' }),
					_react2['default'].createElement('path', { fill: '#FFFFFF', stroke: '#FFFFFF', strokeWidth: '1.017', strokeMiterlimit: '10', d: 'M144.485,241.457 c-4.119,4.119-10.796,4.118-14.915-0.001c-4.116-4.117-4.116-10.794,0-14.913l105.458-105.456c4.115-4.117,10.793-4.117,14.912,0 c4.117,4.12,4.117,10.795,0,14.914L144.485,241.457H129.57c-4.116-4.118-4.116-10.795,0-14.914' }),
					_react2['default'].createElement('circle', { cx: '200', cy: '171.028', r: '4.097' }),
					_react2['default'].createElement('circle', { cx: '261.461', cy: '232.491', r: '4.098' }),
					_react2['default'].createElement('circle', { cx: '200', cy: '293.953', r: '4.097' }),
					_react2['default'].createElement('circle', { cx: '138.537', cy: '232.491', r: '4.098' })
				)
			);
		}
	}]);

	return _class7;
})(_react2['default'].Component);

Logos.ScalingTricksForGeo = (function (_React$Component8) {
	_inherits(_class8, _React$Component8);

	function _class8() {
		_classCallCheck(this, _class8);

		_get(Object.getPrototypeOf(_class8.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class8, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('path', { d: 'M353.722,324.998l-0.524-3.531l-0.576-4.36l-0.296-5.119l0.529-4.97l0.458-4.309l-0.241-4.622l-1.058-4.52 l-2.828-2.777l-1.994-0.186l-1.273,1.109l-1.994-2.77l-0.133-6.545l1.152-2.399h3.527l4.475-1.613l4.105-1.281l4.035-1.015 l-0.17-3.507l0.027-5.584v-3v-4.92l-0.691-3.387l-0.891-3.265l-1.76-4.482l-2.151-5.266l-1.771-4.283l-1.824-4.263l0.574-2.78 l-1.045-6.334l-2.381-5.067c0,0-1.991-2.701-2.802-3.801s-2.979-2.229-2.979-2.229l-1.184,0.391l0.9,3.689l-0.988,3.153 l-3.973,1.113l-1.992-2.967l-0.977-3.548l-1.124-3.971l-2.219-3.769l-2.948-2.989l-3.768-0.098l-1.684-3.597l-1.703-3.639 l-1.895-4.049l-2.094-4.472l-1.266-4.628l-1.336-4.872l-1.331-4.854l-1.448-5.282l-3.967-2.776l-4.463-0.574l-4.125-0.533 l-6.914-0.904l-4.818-1.404l-5.943-2.234c0,0-5.006-2.597-5.896-3.163s-3.906-3.188-3.906-3.188l-3.537-3.208l-3.762-3.412 l-3.852-4.003l-1.511-4.318l-2.599-7.171l-3.217-3.612l-4.624-5.194l-3.038-3.724l-2.414-3.636l-1.583-2.874l-1.61-5.56 l-2.892-3.461l69.104-71.896c-30.801-19.865-67.45-31.461-106.819-31.632C89.936,0.58,0.479,89.262,0.002,199.134 c-0.477,109.873,88.204,199.331,198.076,199.806C260.91,399.213,317.065,370.329,353.722,324.998z' })
				)
			);
		}
	}]);

	return _class8;
})(_react2['default'].Component);

Logos.RipsawJs = (function (_React$Component9) {
	_inherits(_class9, _React$Component9);

	function _class9() {
		_classCallCheck(this, _class9);

		_get(Object.getPrototypeOf(_class9.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class9, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('path', { d: 'M52.823,216.145l28.07-104.892c60.312,16.145,120.623,32.289,180.938,48.437 c7.327,1.961,11.676,9.492,9.716,16.821c-2.643,9.867-5.287,19.739-7.928,29.61c-1.604,6.01-7.053,10.188-13.28,10.185 c-5.96-0.006-11.92-0.013-17.877-0.02c1.81-11.837-0.583-16.592-7.169-14.255c-3.647,3.835-7.777,8.582-12.382,14.237 c1.813-11.836-0.577-16.592-7.162-14.252c-3.65,3.838-7.776,8.582-12.387,14.239c1.812-11.84-0.577-16.593-7.158-14.253 c-3.652,3.837-7.782,8.578-12.387,14.239c1.81-11.842-0.577-16.597-7.166-14.257c-3.646,3.839-7.776,8.584-12.383,14.24 c1.812-11.837-0.581-16.592-7.162-14.255c-3.652,3.837-7.777,8.583-12.387,14.239c1.81-11.838-0.577-16.591-7.16-14.256 c-3.652,3.838-7.777,8.583-12.385,14.241c1.809-11.841-0.581-16.594-7.162-14.254c-3.65,3.834-7.779,8.583-12.385,14.237 c1.811-11.837-0.58-16.592-7.164-14.254c-3.647,3.835-7.777,8.583-12.382,14.239C68.324,216.162,60.575,216.153,52.823,216.145z M30.827,225.854c-9.305-2.487-18.612-4.979-27.919-7.471c8.898,95.366,84.854,170.66,180.302,178.723 c95.442,8.062,182.948-53.423,207.718-145.95c24.771-92.526-20.314-189.507-107.024-230.208 C197.197-19.751,93.786,7.522,38.429,85.692c9.307,2.491,18.614,4.984,27.917,7.446c7.331,1.962,11.68,9.492,9.718,16.82 L47.648,216.14C45.688,223.47,38.158,227.819,30.827,225.854z' }),
					_react2['default'].createElement('path', { d: 'M23.629,110.17c3.028,0.812,6.051,1.619,9.075,2.43c7.331,1.962,11.684,9.492,9.72,16.822 c-4.737,17.692-9.472,35.385-14.209,53.077c-1.962,7.329-9.491,11.677-16.82,9.716c-3.026-0.81-6.051-1.621-9.075-2.432 C3.798,161.158,10.612,135.708,23.629,110.17z' })
				)
			);
		}
	}]);

	return _class9;
})(_react2['default'].Component);

Logos.Pba = (function (_React$Component10) {
	_inherits(_class10, _React$Component10);

	function _class10() {
		_classCallCheck(this, _class10);

		_get(Object.getPrototypeOf(_class10.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class10, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('path', { d: 'M199.135,398.939C89.263,398.465,0.582,309.007,1.059,199.134C1.536,89.262,90.992,0.58,200.865,1.059 c109.872,0.478,198.554,89.934,198.076,199.806C398.463,310.736,309.008,399.418,199.135,398.939z' })
				),
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement(
						'g',
						null,
						_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '8', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', x1: '274.299', y1: '153.781', x2: '126.702', y2: '245.93' }),
						_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '8', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', x1: '154.425', y1: '126.056', x2: '246.575', y2: '273.653' }),
						_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '8', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', d: ' M220.44,114.906c0,0-18.53,41.45,0.615,72.116c19.146,30.664,64.093,33.517,64.093,33.517' }),
						_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '8', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', d: ' M116.711,179.668c0,0,45.377,1.549,64.521,32.216c19.146,30.665,1.973,72.301,1.973,72.301' }),
						_react2['default'].createElement('circle', { style: noFill, stroke: '#FFFFFF', strokeWidth: '8', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', cx: '200.497', cy: '200', r: '101.511' })
					)
				)
			);
		}
	}]);

	return _class10;
})(_react2['default'].Component);

Logos.GiraffeForRhino = (function (_React$Component11) {
	_inherits(_class11, _React$Component11);

	function _class11() {
		_classCallCheck(this, _class11);

		_get(Object.getPrototypeOf(_class11.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class11, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('path', { d: 'M200.001,398.927c-54.089,0-106.13-22.244-143.529-61.19l26.826-27.219c0.08-0.083,0.159-0.17,0.233-0.256 c0,0,21.731-21.636,37.434-43.782s0.326-0.411,0.461-0.636c0,0,30.879-51.74,32.352-53.011s10.547-4.433,13.01-4.883 s42.811,2.331,46.074,2.878s8.931,4.255,13.875,4.631c6.462,0.491,13.805-1.167,15.395-3.853 c2.494-5.523-3.583-19.841-3.583-19.841c-0.312-1.174-1.049-2.191-2.066-2.854c0,0-20.763-13.142-27.56-17.964 s-15.247-13.484-18.271-15.071c-3.296-1.73-10.522-0.805-12.086-1.882s-11.637-14.427-11.637-14.427 c-0.958-1.187-2.378-1.833-3.835-1.833c-0.65,0-1.307,0.129-1.932,0.396c-2.025,0.865-3.232,2.973-2.951,5.159l1.426,11.034 l-0.199,0.216l-9.905-6.521c-0.816-0.538-1.76-0.812-2.708-0.812c-0.646,0-1.297,0.128-1.911,0.386 c-1.513,0.637-2.609,1.987-2.92,3.599c0,0-1.939,13.042-2.924,15.051s-52.413,53.109-72.407,71.101s-50.409,39.012-50.409,39.012 c-10.075-24.193-15.18-49.85-15.18-76.353C1.073,90.312,90.312,1.073,200.001,1.073c109.689,0,198.928,89.239,198.928,198.928 C398.929,309.689,309.69,398.927,200.001,398.927z' })
				),
				_react2['default'].createElement(
					'g',
					{ 'class': 'psz-icons__eye' },
					_react2['default'].createElement('path', { d: 'M178.5,169.927c1.649-0.418,2.409-1.754,3.797-0.733c1.388,1.021,0.524,2.488,0.498,3.378 s0.365,1.938-0.682,2.487s-2.487,0.079-3.613-0.628c-1.125-0.707-4.241-0.523-4.006-2.802 C174.729,169.351,176.851,170.346,178.5,169.927z' })
				)
			);
		}
	}]);

	return _class11;
})(_react2['default'].Component);

Logos.AlgorithmicTattoo = (function (_React$Component12) {
	_inherits(_class12, _React$Component12);

	function _class12() {
		_classCallCheck(this, _class12);

		_get(Object.getPrototypeOf(_class12.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class12, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('circle', { cx: '200', cy: '200.712', r: '199.221' })
				),
				_react2['default'].createElement(
					'g',
					null,
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '101.845', y1: '227.553', x2: '57.569', y2: '283.444' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '103.697', y1: '226.295', x2: '111.87', y2: '215.977' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '215.549', y1: '268.788', x2: '145.937', y2: '356.675' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '184.156', y1: '174.92', x2: '173.467', y2: '188.412' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '215.254', y1: '218.2', x2: '219.224', y2: '221.344' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '145.006', y1: '223.729', x2: '152.943', y2: '230.016' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '115.039', y1: '217.772', x2: '112.659', y2: '215.884' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '239.331', y1: '198.495', x2: '249.645', y2: '206.666' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '234.052', y1: '162.14', x2: '228.495', y2: '157.736' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '241.63', y1: '218.317', x2: '249.798', y2: '207.996' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '158.312', y1: '223.624', x2: '153.276', y2: '229.978' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '167.082', y1: '184.105', x2: '172.639', y2: '188.508' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '107.135', y1: '174.501', x2: '95.227', y2: '165.067' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '152.477', y1: '144.918', x2: '151.223', y2: '146.505' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '149.075', y1: '114.141', x2: '211.232', y2: '35.669' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '226.144', y1: '136.052', x2: '286.126', y2: '60.326' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '100.737', y1: '156.617', x2: '95.078', y2: '163.762' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '159.109', y1: '286.446', x2: '115.044', y2: '342.077' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '284.985', y1: '285.527', x2: '222.381', y2: '364.566' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '277.807', y1: '222.625', x2: '284.093', y2: '214.688' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '88.149', y1: '165.17', x2: '49.19', y2: '134.311' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '318.648', y1: '209.954', x2: '359.282', y2: '158.656' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '284.093', y1: '214.688', x2: '318.648', y2: '209.954' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '277.807', y1: '222.625', x2: '284.985', y2: '285.527' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '211.811', y1: '232.809', x2: '215.549', y2: '268.788' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '227.95', y1: '157.799', x2: '226.144', y2: '136.052' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '152.477', y1: '144.918', x2: '149.075', y2: '114.141' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '163.296', y1: '158.131', x2: '167.082', y2: '184.105' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '184.156', y1: '174.92', x2: '218.519', y2: '169.708' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '249.645', y1: '206.666', x2: '272.896', y2: '204.693' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '219.254', y1: '221.631', x2: '241.63', y2: '218.317' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '187.951', y1: '220.046', x2: '215.254', y2: '218.2' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '158.312', y1: '223.624', x2: '167.774', y2: '221.895' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '152.943', y1: '230.016', x2: '159.109', y2: '286.446' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '176.042', y1: '210.621', x2: '172.639', y2: '188.508' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '111.87', y1: '215.977', x2: '107.135', y2: '174.501' }),
					_react2['default'].createElement('line', { style: noFill, stroke: '#FFFFFF', strokeWidth: '7', strokeLinecap: 'round', strokeLinejoin: 'round', x1: '88.149', y1: '165.17', x2: '95.078', y2: '163.762' })
				)
			);
		}
	}]);

	return _class12;
})(_react2['default'].Component);

Logos.PendantProject = (function (_React$Component13) {
	_inherits(_class13, _React$Component13);

	function _class13() {
		_classCallCheck(this, _class13);

		_get(Object.getPrototypeOf(_class13.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(_class13, [{
		key: 'render',
		value: function render() {
			var noFill = { fill: 'none' };
			return _react2['default'].createElement(
				'svg',
				{ className: this.props.className, viewBox: '0 0 400 400' },
				_react2['default'].createElement(
					'g',
					{ 'class': 'fill' },
					_react2['default'].createElement('circle', { cx: '200', cy: '200', r: '199.221' })
				),
				_react2['default'].createElement(
					'g',
					{ 'class': 'Layer_1' },
					_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M220.925,184.943 c23.577,18.514,24.397,51.755,1.665,71.585c-19.776,17.252-50.489,18.067-71.004,1.954c-23.569-18.508-24.396-51.736-1.674-71.57 C169.687,169.65,200.403,168.831,220.925,184.943z' }),
					_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M196.037,170.955 c-1.807-0.762-2.893-2.84-1.526-4.677c1.14-1.538,3.315-1.839,4.886-1.179c1.806,0.76,2.889,2.838,1.523,4.676 C199.782,171.311,197.605,171.613,196.037,170.955z' }),
					_react2['default'].createElement(
						'g',
						null,
						_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M171.863,284.825 c16.347,3.116,33.791,0.683,48.812-7.394c14.849-7.984,27.735-21.891,32.384-40.346' }),
						_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M253.059,237.086 c0.472-1.866,0.848-3.747,1.132-5.66' }),
						_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M254.19,231.426 c4.262-28.69-13.045-52.307-35.023-63.1c-21.759-10.688-48.329-9.756-69.396,2.621c-21.356,12.544-36.807,37.58-30.393,65.835 c6.191,27.265,29.6,43.68,52.484,48.043' })
					),
					_react2['default'].createElement(
						'g',
						{ 'class': 'ring_2_' },
						_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M200.442,165.75 c-0.381,0.887-0.761,1.738-1.38,2.471c-0.96,1.131-1.366,0.195-1.421-1.09c-0.09-2.012,0.308-3.859,0.767-5.759 c0.457-1.894,1.02-3.712,1.818-5.468c0.401-0.881,0.736-1.737,1.504-2.367c1.072-0.883,1.134,0.857,1.129,1.842' }),
						_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M202.858,155.38 c-0.015,2.463-0.558,4.712-1.229,7.009' })
					),
					_react2['default'].createElement(
						'g',
						{ 'class': 'thread_2_' },
						_react2['default'].createElement('path', { style: noFill, stroke: '#FFFFFF', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M202.271,56.238 c-11.322,3.758-21.878,8.106-31.541,16.229c-9.901,8.324-15.77,18.926-14.083,33.445c1.423,12.248,7.885,25.613,15.302,34.445 c4.705,5.607,10.041,9.848,15.988,13.584c4.336,2.725,8.421,5.271,13.658,5.673c4.776,0.368,8.763-1.142,12.967-3.229 c6.592-3.271,12.609-7.555,18.754-11.663c9.995-6.679,19.967-13.262,30.668-18.545c5.907-2.915,12.074-5.029,17.597-9.055 c4.715-3.437,7.513-7.775,6.382-14.451c-0.865-5.119-3.113-9.101-5.688-13.205c-4.188-6.677-9.108-12.488-14.265-18.179' })
					)
				)
			);
		}
	}]);

	return _class13;
})(_react2['default'].Component);

exports['default'] = Logos;
module.exports = exports['default'];

},{"react":214}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _generalHeaderJsx = require('./../../general/header.jsx');

var _generalHeaderJsx2 = _interopRequireDefault(_generalHeaderJsx);

var _reactRouter = require('react-router');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _modelsProjectJs = require('./../../../models/project.js');

var _modelsProjectJs2 = _interopRequireDefault(_modelsProjectJs);

var _generalProject_logosJsx = require('./../../general/project_logos.jsx');

var _generalProject_logosJsx2 = _interopRequireDefault(_generalProject_logosJsx);

var Index = (function (_React$Component) {
	_inherits(Index, _React$Component);

	function Index(props) {
		_classCallCheck(this, Index);

		_get(Object.getPrototypeOf(Index.prototype), 'constructor', this).call(this, props);
		this.state = this.state || {};
		this.props = this.props || {};
	}

	_createClass(Index, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'wrapper__content' },
				_react2['default'].createElement(_generalHeaderJsx2['default'], { type: this.getType() }),
				_react2['default'].createElement(ProjectGroupList, { projects: this.getFilteredProjects() })
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this = this;

			var coll, promise;
			if (this.getProjects() == null) {
				coll = new _modelsProjectJs2['default'].Collection();
				promise = coll.getFetchPromise({});
				promise.then(function (coll) {
					_this.setState({ projects: coll });
				}, function () {
					console.log('promise rejected');
				});
			}
		}
	}, {
		key: 'getFilteredProjects',
		value: function getFilteredProjects() {
			if (this.getProjects() == null) {
				return;
			}
			return this.getProjects().where({ type: this.getType() });
		}
	}, {
		key: 'getProjects',
		value: function getProjects() {
			// projects are stored in props if rendered server-side, and on the state if rendered client-side.
			if (this.state.projects != null) {
				return this.state.projects;
			}
			return this.props.projects;
		}
	}, {
		key: 'getType',
		value: function getType() {
			return this.props.query.type;
		}
	}]);

	return Index;
})(_react2['default'].Component);

Index.contextTypes = {
	router: _react2['default'].PropTypes.func
};

var ProjectGroupList = (function (_React$Component2) {
	_inherits(ProjectGroupList, _React$Component2);

	function ProjectGroupList() {
		_classCallCheck(this, ProjectGroupList);

		_get(Object.getPrototypeOf(ProjectGroupList.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ProjectGroupList, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'project-groups' },
				this.renderGroups()
			);
		}
	}, {
		key: 'renderGroups',
		value: function renderGroups() {

			var projects = this.props.projects;

			if (projects == null) {
				return _react2['default'].createElement('img', { src: '/images/loader/ripple.gif' });
			}

			var groups = _underscore2['default'].groupBy(projects, function (model) {
				return model.get('group');
			});

			return Object.keys(groups).map(function (key, index) {
				var projects = groups[key];
				if (projects == null) {
					return _react2['default'].createElement('div', null);
				}
				return _react2['default'].createElement(
					'div',
					{ className: 'project-group', key: index },
					_react2['default'].createElement(
						'h1',
						{ id: key },
						key
					),
					_react2['default'].createElement(ProjectList, { projects: projects })
				);
			});
		}
	}]);

	return ProjectGroupList;
})(_react2['default'].Component);

var ProjectList = (function (_React$Component3) {
	_inherits(ProjectList, _React$Component3);

	function ProjectList() {
		_classCallCheck(this, ProjectList);

		_get(Object.getPrototypeOf(ProjectList.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ProjectList, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'ul',
				{ className: 'projects' },
				this.renderList()
			);
		}
	}, {
		key: 'renderList',
		value: function renderList() {
			return this.props.projects.map(function (project, index) {
				return _react2['default'].createElement(ProjectListItem, { project: project, key: index });
			});
		}
	}]);

	return ProjectList;
})(_react2['default'].Component);

var ProjectListItem = (function (_React$Component4) {
	_inherits(ProjectListItem, _React$Component4);

	function ProjectListItem() {
		_classCallCheck(this, ProjectListItem);

		_get(Object.getPrototypeOf(ProjectListItem.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ProjectListItem, [{
		key: 'render',
		value: function render() {
			var project = this.props.project;
			return _react2['default'].createElement(
				'li',
				{ className: '' },
				_react2['default'].createElement(
					_reactRouter.Link,
					{ className: 'project', to: '/things/' + project.get('id') },
					this.renderBackgroundImage(),
					_react2['default'].createElement(
						'div',
						{ className: 'project__title' },
						this.getName()
					)
				)
			);
		}
	}, {
		key: 'renderBackgroundImage',
		value: function renderBackgroundImage() {
			var project = this.props.project,
			    id = project.get('id'),
			    name = id.split('-').map(function (word) {
				return word[0].toUpperCase() + word.slice(1);
			}).join(''),
			    Comp = _generalProject_logosJsx2['default'][name];
			if (Comp == null) {
				return _react2['default'].createElement(_generalProject_logosJsx2['default'].Neutral, { className: 'project__logo' });
			}
			return _react2['default'].createElement(Comp, { className: 'project__logo' });
		}
	}, {
		key: 'getName',
		value: function getName() {
			var name = this.props.project.get('name');
			if (this.props.project.get('is_draft') === true) {
				name += ' (draft)';
			}
			return name;
		}
	}]);

	return ProjectListItem;
})(_react2['default'].Component);

exports['default'] = Index;
module.exports = exports['default'];

},{"./../../../models/project.js":13,"./../../general/header.jsx":7,"./../../general/project_logos.jsx":8,"react":214,"react-router":45,"underscore":215}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _generalHeaderJsx = require('./../../general/header.jsx');

var _generalHeaderJsx2 = _interopRequireDefault(_generalHeaderJsx);

var _modelsProjectJs = require('./../../../models/project.js');

var _modelsProjectJs2 = _interopRequireDefault(_modelsProjectJs);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _generalProject_logosJsx = require('./../../general/project_logos.jsx');

var _generalProject_logosJsx2 = _interopRequireDefault(_generalProject_logosJsx);

var Show = (function (_React$Component) {
	_inherits(Show, _React$Component);

	function Show(props) {
		_classCallCheck(this, Show);

		_get(Object.getPrototypeOf(Show.prototype), 'constructor', this).call(this, props);
		this.state = this.state || {};
		this.props = this.props || {};
	}

	_createClass(Show, [{
		key: 'render',
		value: function render() {
			var project = this.getProject();
			return _react2['default'].createElement(
				'div',
				{ className: 'wrapper__content' },
				_react2['default'].createElement(_generalHeaderJsx2['default'], null),
				_react2['default'].createElement(ProjectShowItem, { project: project })
			);
		}

		// If project was passed down in props, no need to fetch again.
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.getProject() == null) {
				this.fetchProject();
			}
		}

		// Always fetch on update.
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.fetchProject();
		}
	}, {
		key: 'fetchProject',
		value: function fetchProject() {
			var _this = this;

			var coll, promise, id;
			id = this.props.params.id;
			coll = new _modelsProjectJs2['default'].Collection();
			promise = coll.getFetchPromise({ id: id });
			promise.then(function (coll) {
				_this.setState({ project: coll.models[0] });
			}, function () {
				console.log('promise rejected');
			});
		}
	}, {
		key: 'getProject',
		value: function getProject() {
			return this.state.project || this.props.project;
		}
	}], [{
		key: 'fetchData',
		value: function fetchData() {}
	}]);

	return Show;
})(_react2['default'].Component);

var ProjectShowItem = (function (_React$Component2) {
	_inherits(ProjectShowItem, _React$Component2);

	function ProjectShowItem() {
		_classCallCheck(this, ProjectShowItem);

		_get(Object.getPrototypeOf(ProjectShowItem.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ProjectShowItem, [{
		key: 'render',
		value: function render() {
			var project = this.props.project;
			if (project == null) {
				return _react2['default'].createElement(
					'div',
					{ className: 'projects' },
					_react2['default'].createElement('img', { src: '/images/loader/ripple.gif' })
				);
			}
			return _react2['default'].createElement(
				'div',
				{ className: 'fill-parent' },
				_react2['default'].createElement(
					'h1',
					{ className: 'title' },
					this.getTitle()
				),
				this.renderSubtitle(),
				this.renderDates(),
				this.renderUrl(),
				this.renderBody()
			);
		}
	}, {
		key: 'renderDates',
		value: function renderDates() {
			var dates = this.props.project.get('dates'),
			    formattedDates,
			    content;
			if (dates == null) {
				return;
			}
			formattedDates = dates.map(function (date) {
				if (date === 'present') {
					return date;
				}
				return (0, _moment2['default'])(date, 'YYYY-MM').format('MMMM YYYY');
			});
			content = formattedDates.join(' - ');
			return _react2['default'].createElement(
				'div',
				{ className: 'date' },
				content
			);
		}
	}, {
		key: 'getTitle',
		value: function getTitle() {
			var title = this.props.project.get('title');
			if (this.props.project.get('is_draft') === true) {
				title += ' (draft)';
			}
			return title;
		}
	}, {
		key: 'renderSubtitle',
		value: function renderSubtitle() {
			if (this.props.project.get('subtitle') == null) {
				return;
			}
			return _react2['default'].createElement(
				'h2',
				{ className: 'subtitle' },
				'' + this.props.project.get('subtitle') + ''
			);
		}
	}, {
		key: 'renderUrl',
		value: function renderUrl() {
			var url = this.props.project.get('url');
			if (url == null) {
				return;
			}
			return _react2['default'].createElement(
				'a',
				{ className: 'main-link', href: url, target: '_blank' },
				'Project Site'
			);
		}
	}, {
		key: 'renderBody',
		value: function renderBody() {
			var md = this.props.project.get('bodyText');
			if (md == null) {
				return;
			}
			return _react2['default'].createElement('div', { className: 'static', dangerouslySetInnerHTML: { __html: (0, _marked2['default'])(md) } });
		}
	}]);

	return ProjectShowItem;
})(_react2['default'].Component);

exports['default'] = Show;
module.exports = exports['default'];

},{"./../../../models/project.js":13,"./../../general/header.jsx":7,"./../../general/project_logos.jsx":8,"marked":19,"moment":20,"react":214,"react-router":45}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bannerRootJsx = require('./banner/root.jsx');

var _bannerRootJsx2 = _interopRequireDefault(_bannerRootJsx);

var _projectsIndexRootJsx = require('./projects/index/root.jsx');

var _projectsIndexRootJsx2 = _interopRequireDefault(_projectsIndexRootJsx);

var _projectsShowRootJsx = require('./projects/show/root.jsx');

var _projectsShowRootJsx2 = _interopRequireDefault(_projectsShowRootJsx);

var _reactRouter = require('react-router');

var _reactRouterLibHistory = require('react-router/lib/History');

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'wrapper fill-parent' },
				_react2['default'].createElement(_reactRouter.RouteHandler, null)
			);
		}
	}]);

	return App;
})(_react2['default'].Component);

var routes = _react2['default'].createElement(
	_reactRouter.Route,
	{ handler: App },
	_react2['default'].createElement(_reactRouter.Route, { name: 'home', path: '/', handler: _bannerRootJsx2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { name: 'things', path: '/things', handler: _projectsIndexRootJsx2['default'] }),
	_react2['default'].createElement(_reactRouter.Route, { name: 'thing', path: '/things/:id', handler: _projectsShowRootJsx2['default'] })
);

exports['default'] = routes;
module.exports = exports['default'];

},{"./banner/root.jsx":5,"./projects/index/root.jsx":9,"./projects/show/root.jsx":10,"react":214,"react-router":45,"react-router/lib/History":22}],12:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _backbone = require('backbone');

var Backbone = _interopRequireWildcard(_backbone);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var Model = (function (_Backbone$Model) {
    _inherits(Model, _Backbone$Model);

    function Model() {
        _classCallCheck(this, Model);

        _get(Object.getPrototypeOf(Model.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Model, [{
        key: 'isOnClient',
        value: function isOnClient() {
            return fs == null || fs.readFile == null;
        }
    }]);

    return Model;
})(Backbone.Model);

var Collection = (function (_Backbone$Collection) {
    _inherits(Collection, _Backbone$Collection);

    function Collection() {
        _classCallCheck(this, Collection);

        _get(Object.getPrototypeOf(Collection.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Collection, [{
        key: 'isOnClient',

        /*
         * Determines whether the instance is called by the client or the server.
         */
        value: function isOnClient() {
            return fs == null || fs.readFile == null;
        }

        /*
         * Sets url property, building up query string from json.
         *
         */
    }, {
        key: 'setUrl',
        value: function setUrl(query) {
            var queryString = '?',
                key,
                value;
            for (key in query) {
                value = query[key];
                queryString += key + '=' + value + '&';
            }
            this.url = this.baseUrl + queryString;
        }

        /*
         * Reset collection to a include only one of its current models, picked at random.
         */
    }, {
        key: 'resetToRandom',
        value: function resetToRandom() {
            var randomIndex, randomModel;
            randomIndex = Math.floor(Math.random() * this.models.length);
            randomModel = this.models[randomIndex];
            this.reset([randomModel]);
        }
    }, {
        key: 'model',
        get: function get() {
            return Model;
        }
    }]);

    return Collection;
})(Backbone.Collection);

module.exports = {
    Model: Model,
    Collection: Collection
};

},{"backbone":14,"fs":15,"jquery":18}],13:[function(require,module,exports){
(function (__dirname){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _baseJs = require('./base.js');

var _baseJs2 = _interopRequireDefault(_baseJs);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var dbPath = __dirname + '/../../db/projects';

var Model = (function (_base$Model) {
    _inherits(Model, _base$Model);

    function Model() {
        _classCallCheck(this, Model);

        _get(Object.getPrototypeOf(Model.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Model, [{
        key: 'getShowUrl',
        value: function getShowUrl() {
            return '/show/' + this.get('id') + '.md';
        }
    }, {
        key: 'fetch',
        value: function fetch() {
            // if on client
            if (isOnClient()) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                _get(Object.getPrototypeOf(Model.prototype), 'fetch', this).apply(this, args);
            }
        }
    }, {
        key: 'getSetBodyPromise',
        value: function getSetBodyPromise() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                if (_this.isOnClient()) {

                    resolve();
                } else {
                    _fs2['default'].readFile(dbPath + '/show/' + _this.get('id') + '.md', 'utf-8', function (err, data) {
                        if (err) {
                            console.log('Data file not found for project with id ' + _this.get('id') + '.');
                            data = '';
                        }
                        _this.set('bodyText', data);
                        resolve();
                    });
                }
            });
        }
    }]);

    return Model;
})(_baseJs2['default'].Model);

var Collection = (function (_base$Collection) {
    _inherits(Collection, _base$Collection);

    function Collection() {
        _classCallCheck(this, Collection);

        _get(Object.getPrototypeOf(Collection.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Collection, [{
        key: 'getFetchPromise',
        value: function getFetchPromise(query, options) {
            var _this2 = this;

            var shouldGetRandom = false,
                randomModel,
                randomIndex,
                promise;

            return new Promise(function (resolve, reject) {

                // if on client, fetch using API url and resolve on reset.
                if (_this2.isOnClient()) {

                    _this2.setUrl(query);
                    _this2.fetch({ reset: true });
                    _this2.on('reset', function () {
                        return resolve(_this2);
                    });

                    // if on server, retrieve from file system.
                } else {

                        _fs2['default'].readFile(dbPath + '/index.json', 'utf-8', function (err, data) {

                            var filteredCollection;

                            if (err) {
                                return reject(err);
                            }

                            data = JSON.parse(data);
                            _this2.reset(data);

                            if (query == null) {
                                return resolve(_this2);
                            }

                            if (query.id === 'random') {
                                delete query.id;
                                shouldGetRandom = true;
                            }

                            _this2.reset(_this2.where(query));

                            if (query.id == null && !shouldGetRandom) {
                                return resolve(_this2);
                            }

                            if (shouldGetRandom) {
                                _this2.resetToRandom();
                            }

                            promise = _this2.models[0].getSetBodyPromise();
                            promise.then(function () {
                                resolve(_this2);
                            });
                        });
                    }
            });
        }
    }, {
        key: 'model',
        get: function get() {
            return Model;
        }
    }, {
        key: 'baseUrl',
        get: function get() {
            return '/api/v1/projects';
        }
    }]);

    return Collection;
})(_baseJs2['default'].Collection);

module.exports = {
    Model: Model,
    Collection: Collection
};

}).call(this,"/app/models")

},{"./base.js":12,"fs":15,"marked":19}],14:[function(require,module,exports){
(function (global){
//     Backbone.js 1.2.2

//     (c) 2010-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = (typeof self == 'object' && self.self == self && self) ||
            (typeof global == 'object' && global.global == global && global);

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'), $;
    try { $ = require('jquery'); } catch(e) {}
    factory(root, exports, _, $);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to a common array method we'll want to use later.
  var slice = Array.prototype.slice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.2.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... this will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Proxy Backbone class methods to Underscore functions, wrapping the model's
  // `attributes` object or collection's `models` array behind the scenes.
  //
  // collection.filter(function(model) { return model.get('age') > 10 });
  // collection.each(this.addView);
  //
  // `Function#apply` can be slow so we use the method's arg count, if we know it.
  var addMethod = function(length, method, attribute) {
    switch (length) {
      case 1: return function() {
        return _[method](this[attribute]);
      };
      case 2: return function(value) {
        return _[method](this[attribute], value);
      };
      case 3: return function(iteratee, context) {
        return _[method](this[attribute], cb(iteratee, this), context);
      };
      case 4: return function(iteratee, defaultVal, context) {
        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
      };
      default: return function() {
        var args = slice.call(arguments);
        args.unshift(this[attribute]);
        return _[method].apply(_, args);
      };
    }
  };
  var addUnderscoreMethods = function(Class, methods, attribute) {
    _.each(methods, function(length, method) {
      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
    });
  };

  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
  var cb = function(iteratee, instance) {
    if (_.isFunction(iteratee)) return iteratee;
    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
    return iteratee;
  };
  var modelMatcher = function(attrs) {
    var matcher = _.matches(attrs);
    return function(model) {
      return matcher(model.attributes);
    };
  };

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // a custom event channel. You may bind a callback to an event with `on` or
  // remove with `off`; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {};

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Iterates over the standard `event, callback` (as well as the fancy multiple
  // space-separated events `"change blur", callback` and jQuery-style event
  // maps `{event: callback}`).
  var eventsApi = function(iteratee, events, name, callback, opts) {
    var i = 0, names;
    if (name && typeof name === 'object') {
      // Handle event maps.
      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
      for (names = _.keys(name); i < names.length ; i++) {
        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
      }
    } else if (name && eventSplitter.test(name)) {
      // Handle space separated event names by delegating them individually.
      for (names = name.split(eventSplitter); i < names.length; i++) {
        events = iteratee(events, names[i], callback, opts);
      }
    } else {
      // Finally, standard events.
      events = iteratee(events, name, callback, opts);
    }
    return events;
  };

  // Bind an event to a `callback` function. Passing `"all"` will bind
  // the callback to all events fired.
  Events.on = function(name, callback, context) {
    return internalOn(this, name, callback, context);
  };

  // Guard the `listening` argument from the public API.
  var internalOn = function(obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
        context: context,
        ctx: obj,
        listening: listening
    });

    if (listening) {
      var listeners = obj._listeners || (obj._listeners = {});
      listeners[listening.id] = listening;
    }

    return obj;
  };

  // Inversion-of-control versions of `on`. Tell *this* object to listen to
  // an event in another object... keeping track of what it's listening to
  // for easier unbinding later.
  Events.listenTo =  function(obj, name, callback) {
    if (!obj) return this;
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];

    // This object is not listening to any other events on `obj` yet.
    // Setup the necessary references to track the listening callbacks.
    if (!listening) {
      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
    }

    // Bind callbacks on obj, and keep track of them on listening.
    internalOn(obj, name, callback, this, listening);
    return this;
  };

  // The reducing API that adds a callback to the `events` object.
  var onApi = function(events, name, callback, options) {
    if (callback) {
      var handlers = events[name] || (events[name] = []);
      var context = options.context, ctx = options.ctx, listening = options.listening;
      if (listening) listening.count++;

      handlers.push({ callback: callback, context: context, ctx: context || ctx, listening: listening });
    }
    return events;
  };

  // Remove one or many callbacks. If `context` is null, removes all
  // callbacks with that function. If `callback` is null, removes all
  // callbacks for the event. If `name` is null, removes all bound
  // callbacks for all events.
  Events.off =  function(name, callback, context) {
    if (!this._events) return this;
    this._events = eventsApi(offApi, this._events, name, callback, {
        context: context,
        listeners: this._listeners
    });
    return this;
  };

  // Tell this object to stop listening to either specific events ... or
  // to every object it's currently listening to.
  Events.stopListening =  function(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;

    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

    for (var i = 0; i < ids.length; i++) {
      var listening = listeningTo[ids[i]];

      // If listening doesn't exist, this object is not currently
      // listening to obj. Break out early.
      if (!listening) break;

      listening.obj.off(name, callback, this);
    }
    if (_.isEmpty(listeningTo)) this._listeningTo = void 0;

    return this;
  };

  // The reducing API that removes a callback from the `events` object.
  var offApi = function(events, name, callback, options) {
    if (!events) return;

    var i = 0, listening;
    var context = options.context, listeners = options.listeners;

    // Delete all events listeners and "drop" events.
    if (!name && !callback && !context) {
      var ids = _.keys(listeners);
      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }
      return;
    }

    var names = name ? [name] : _.keys(events);
    for (; i < names.length; i++) {
      name = names[i];
      var handlers = events[name];

      // Bail out if there are no events stored.
      if (!handlers) break;

      // Replace events if there are any remaining.  Otherwise, clean up.
      var remaining = [];
      for (var j = 0; j < handlers.length; j++) {
        var handler = handlers[j];
        if (
          callback && callback !== handler.callback &&
            callback !== handler.callback._callback ||
              context && context !== handler.context
        ) {
          remaining.push(handler);
        } else {
          listening = handler.listening;
          if (listening && --listening.count === 0) {
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
          }
        }
      }

      // Update tail event if the list has any events.  Otherwise, clean up.
      if (remaining.length) {
        events[name] = remaining;
      } else {
        delete events[name];
      }
    }
    if (_.size(events)) return events;
  };

  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, its listener will be removed. If multiple events
  // are passed in using the space-separated syntax, the handler will fire
  // once for each event, not once for a combination of all events.
  Events.once =  function(name, callback, context) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    return this.on(events, void 0, context);
  };

  // Inversion-of-control versions of `once`.
  Events.listenToOnce =  function(obj, name, callback) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
  };

  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
  // `offer` unbinds the `onceWrapper` after it has been called.
  var onceMap = function(map, name, callback, offer) {
    if (callback) {
      var once = map[name] = _.once(function() {
        offer(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
    }
    return map;
  };

  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  Events.trigger =  function(name) {
    if (!this._events) return this;

    var length = Math.max(0, arguments.length - 1);
    var args = Array(length);
    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

    eventsApi(triggerApi, this._events, name, void 0, args);
    return this;
  };

  // Handles triggering the appropriate event callbacks.
  var triggerApi = function(objEvents, name, cb, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // The prefix is used to create the client id which is used to identify models locally.
    // You may want to override this if you're experiencing name clashes with model ids.
    cidPrefix: 'c',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Special-cased proxy to underscore's `_.matches` method.
    matches: function(attrs) {
      return !!_.iteratee(attrs, this)(this.attributes);
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      var unset      = options.unset;
      var silent     = options.silent;
      var changes    = [];
      var changing   = this._changing;
      this._changing = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }

      var current = this.attributes;
      var changed = this.changed;
      var prev    = this._previousAttributes;

      // For each `set` attribute, update or delete the current value.
      for (var attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          changed[attr] = val;
        } else {
          delete changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Update the `id`.
      this.id = this.get(this.idAttribute);

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0; i < changes.length; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      var changed = {};
      for (var attr in diff) {
        var val = diff[attr];
        if (_.isEqual(old[attr], val)) continue;
        changed[attr] = val;
      }
      return _.size(changed) ? changed : false;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server, merging the response with the model's
    // local attributes. Any changed attributes will trigger a "change" event.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (!model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true, parse: true}, options);
      var wait = options.wait;

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      var attributes = this.attributes;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
        if (serverAttrs && !model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      // Set temporary attributes if `{wait: true}` to properly find new ids.
      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch' && !options.attrs) options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // Restore attributes.
      this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      var wait = options.wait;

      var destroy = function() {
        model.stopListening();
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (wait) destroy();
        if (success) success.call(options.context, model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      var xhr = false;
      if (this.isNew()) {
        _.defer(options.success);
      } else {
        wrapError(this, options);
        xhr = this.sync('delete', this, options);
      }
      if (!wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      var id = this.get(this.idAttribute);
      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.defaults({validate: true}, options));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model, mapped to the
  // number of arguments they take.
  var modelMethods = { keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
      omit: 0, chain: 1, isEmpty: 1 };

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  addUnderscoreMethods(Model, modelMethods, 'attributes');

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analogous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Splices `insert` into `array` at index `at`.
  var splice = function(array, insert, at) {
    var tail = Array(array.length - at);
    var length = insert.length;
    for (var i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model) { return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set. `models` may be Backbone
    // Models or raw JavaScript objects to be converted to Models, or any
    // combination of the two.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      options = _.extend({}, options);
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      var removed = this._removeModels(models, options);
      if (!options.silent && removed) this.trigger('update', this, options);
      return singular ? removed[0] : removed;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      if (models == null) return;

      options = _.defaults({}, options, setOptions);
      if (options.parse && !this._isModel(models)) models = this.parse(models, options);

      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();

      var at = options.at;
      if (at != null) at = +at;
      if (at < 0) at += this.length + 1;

      var set = [];
      var toAdd = [];
      var toRemove = [];
      var modelMap = {};

      var add = options.add;
      var merge = options.merge;
      var remove = options.remove;

      var sort = false;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      var model;
      for (var i = 0; i < models.length; i++) {
        model = models[i];

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        var existing = this.get(model);
        if (existing) {
          if (merge && model !== existing) {
            var attrs = this._isModel(model) ? model.attributes : model;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
          }
          if (!modelMap[existing.cid]) {
            modelMap[existing.cid] = true;
            set.push(existing);
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(model, options);
          if (model) {
            toAdd.push(model);
            this._addReference(model, options);
            modelMap[model.cid] = true;
            set.push(model);
          }
        }
      }

      // Remove stale models.
      if (remove) {
        for (i = 0; i < this.length; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) toRemove.push(model);
        }
        if (toRemove.length) this._removeModels(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      var orderChanged = false;
      var replace = !sortable && add && remove;
      if (set.length && replace) {
        orderChanged = this.length != set.length || _.some(this.models, function(model, index) {
          return model !== set[index];
        });
        this.models.length = 0;
        splice(this.models, set, 0);
        this.length = this.models.length;
      } else if (toAdd.length) {
        if (sortable) sort = true;
        splice(this.models, toAdd, at == null ? this.length : at);
        this.length = this.models.length;
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0; i < toAdd.length; i++) {
          if (at != null) options.index = at + i;
          model = toAdd[i];
          model.trigger('add', model, this, options);
        }
        if (sort || orderChanged) this.trigger('sort', this, options);
        if (toAdd.length || toRemove.length) this.trigger('update', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options = options ? _.clone(options) : {};
      for (var i = 0; i < this.models.length; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      return this.remove(model, options);
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      return this.remove(model, options);
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      var id = this.modelId(this._isModel(obj) ? obj.attributes : obj);
      return this._byId[obj] || this._byId[id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      if (index < 0) index += this.length;
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      return this[first ? 'find' : 'filter'](attrs);
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      var comparator = this.comparator;
      if (!comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      var length = comparator.length;
      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

      // Run sort based on type of `comparator`.
      if (length === 1 || _.isString(comparator)) {
        this.models = this.sortBy(comparator);
      } else {
        this.models.sort(comparator);
      }
      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success.call(options.context, collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      var wait = options.wait;
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp, callbackOpts) {
        if (wait) collection.add(model, callbackOpts);
        if (success) success.call(callbackOpts.context, model, resp, callbackOpts);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator
      });
    },

    // Define how to uniquely identify models in the collection.
    modelId: function (attrs) {
      return attrs[this.model.prototype.idAttribute || 'id'];
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (this._isModel(attrs)) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method called by both remove and set.
    _removeModels: function(models, options) {
      var removed = [];
      for (var i = 0; i < models.length; i++) {
        var model = this.get(models[i]);
        if (!model) continue;

        var index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;

        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }

        removed.push(model);
        this._removeReference(model, options);
      }
      return removed.length ? removed : false;
    },

    // Method for checking whether an object should be considered a model for
    // the purposes of adding to the collection.
    _isModel: function (model) {
      return model instanceof Model;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      var id = this.modelId(model.attributes);
      if (id != null) this._byId[id] = model;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      delete this._byId[model.cid];
      var id = this.modelId(model.attributes);
      if (id != null) delete this._byId[id];
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (event === 'change') {
        var prevId = this.modelId(model.previousAttributes());
        var id = this.modelId(model.attributes);
        if (prevId !== id) {
          if (prevId != null) delete this._byId[prevId];
          if (id != null) this._byId[id] = model;
        }
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var collectionMethods = { forEach: 3, each: 3, map: 3, collect: 3, reduce: 4,
      foldl: 4, inject: 4, reduceRight: 4, foldr: 4, find: 3, detect: 3, filter: 3,
      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
      sortBy: 3, indexBy: 3};

  // Mix in each Underscore method as a proxy to `Collection#models`.
  addUnderscoreMethods(Collection, collectionMethods, 'models');

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surroundi