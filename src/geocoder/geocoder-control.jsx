import assign from 'lodash/object/assign'
import React from 'react'
import { MapComponent } from 'react-leaflet'
import L from 'leaflet'

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
    map: React.PropTypes.object,
    children: React.PropTypes.element

  }

  static styleguide = {
    index: '1.2',
    category: 'Mapbox',
    title: 'Geocoder',
    description: 'Creates an instance of a Mapbox Geocoder. See [here](https://www.mapbox.com/mapbox.js/api/v2.2.1/l-mapbox-geocodercontrol/#section-l-mapbox-geocodercontrol) for more details.',
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
    options: {}
  }

  constructor(props) {
    super(props)
    this.geocoder = null
  }

  componentDidMount() {
    super.componentDidMount()
    this.geocoder = L.mapbox.geocoderControl(this.props.geocoderIdx, this.props.options)
    this.props.map.addControl(this.geocoder)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.map.removeControl(this.geocoder)
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

