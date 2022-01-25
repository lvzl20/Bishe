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
        isLoginStyle: "display: none",
    },
    mutations: {
        // 注意： 如果要操作 store 中的 state 值，只能通过 调用 mutations 提供的方法，
        // 才能操作对应的数据，不推荐直接操作 state 中的数据，因为 万一导致了数据的紊乱，
        // 不能快速定位到错误的原因，因为，每个组件都可能有操作数据的方法；
        // 注意:如果组件想要调用 mutations 中的方法,只能使用 this.$store.commit('方法名')
        // 参数1： 是 state 状态； 参数2： 通过 commit 提交过来的参数；

        // 用户登录
        setUserInfo(state, data) {
            state.userInfo = data;
            state.isLoginStyle = "display: inline-block";
        },
        // 用户注销,情况sessionstorage
        loginOut(state) {
            state.userInfo = {};
            state.isLoginStyle = "display: none";
            sessionStorage.clear();
        }
    },
    actions: {

    },
    getters: {

    }
})

export default store