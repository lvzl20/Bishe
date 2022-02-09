// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store/store.js'
import ElementUI from 'element-ui'
import { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import { Message } from 'element-ui';
import strToBase64 from './plugin/strToBase64'
import myCrypto from "./plugin/myCrypto"
document.title = '计算机科学与技术学院图书系统'
Vue.config.productionTip = false

Vue.use(strToBase64)
Vue.use(myCrypto)
Vue.use(ElementUI)

// 设置默认请求头
Axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
Axios.defaults.baseURL = 'http://127.0.0.1:5000';
// Axios.defaults.baseURL = 'http://175.24.66.250:5001';
Axios.defaults.timeout = 1000 * 10;

Vue.prototype.$axios = Axios

function showMsg(msg, type = "info") {
  Message({
    message: msg,
    center: true,
    type: type,
    duration: "1500",
  })
}

Axios.interceptors.request.use(
  (config) => {
    // 如果存在token,给请求头添加token信息
    if (sessionStorage.getItem("token")) {
      config.headers.Authorization =
        "Bearer " + sessionStorage.getItem("token");
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
// 使用拦截器对token过期作出响应;
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 这个是处理响应失败的，也就是响应错误的，在这个箭头函数中，才能拿到401状态下的包
    if (error && error.response) {
      switch (error.response.status) {
        case 400: showMsg("请求错误(400)", "error"); break;
        case 401:
          sessionStorage.removeItem("token");
          showMsg("登录失效,请重新登录(401)");
          store.commit("loginOut");
          // 清空历史栈
          let backlen = history.length - 1;
          history.go(-backlen);
          router.replace("/login"); break;
        case 403: showMsg("拒绝访问(403)", "error"); break;
        case 404: showMsg("请求出错(404)", "error"); break;
        case 408: showMsg("请求超时(408)", "error"); break;
        case 500: showMsg("服务器错误(500)", "error"); break;
        case 501: showMsg("服务未实现(501)", "error"); break;
        case 502: showMsg("网络错误(502)", "error"); break;
        case 503: showMsg("网络不可用(503)", "error"); break;
        case 504: showMsg("网络超时(504)", "error"); break;
        case 505: showMsg("HTTP版本不受支持(505)", "error"); break;
        default: showMsg(`连接出错(${error.response.status})`, "error"); break;
      }
    } else {
      showMsg('连接服务器失败', "error");
      // error.message = '连接服务器失败!'
    }
    return Promise.reject(error);
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
