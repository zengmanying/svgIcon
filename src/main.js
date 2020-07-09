/**
 * @file 本文件实现了应用初始化逻辑
 * @author PRD UX R&D Dept.
 */

// 引入第三方库
import 'babel-polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'

// 引入Taurus库
import taurus from 'aid-taurus-desktop'

import './components/icon'

import store from './store'
import frame from './frame.vue'
import i18nManager from './i18n'
import router from './router'

// 安装组件库插件
Vue.use(taurus, {
  local: i18nManager.language,
  i18n: (path, options) => {
    let value = i18nManager.i18n.t(path, options)
    if (value !== null && value !== undefined) return value
    return ''
  }
})

// 将路由状态同步到store中
sync(store, router)

// 创建应用根组件
const app = new Vue({
  store,
  router,
  i18n: i18nManager.i18n,
  render(h) {
    return h(frame)
  }
})

// webpack热更新支持
if (module.hot) {
  module.hot.accept()
}

// 将DOM结构注入页面
app.$mount('#app')
