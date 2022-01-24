import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import('@/components/HelloWorld')
const Studenttest = () => import('@/components/Studenttest')
const Admintest = () => import('@/components/Admintest')
const Teachertest = () => import('@/components/Teachertest')
const Login = () => import('@/components/Login')
// import Admintest from '@/components/Admintest'
// import Teachertest from '@/components/Teachertest'
// import Login from '@/components/Login'

Vue.use(Router)
const originalPush = Router.prototype.push
//修改原型对象中的push方法,解决路由重复。
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/studenttest',
      name: 'Studenttest',
      component: Studenttest
    },
    {
      path: '/admintest',
      name: 'Admintest',
      component: Admintest
    },
    {
      path: '/teachertest',
      name: 'Teachertest',
      component: Teachertest
    }
  ]
})
// 路由导航router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  // 去登录页面就直接去,并清除sessionStorage
  if (to.path === '/login') {
    sessionStorage.clear()
    next()
  } else {
    let token = sessionStorage.getItem('token');
    // 如果token没有代表用户没有登录
    if (token === undefined || token === '' || token === null) {
      next('/login');
    } else {
      next();
    }
  }
})
export default router;