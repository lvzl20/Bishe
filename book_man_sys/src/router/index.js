import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import('@/components/HelloWorld')
const Studenttest = () => import('@/components/Studenttest')
const Admintest = () => import('@/components/Admintest')
const Teachertest = () => import('@/components/Teachertest')
const Login = () => import('@/components/Login')
const NotFound = () => import('@/components/NotFound')
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
      component: HelloWorld,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/studenttest',
      name: 'Studenttest',
      component: Studenttest,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/admintest',
      name: 'Admintest',
      component: Admintest,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/teachertest',
      name: 'Teachertest',
      component: Teachertest
      ,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/notfound',
      name: 'Notfound',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/notfound' // 如果页面不存在,重定向到404页面
    }
  ]
})
// 路由导航router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  // 有token的时候
  if (token) {
    next()

  } else {
    // 需要登录权限的页面没有token进入登录页面
    if (to.meta.needLogin || to.path === './login') {
      next('./login')
    } else if (to.path === './notfound') {
      next()
    }
    next();
  }

})
export default router;