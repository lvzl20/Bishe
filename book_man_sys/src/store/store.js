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
        // 是否第一次登录进入
        isFirstInto: true,
        // 用户登录后才显示头像和下拉框
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
        setFirstLoginInvalid(state) {
            state.isFirstInto = false;
        },
        setLastPage(state, data) {
            state.lastPage = data;
        },
        // 改变某个用户值
        setSomeUserInfo(state, data) {
            state.userInfo[data['name']] = data['value'];
        },
        // 用户注销,清空sessionstorage
        loginOut(state) {
            state.isFirstInto = true;
            state.userInfo = {};
            state.isLoginStyle = "display: none";
            sessionStorage.clear();
        }
    },
    actions: {

    },
    getters: {
        getMobileMenu(state) {

            let userMenu;
            // 视口小于768时的下拉框菜单选项
            if (state.userInfo.loginObject === "student") {
                userMenu = [
                    { command: "personal_profile", name: "个人信息" },
                    { command: "borrow", name: "当前借阅" },
                ];
            } else if (state.userInfo.loginObject === "teacher") {
                console.log(233);
                userMenu = [
                    { command: "personal_profile", name: "个人信息" },
                    { command: "borrow", name: "当前借阅" },
                ];
            } else if (state.userInfo.loginObject === "admin") {
                userMenu = [
                    { command: "personal_profile", name: "个人信息" },
                    { command: "book_manage", name: "图书管理" },
                ];
            }
            return userMenu;
        }

    }
})

export default store