import Vue from 'vue'
import Router from 'vue-router'
// import { component } from 'vue/types/umd'
const HelloWorld = () => import('@/components/HelloWorld')
// 学生相关组件
const Student = () => import('@/components/obj_student/Student')

// 教师相关组件
const Teacher = () => import('@/components/obj_teacher/Teacher')

// 管理员相关组件
const Admin = () => import('@/components/obj_admin/Admin')
const book_manage = () => import('@/components/obj_admin/Book_manage')

// 公共组件
const Login = () => import('@/components/Login')
const NotFound = () => import('@/components/NotFound')
const PersonalProfile = () => import('@/components/publicComponents/Personal_profile')
const Borrow = () => import('@/components/publicComponents/Borrow')

// import Admintest from '@/components/Admintest''

//修改原型对象中的push和replace方法,解决路由重复。
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.push
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(Router)

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
          name: 'PersonalProfile_student',
          component: PersonalProfile,
        },
        {
          path: 'borrow',
          name: 'Borrow_student',
          component: Borrow,
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        needLogin: true
      },
      children: [
        {
          path: 'personal_profile',
          name: 'PersonalProfile_admin',
          component: PersonalProfile,
        },
        {
          path: 'book_manage',
          name: 'Book_manage',
          component: book_manage,
        },
      ]
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher,
      meta: {
        needLogin: true
      },
      children: [
        {
          path: 'personal_profile',
          name: 'PersonalProfile_teacher',
          component: PersonalProfile,
        },
        {
          path: 'borrow',
          name: 'Borrow_teacher',
          component: Borrow,
        }
      ]
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
  // console.log("进入守卫")
  // 有token的时候
  if (token) {
    // 如果用户登录
    // console.log(6)
    next()
  }
  else {
    // 需要登录权限的页面没有token进入登录页面
    if (to.meta.needLogin || to.path === './login') {
      console.log(to.meta.needLogin)
      // console.log(2)
      next('./login')
    } else if (to.path === './notfound') {
      // console.log(3)
      next()
    }
    // console.log(4)
    next();
  }

})
export default router;