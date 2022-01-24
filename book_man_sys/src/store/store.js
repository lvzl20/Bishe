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

        // 判断用户是否登录
        logined: false,
        userInfo: {
            id: '',
            name: '',
        }
    },
    mutations: {
        // 注意： 如果要操作 store 中的 state 值，只能通过 调用 mutations 提供的方法，
        // 才能操作对应的数据，不推荐直接操作 state 中的数据，因为 万一导致了数据的紊乱，
        // 不能快速定位到错误的原因，因为，每个组件都可能有操作数据的方法；
        // increment(state) {
        //     state.count++
        // },
        // 注意:如果组件想要调用 mutations 中的方法,只能使用 this.$store.commit('方法名')
        // 这种 调用 mutations 方法的格式，和 this.$emit('父组件中方法名')
        // 注意： mutations 的 函数参数列表中，最多支持两个参数，其中，
        // 参数1： 是 state 状态； 参数2： 通过 commit 提交过来的参数；
        // subtract(state, obj) {
        //     console.log(obj)
        //     state.count -= (obj.c + obj.d)
        // }
        setLogined(state) {
            state.logined = true;
        },
        setUserInfo(state, obj) {
            state.userInfo.id = obj.id;
            state.userInfo.name = obj.name;
        }
    },
    getters: {
        // 注意：这里的 getters， 只负责 对外提供数据，不负责 修改数据，
        // 如果想要修改 state 中的数据，请 去找 mutations

        // 经过咱们回顾对比，发现 getters 中的方法， 和组件中的过滤器比较类似，
        // 因为 过滤器和 getters 都没有修改原数据，都是把原数据做了一层包装，提供给了调用者；
        // 其次， getters 也和 computed 比较像， 只要 state 中的数据发生变化了，
        // 那么，如果 getters 正好也引用了这个数据，那么 就会立即触发 getters 的重新求值；
    }
})

export default store