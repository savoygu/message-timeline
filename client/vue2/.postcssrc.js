// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  // "plugins": {
  //   // to edit target browsers: use "browserslist" field in package.json
  //   "autoprefixer": {}
  // }
  "plugins": [
    require('postcss-salad')(require('./build/salad.config.json'))
  ]
}
