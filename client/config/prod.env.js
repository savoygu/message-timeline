'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: `"${process.env.VUE_APP_BASE_URL || 'http://localhost:3000/api/v1'}"`,
  IMG_URL: `"${process.env.VUE_APP_IMG_URL || '//img.mt.gusaifei.com'}"`
}
