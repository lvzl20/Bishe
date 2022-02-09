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
const Book_manage = () => import('@/components/obj_admin/Book_manage')

// 图书相关组件
const Book_detail = () => import('@/components/obj_book/Book_detail')

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
    // 登录页面
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
    // 学生页面
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
    // 管理员页面
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
          component: Book_manage,
        },
      ]
    },
    // 教师页面
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
      path: '/book_detail',
      name: 'Book_detail',
      meta: {
        needLogin: true
      },
      component: Book_detail,
    },
    // 404页面
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFound,
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
  }
  else {
    // 需要登录权限的页面没有token进入登录页面
    if (to.meta.needLogin || to.path === './login') {
      next('./login')
    } else {
      next()
    }
  }

})
export default router;