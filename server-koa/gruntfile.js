module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      js: {
        files: ['**/*.js'],
        // tasks: ['jshint'],
        options: {
          nospawn: true,
          interrupt: false,
          debounceDelay: 250
          // livereload: true
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchFolders: ['./'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')

  grunt.option('force', true)
  grunt.registerTask('default', ['concurrent'])
}
