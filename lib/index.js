'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('mapbox.js');

var _geocoder = require('./geocoder');

var _geocoder2 = _interopRequireDefault(_geocoder);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

exports['default'] = {
  Geocoder: _geocoder2['default'],
  Map: _map2['default']
};
module.exports = exports['default'];
