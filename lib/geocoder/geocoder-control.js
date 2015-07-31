'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodashObjectAssign = require('lodash/object/assign');

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _default = (function (_MapComponent) {
  _inherits(_default, _MapComponent);

  _createClass(_default, null, [{
    key: 'displayName',
    value: 'MapboxGeocoder',
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      /**
       * Either a
       * - An geocoder index ID, e.g. mapbox.places
       * - A geocoder API URL, like https://api.mapbox.com/v4/geocode/mapbox.places/{query}.json
       */
      geocoderIdx: _react2['default'].PropTypes.string,
      /**
       * `L.mapbox.geocoderControl` options
       */
      options: _react2['default'].PropTypes.object,
      map: _react2['default'].PropTypes.object,
      children: _react2['default'].PropTypes.element

    },
    enumerable: true
  }, {
    key: 'styleguide',
    value: {
      index: '1.2',
      category: 'Mapbox',
      title: 'Geocoder',
      description: 'Creates an instance of a Mapbox Geocoder. See [here](https://www.mapbox.com/mapbox.js/api/v2.2.1/l-mapbox-geocodercontrol/#section-l-mapbox-geocodercontrol) for more details.',
      code: '\nvar Mapbox = require(\'react-mapbox-components\').Map\nvar Geocoder = require(\'react-mapbox-components\').Geocoder\n\n<Mapbox>\n  <Geocoder />\n</Mapbox>\n'
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      geocoderIdx: 'mapbox.places',
      options: {}
    },
    enumerable: true
  }]);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    this.geocoder = null;
  }

  _createClass(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(_default.prototype), 'componentDidMount', this).call(this);
      this.geocoder = _leaflet2['default'].mapbox.geocoderControl(this.props.geocoderIdx, this.props.options);
      this.props.map.addControl(this.geocoder);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(_default.prototype), 'componentWillUnmount', this).call(this);
      this.props.map.removeControl(this.geocoder);
    }
  }, {
    key: 'getClonedChildrenWithMap',
    value: function getClonedChildrenWithMap(extra) {
      var _props = this.props;
      var children = _props.children;
      var map = _props.map;

      var props = (0, _lodashObjectAssign2['default'])({ map: map }, extra);

      return _react2['default'].Children.map(children, function (child) {
        return child ? _react2['default'].cloneElement(child, props) : null;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return _default;
})(_reactLeaflet.MapComponent);

exports['default'] = _default;
module.exports = exports['default'];
