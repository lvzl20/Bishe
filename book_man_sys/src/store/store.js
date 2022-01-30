import Vue from 'vue'
// 配置vuex的步骤
// 1. 运行 npm i vuex -S
// 2. 导入包
import Vuex from 'vuex'
// 3. 注册vuex到vue中
Vue.use(Vuex)
// 4. new Vuex.Store() 实例，得到一个 数据仓储对象
const store = new Vuex.Store({
    state: {
        // 可以把 state 想象成 组件中的 data ,专门用来存储数据的
        // 如果在 组件中，想要访问，store 中的数据，只能通过 this.$store.state.来访问
        // 用户信息, 账号和名字
        userInfo: {
        },
        // 登录对象(student/teacher/admin)
        loginObject: "",
        // 用户登录后才显示头像和个人信息
        isLoginStyle: "display: none",
        // 记录上一次所在菜单页面,便于激活选中菜单样式
        lastPage: "personal_profile",
    },
    mutations: {
        // 用户登录
        setUserInfo(state, data) {
            state.userInfo = data;
            state.isLoginStyle = "display: inline-block";
        },
        setLoginObject(state, data) {
            state.loginObject = data;
        },
        setLastPage(state, data) {
            state.lastPage = data;
        },
        setMobileMenu(state, data) {
            state.mobileMenu = data;
        },
        // 用户注销,清空sessionstorage
        loginOut(state) {
            state.userInfo = {};
            state.isLoginStyle = "display: none";
            state.loginObject = "";
            sessionStorage.clear();
        }
    },
    actions: {

    },
    getters: {
        getMobileMenu(state) {
            let userMenu;
            // 视口小于768时的下拉框菜单选项
            if (state.loginObject === "student") {
                userMenu = [
                    { command: "profile", name: "个人信息(学生)" },
                    { command: "borrow", name: "当前借阅" },
                ];
            } else if (state.loginObject === "teacher") {
                userMenu = [
                    { command: "profile", name: "个人信息(教师)" },
                    { command: "borrow", name: "当前借阅" },
                ];
            } else if (state.loginObject === "admin") {
                userMenu = [{ command: "profile", name: "个人信息(管理员)" }];
            }
            return userMenu;
        }

    }
})

export default store