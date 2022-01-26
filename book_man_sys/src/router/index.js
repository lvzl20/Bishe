import Vue from 'vue'
import Router from 'vue-router'
// import { component } from 'vue/types/umd'
const HelloWorld = () => import('@/components/HelloWorld')
const Student = () => import('@/components/Student')
const Admin = () => import('@/components/Admin')
const Teacher = () => import('@/components/Teacher')
const Login = () => import('@/components/Login')
const NotFound = () => import('@/components/NotFound')
const PersonalProfile = () => import('@/components/publicComponents/personal_profile')
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
      path: '/student',
      name: 'Student',
      component: Student,
      meta: {
        needLogin: true
      },
      children: [
        {
          path: 'personal_profile',
          name: 'PersonalProfile',
          component: PersonalProfile,
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher
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
  console.log("进入守卫")
  // 有token的时候
  if (token) {
    // 如果用户登录
    console.log(6)
    next()
  }
  else {
    // 需要登录权限的页面没有token进入登录页面
    if (to.meta.needLogin || to.path === './login') {
      console.log(to.meta.needLogin)
      console.log(2)
      next('./login')
    } else if (to.path === './notfound') {
      console.log(3)
      next()
    }
    console.log(4)
    next();
  }

})
export default router;