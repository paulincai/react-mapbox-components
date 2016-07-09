'use strict';

/**
 * Base code came from
 * https://raw.githubusercontent.com/PaulLeCam/react-leaflet/master/src/Map.js
 * adapted to Mapbox
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodashLangIsArray = require('lodash/lang/isArray');

var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);

var _lodashUtilityUniqueId = require('lodash/utility/uniqueId');

var _lodashUtilityUniqueId2 = _interopRequireDefault(_lodashUtilityUniqueId);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _reactLeaflet = require('react-leaflet');

var _reactLeafletLibTypesBounds = require('react-leaflet/lib/types/bounds');

var _reactLeafletLibTypesBounds2 = _interopRequireDefault(_reactLeafletLibTypesBounds);

var _reactLeafletLibTypesLatlng = require('react-leaflet/lib/types/latlng');

var _reactLeafletLibTypesLatlng2 = _interopRequireDefault(_reactLeafletLibTypesLatlng);

var normalizeCenter = function normalizeCenter(pos) {
  return (0, _lodashLangIsArray2['default'])(pos) ? pos : [pos.lat, pos.lng || pos.lon];
};

/**
 * Creates an instance of a Mapbox map. See [here](https://www.mapbox.com/mapbox.js/api/v2.2.1/l-mapbox-map/) for more details.
 *
 * *Note:* The props documentation is incomplete. You can feed any of the map `options` into the `props` directly.
 *
 * Example: `<Mapbox gridLayer={{ ... }} />`
 *
 * Leaflet events start with `onLeaflet` eg `<Mapbox onLeafletMoveend={Fn} />`
 *
 * You can access the instance of the Mapbox/Leaflet map by assigning a `ref` to the component and calling `getMap()`:
 *
 * `this.refs[<ref_name>].getMap()`
 */

var _default = (function (_MapComponent) {
  _inherits(_default, _MapComponent);

  _createClass(_default, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        map: this.leafletElement
      };
    }
  }], [{
    key: 'displayName',
    value: 'MapboxMap',
    enumerable: true
  }, {
    key: 'styleguide',
    value: {
      index: '1.1',
      category: 'Mapbox',
      title: 'Mapbox',
      code: '\nvar Mapbox = require(\'react-mapbox-components\').Map\n\n<Mapbox mapboxAccessToken=\'String\'></Mapbox>'
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      /**
       * Mapbox access token
       */
      accessToken: _react.PropTypes.string.isRequired,
      /**
       * id of the map. If not specified, a unique id is created
       */
      id: _react.PropTypes.string,
      /**
       * can be
       *  - A map id string examples.map-foo
       *  - A comma separated list of map id strings examples.map-foo,examples.map-bar example
       *  - A URL to TileJSON, like https://api.mapbox.com/v3/mapbox.dark.json
       *  - A TileJSON object, from your own Javascript code
       */
      tileId: _react.PropTypes.string,
      /**
       * `react-leaflet/lib/types/latlng` Initial geographical center of the map
       */
      center: _reactLeafletLibTypesLatlng2['default'],
      /**
       * `react-leaflet/lib/types/bounds` When this option is set, the map restricts the view to the given geographical bounds, bouncing the user back when he tries to pan outside the view.
       */
      maxBounds: _reactLeafletLibTypesBounds2['default'],
      /**
       * Initial map zoom
       */
      zoom: _react.PropTypes.number,
      /**
       * Maximum zoom level of the map. This overrides any maxZoom set on map layers.
       */
      maxZoom: _react.PropTypes.number,
      /**
       * Minimum zoom level of the map. Overrides any minZoom set on map layers.
       */
      minZoom: _react.PropTypes.number,
      /**
       * classname to apply to the element
       */
      className: _react.PropTypes.string,
      /**
       * additional user-defined radium styles to apply
       */
      styles: _react.PropTypes.object,
      children: _react.PropTypes.any
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      tileId: 'mapbox.streets',
      styles: {
        width: '100%',
        height: '100%'
      }
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      map: _react.PropTypes.instanceOf(_leaflet2['default'].Map)
    },
    enumerable: true
  }]);

  function _default(props, context) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props, context);
    this.state = {
      id: props.id || (0, _lodashUtilityUniqueId2['default'])('map')
    };
  }

  _createClass(_default, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      _leaflet2['default'].mapbox.accessToken = this.props.accessToken;

      this.leafletElement = _leaflet2['default'].mapbox.map(_reactDom2['default'].findDOMNode(this), this.props.tileId, this.props);
      _get(Object.getPrototypeOf(_default.prototype), 'componentDidMount', this).call(this);
      this.forceUpdate();
    }
  }, {
    key: 'shouldUpdateCenter',
    value: function shouldUpdateCenter(next, prev) {
      if (!prev) {
        return true;
      }
      next = normalizeCenter(next);
      prev = normalizeCenter(prev);
      return next[0] !== prev[0] || next[1] !== prev[1];
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props;
      var center = _props.center;
      var zoom = _props.zoom;

      if (center && this.shouldUpdateCenter(center, prevProps.center)) {
        this.leafletElement.setView(center, zoom, { animate: false });
      } else if (zoom && zoom !== prevProps.zoom) {
        this.leafletElement.setZoom(zoom);
      }
    }
  }, {
    key: 'getMap',
    value: function getMap() {
      return this.leafletElement;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(_default.prototype), 'componentWillUnmount', this).call(this);
      this.leafletElement.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      var map = this.leafletElement;
      var children = map ? _react2['default'].Children.map(this.props.children, function (child) {
        return child ? _react2['default'].cloneElement(child, { map: map }) : null;
      }) : null;

      return _react2['default'].createElement(
        'div',
        { className: this.props.className, id: this.state.id, style: this.props.styles },
        children
      );
    }
  }]);

  return _default;
})(_reactLeaflet.MapComponent);

exports['default'] = _default;
module.exports = exports['default'];
