const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()

function startNodemon (done) {
  const STARTUP_TIMEOUT = 5000
  const server = nodemon({
    script: 'app.js',
    ext: 'js pug',
    // watch: ['app/**', 'config/**', 'public/js/**'],
    ignore: ['public/libs/**', 'node_modules/**'],
    // env: {
    //   NODE_ENV: 'development'
    // },
    stdout: false // without this line the stdout event won't fire
  })
  let starting = false

  const onReady = () => {
    starting = false
    done()
  }

  server.on('start', () => {
    starting = true
    setTimeout(onReady, STARTUP_TIMEOUT)
  })

  server.on('stdout', (stdout) => {
    process.stdout.write(stdout) // pass the stdout through
    if (starting) {
      onReady()
    }
  })
}

function startBrowserSync (done) {
  browserSync.init({
    proxy: 'http://localhost:3000',
    files: ['app.js', 'app/**/*.*', 'config/*.js', 'public/js/*.js'],
    browser: 'google chrome',
    port: 5000,
    reloadDelay: 1000
  }, done)
}

gulp.task('serve', gulp.series(startNodemon, startBrowserSync))
