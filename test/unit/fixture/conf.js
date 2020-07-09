let { resolve } = require('path')
let webpackConf = {
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
module.exports = {
  browsers: ['ChromeHeadless'],
  webpack: webpackConf
}
