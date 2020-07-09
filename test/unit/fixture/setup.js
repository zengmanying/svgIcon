import Vue from 'vue'
import 'babel-polyfill'

window.APP_CONF = {
  baseURL: {}
}

Vue.config.productionTip = false

/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

const testContext = require.context('../spec', true, /\.js$/)
testContext.keys().forEach(testContext)

const srcContext = require.context('../../../src', true, /\/\w\.js$/)
srcContext.keys().forEach(srcContext)
