'use strict'
const config = require('./config')

const React = require('react')
const Mapbox = require('../src/index').Map
const xtend = require('xtend')

const MapboxExample = React.createClass({
  displayName: 'MapboxExample',
  statics: {
    styleguide: xtend(Mapbox.styleguide, {
      exampleComponent: Mapbox,
      examples: []
    })
  },
  render() {
    return (
      <div style={{ width: '500px', height: '400px' }}>
        <Mapbox accessToken={config.mapboxAccessToken} />
      </div>
    )
  }
})

module.exports = MapboxExample
