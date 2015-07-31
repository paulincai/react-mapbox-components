const Radium = require('radium')
const Geocoder = require('./geocoder-control.jsx')

//Hack that allows react-docgen to work with Radium at the same time
//docgen looks for createClass on the export, so we leave the component def in the jsx
//and wrap radium here to get docgen to work
module.exports = Radium(Geocoder)
