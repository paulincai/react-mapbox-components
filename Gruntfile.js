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
            process.cwd() + '/src/vendor/mapbox.css'
          ]
        }
      }
    }
  })

}
