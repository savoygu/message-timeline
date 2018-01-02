const gulp = require('gulp')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const nodemon = require('gulp-nodemon')

gulp.task('nodemon', function () {
  nodemon({
    script: 'app.js',
    env: {
      NODE_ENV: 'development'
    }
  })
})

gulp.task('server', ['nodemon'], function () {
  const files = [
    'app/views/**/*.pug',
    'app/**/*.js',
    'app.js',
    'config/*.js'
  ]

  browserSync.init({
    proxy: 'http://127.0.0.1:3001',
    files: files,
    // browser: 'chrome',
    notify: false,
    port: 5000,
    ui: {
      port: 5001
    }
  })

  gulp.watch(files).on('change', reload)
})
