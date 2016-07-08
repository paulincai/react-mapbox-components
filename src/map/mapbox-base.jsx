'use strict'

/**
 * Base code came from
 * https://raw.githubusercontent.com/PaulLeCam/react-leaflet/master/src/Map.js
 * adapted to Mapbox
 */

import isArray from 'lodash/lang/isArray'
import uniqueId from 'lodash/utility/uniqueId'

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import L from 'leaflet'
import { MapComponent } from 'react-leaflet'

import boundsType from 'react-leaflet/lib/types/bounds'
import latlngType from 'react-leaflet/lib/types/latlng'

const normalizeCenter = pos => isArray(pos) ? pos : [pos.lat, pos.lng || pos.lon]

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
export default class extends MapComponent {

  static displayName = 'MapboxMap'

  static styleguide = {
    index: '1.1',
    category: 'Mapbox',
    title: 'Mapbox',
    code: `
var Mapbox = require('react-mapbox-components').Map

<Mapbox mapboxAccessToken='String'></Mapbox>`
  }

  static propTypes = {
    /**
     * Mapbox access token
     */
    accessToken: PropTypes.string.isRequired,
    /**
     * id of the map. If not specified, a unique id is created
     */
    id: PropTypes.string,
    /**
     * can be
     *  - A map id string examples.map-foo
     *  - A comma separated list of map id strings examples.map-foo,examples.map-bar example
     *  - A URL to TileJSON, like https://api.mapbox.com/v3/mapbox.dark.json
     *  - A TileJSON object, from your own Javascript code
     */
    tileId: PropTypes.string,
    /**
     * `react-leaflet/lib/types/latlng` Initial geographical center of the map
     */
    center: latlngType,
    /**
     * `react-leaflet/lib/types/bounds` When this option is set, the map restricts the view to the given geographical bounds, bouncing the user back when he tries to pan outside the view.
     */
    maxBounds: boundsType,
    /**
     * Initial map zoom
     */
    zoom: PropTypes.number,
    /**
     * Maximum zoom level of the map. This overrides any maxZoom set on map layers.
     */
    maxZoom: PropTypes.number,
    /**
     * Minimum zoom level of the map. Overrides any minZoom set on map layers.
     */
    minZoom: PropTypes.number,
    /**
     * classname to apply to the element
     */
    className: PropTypes.string,
    /**
     * additional user-defined radium styles to apply
     */
    styles: PropTypes.object,
    children: PropTypes.any
  }

  static defaultProps = {
    tileId: 'mapbox.streets',
    styles: {
      width: '100%',
      height: '100%'
    }
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      id: props.id || uniqueId('map')
    }
  }

  componentDidMount() {

    L.mapbox.accessToken = this.props.accessToken

    this.leafletElement = L.mapbox.map(ReactDOM.findDOMNode(this), this.props.tileId, this.props)
    super.componentDidMount()
    this.forceUpdate()
  }

  shouldUpdateCenter(next, prev) {
    if (!prev) { return true }
    next = normalizeCenter(next)
    prev = normalizeCenter(prev)
    return next[0] !== prev[0] || next[1] !== prev[1]
  }

  componentDidUpdate(prevProps) {
    const { center, zoom } = this.props
    if (center && this.shouldUpdateCenter(center, prevProps.center)) {
      this.leafletElement.setView(center, zoom, {animate: false})
    }
    else if (zoom && zoom !== prevProps.zoom) {
      this.leafletElement.setZoom(zoom)
    }
  }

  getMap() {
    return this.leafletElement
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.leafletElement.remove()
  }

  render() {
    const map = this.leafletElement
    const children = map ? React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child, {map}) : null
    }) : null

    return (
      <div className={this.props.className} id={this.state.id} style={this.props.styles}>
        {children}
      </div>
    )
  }
}