import assign from 'lodash/object/assign'
import React from 'react'
import { MapComponent } from 'react-leaflet'
import L from 'leaflet'

/**
 *  Creates an instance of a Mapbox Geocoder. See [here](https://www.mapbox.com/mapbox.js/api/v2.2.1/l-mapbox-geocodercontrol/#section-l-mapbox-geocodercontrol) for more details.
 *
 * You can access the instance of the Mapbox geocoder by assigning a `ref` to the parent `Mapbox` component:
 *
 * `this.refs[<map_ref_name>].geocoder`
 *
 * This is available after the Geocoder has mounted.
 */
export default class extends MapComponent {

  static displayName = 'MapboxGeocoder'

  static propTypes = {
    /**
     * Either a
     * - An geocoder index ID, e.g. mapbox.places
     * - A geocoder API URL, like https://api.mapbox.com/v4/geocode/mapbox.places/{query}.json
     */
    geocoderIdx: React.PropTypes.string,
    /**
     * `L.mapbox.geocoderControl` options
     */
    options: React.PropTypes.object,
    /**
     * Success in finding a location. The event's results property contains the raw results
     */
    onFound: React.PropTypes.func,
    /**
     * Failure to find a location. The event's error property contains the raw HTTP error.
     */
    onError: React.PropTypes.func,
    /**
     * Fired when the user selects a location from a list of options returned from a geocoding request. The event's feature property contains the selected GeoJSON Feature.
     */
    onSelect: React.PropTypes.func,
    /**
     * Fired when the control automatically selects the first result of a query that returns only one result, and repositions the map accordingly. The event's feature property contains the selected GeoJSON feature.
     */
    onAutoselect: React.PropTypes.func,
    /**
     * Automatically passed through from the parent Mapbox component
     */
    map: React.PropTypes.object,
    children: React.PropTypes.element

  }

  static styleguide = {
    index: '1.2',
    category: 'Mapbox',
    title: 'Geocoder',
    code: `
var Mapbox = require('react-mapbox-components').Map
var Geocoder = require('react-mapbox-components').Geocoder

<Mapbox>
  <Geocoder />
</Mapbox>
`
  }


  static defaultProps = {
    geocoderIdx: 'mapbox.places',
    options: {},
    onFound: function() {},
    onError: function() {},
    onSelect: function() {},
    onAutoselect: function() {}
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    super.componentWillMount()

    let geocoder = L.mapbox.geocoderControl(this.props.geocoderIdx, this.props.options)
    this.props.map.geocoder = geocoder
    this.props.map.addControl(this.props.map.geocoder)

    geocoder.on('found', this.props.onFound)
    geocoder.on('error', this.props.onError)
    geocoder.on('select', this.props.onSelect)
    geocoder.on('autoselect', this.props.onAutoselect)

  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.map.removeControl(this.props.map.geocoder)
  }

  getClonedChildrenWithMap(extra) {
    const { children, map } = this.props
    const props = assign({map}, extra)

    return React.Children.map(children, child => {
      return child ? React.cloneElement(child, props) : null
    })
  }

  render() {
    return null
  }
}

