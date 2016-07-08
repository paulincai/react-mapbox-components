'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('mapbox.js');

var _geocoderGeocoderControlJsx = require('./geocoder/geocoder-control.jsx');

var _geocoderGeocoderControlJsx2 = _interopRequireDefault(_geocoderGeocoderControlJsx);

var _mapMapboxBaseJsx = require('./map/mapbox-base.jsx');

var _mapMapboxBaseJsx2 = _interopRequireDefault(_mapMapboxBaseJsx);

exports['default'] = {
  Geocoder: _geocoderGeocoderControlJsx2['default'],
  Map: _mapMapboxBaseJsx2['default']
};
module.exports = exports['default'];
