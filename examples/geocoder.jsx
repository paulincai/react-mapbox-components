'use strict'

const config = require('./config')

const React = require('react')
const Mapbox = require('../src/index').Map
const Geocoder = require('../src/index').Geocoder
const xtend = require('xtend')

const GeoCoderExample = React.createClass({
  displayName: 'GeocoderExample',
  statics: {
    styleguide: xtend(Geocoder.styleguide, {
      exampleComponent: Geocoder,
      examples: []
    })
  },
  render() {
    return (
      <div style={{ width: '500px', height: '400px' }}>
        <Mapbox accessToken={config.mapboxAccessToken}>
          <Geocoder />
        </Mapbox>
      </div>
    )
  }
})

module.exports = GeoCoderExample
