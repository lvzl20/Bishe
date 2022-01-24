// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import strToBase64 from './plugin/strToBase64'
import Utils from "./plugin/utils";
document.title = '计算机科学与技术学院图书系统'
Vue.config.productionTip = false

Vue.use(strToBase64)
Vue.use(Utils)
Vue.use(ElementUI)

// 设置默认请求头
Axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
Axios.defaults.baseURL = 'http://127.0.0.1:5000';
Vue.prototype.$axios = Axios





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
