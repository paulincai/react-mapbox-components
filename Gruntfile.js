module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig()

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('react-baseplate')

  grunt.config.merge({
    //Include mapbox into the styleguide
    'react-styleguide': {
      options: {
        configFile: {
          files: [
            '//api.mapbox.com/mapbox.js/v2.2.1/mapbox.css'
          ]
        }
      }
    }
  })

}
