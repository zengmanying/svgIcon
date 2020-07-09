/**
 * @file 本文件为服务调用插件实现
 * @author PRD UX R&D Dept.
 * @example <caption>简单用法</caption>
 * import http from './http'
 * http.$http.get('/foo/login').then((response) => {
 *   if (response.status === 200) {
 *     console.log(`response.data=${response.data}`)
 *   }
 * })
 */

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { TMessage, TGlobalLoading } from 'aid-taurus-desktop'
import config from './conf/axios.config.js'
/* eslint no-useless-escape: "off" */
/* eslint no-prototype-builtins: "off" */

/**
 * 深度合并多个对象，返回合并后的新对象
 * @private
 * @param  {...Object} objs 多个对象
 * @return {Object}    返回合并后的新对象，原对象内容不变
 */
function merge(...objs) {
  let result = {}

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val)
    } else {
      result[key] = val
    }
  }

  for (let obj of objs) {
    for (let key in obj) {
      assignValue(obj[key], key)
    }
  }
  return result
}

/**
 * 判断给定参数是否`null`或空对象`{}`
 * @private
 * @param  {Object}  obj 待检测对象
 * @return {Boolean}  如果参数`obj`是`null`或空对象`{}`，那么返回`true`，否则返回`false`
 */
function isOwnEmpty(obj) {
  for (let name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false // 返回false，不为空对象
    }
  }
  return true // 返回true，为空对象
}

const http = getInstances(config)

/**
 * 获得服务调用对象实例
 * @private
 * @param  {Object} conf `assets/axios.config.js`内定义的配置对象
 * @return {Object} 返回一个根据`assets/axios.config.js`配置文件生
 *                  成的服务调用对象集合
 */
function getInstances(conf) {
  let result = {}
  let domains = conf.root || null
  let commonConfig = conf.commonConfig ? conf.commonConfig : {}

  // axios.defaults = merge(axios.defaults, commonConfig)
  let opts = merge(axios.defaults, commonConfig)
  for (let ky in opts) {
    axios.defaults[ky] = opts[ky]
  }
  result.$http = axios
  if (!isOwnEmpty(domains)) {
    for (let key in domains) {
      key = key.trim()
      if (key !== '' && key !== 'http') { // 忽略以"http"为属性名的节点
        let instance = axios.create(domains[key])
        let domainName = `\$${key}`
        // 为每一个实例添加上axios的静态方法
        instance.all = (promises) => {
          return axios.all(promises)
        }
        instance.spread = (cb) => {
          return axios.spread(cb)
        }
        instance.Cancel = () => {
          return axios.Cancel
        }
        instance.CancelToken = () => {
          return axios.CancelToken
        }
        instance.isCancel = () => {
          return axios.isCancel
        }
        result[domainName] = instance
      }
    }
  }
  return result
}

// 定义插件
const HttpPlugin = {
  install: (Vue) => {
    if (http === null) {
      Vue.prototype.$http = axios
    } else {
      for (let domainName in http) {
        Vue.prototype[domainName] = http[domainName]
      }
    }
  }
}

/**
 * 请求拦截器
 * @param {Object} config `axios`配置对象
 * @returns {Object|Promise} 返回配置对象本身或者返回一个Promise对象，
 *                           参见{@link https://github.com/axios/axios Axios}官网
 */
function requestInterceptor(config) {
  // 将post方法的content-type 设置为 application/x-www-form-urlencoded
  if (config.method === 'post') {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    config.data = qs.stringify(config.data)
  }
  TGlobalLoading.start()
  return config
}

/**
 * 请求错误处理
 * @param error
 * @returns {Promise} 返回一个Promise对象
 */
function requestError(error) {
  TMessage.danger(error) // 提示错误
  TGlobalLoading.error()
  return Promise.reject(error)
}

/**
 * 响应拦截器
 * @param {Object} response `Axios`响应对象
 * @returns {Object|Promise} 返回`Axios`响应对象或Promise对象
 */
function responseInterceptor(response) {
  TGlobalLoading.finish()
  return response
}

/**
 * 响应错误处理
 * @param {Object} error `Axios`错误对象
 * @returns {Promise} 返回Promise对象
 * @example <caption>对服务返回的错误码做处理</caption>
 * if (error.response) {
 *   switch (error.response.status) {
 *     case 401: // 当前请求需要用户验证
 *       router.replace({
 *         path: 'login',
 *         query: { redirect: router.currentRoute.fullPath },
 *       })
 *       break
 *   }
 * }
 */
function responseError(error) {
  TGlobalLoading.error()
  return Promise.reject(error)
}

// 默认服务调用拦截器设置
http.$http.interceptors.request.use(requestInterceptor, requestError)
http.$http.interceptors.response.use(responseInterceptor, responseError)

// 注册插件
Vue.use(HttpPlugin)

export default http
