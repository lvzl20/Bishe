<template>
  <div id="app">
    <el-row class="header">
      <el-col>
        <div class="header-text">计算机科学与技术学院图书系统</div>
      </el-col>
      <!-- 用户登录后才显示头像和个人信息 -->
      <el-col :style="$store.state.isLoginStyle">
        <!-- 个人信息下拉框 -->。
        <el-dropdown
          @command="changeProfileOption"
          style="float: right; margin: 25px 0 5px 10px"
          trigger="click"
        >
          <span class="el-dropdown-link label-font">
            {{ $store.state.userInfo.name + " " }}
            <i class="el-icon-arrow-down label-font"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="label-font" command="profile"
              >基本信息</el-dropdown-item
            >
            <el-dropdown-item class="label-font" command="loginOut"
              >注销</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 个人头像 -->
        <el-avatar
          :size="45"
          :src="$store.state.userInfo.profile_pic"
          @error="errorHandler"
          style="float: right; margin: 15px auto"
          ><img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        /></el-avatar>
      </el-col>
    </el-row>

    <!-- 路由匹配到的文件显示到这里 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // circleUrl: "http://175.24.66.250:8080/picture/default_man.png",
      // isLoginStyle: "display: none",
    };
  },
  mounted() {
    // 禁用浏览器的返回键
    window.addEventListener("popstate", this.goBack, false);
  },
  created() {
    var that = this;
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") && sessionStorage.getItem("token")) {
      // 取出加密的store信息并解密
      let Store = sessionStorage.getItem("store");
      let oldStore = this.$decrypt(Store);
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(oldStore))
      );
    }
    // 如果当前用户已登录(有token代表登录),在页面刷新时将vuex里的信息保存到sessionStorage里
    // 防止刷新时vuex的数据失效
    if (sessionStorage.getItem("token") !== undefined) {
      window.addEventListener("beforeunload", () => {
        // 调用加密类进行加密
        let newStore = this.$encrypt(JSON.stringify(this.$store.state));
        sessionStorage.setItem("store", newStore);
      });
    }
    this.$axios.interceptors.request.use(
      (config) => {
        if (sessionStorage.getItem("token")) {
          // 如果存在token,给请求头添加token信息
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
    this.$axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // 这个是处理响应失败的，也就是响应错误的，在这个箭头函数中，才能拿到401状态下的包
        if (error.response.status === 401) {
          // 清除token
          sessionStorage.removeItem("token");
          that.$message({
            message: "登录失效，请重新登录",
            center: true,
            type: "info",
          });
          // 重新跳转到login页面
          this.$router.replace("/login");
        }
        return Promise.reject(error);
      }
    );
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  methods: {
    goBack() {
      // console.log("点击了浏览器的返回按钮");
      history.pushState(null, null, document.URL);
    },
    errorHandler() {
      return true;
    },
    changeProfileOption(cmd) {
      // 点击注销
      if (cmd === "loginOut") {
        this.$store.commit("loginOut");
        this.$router.replace("/login");
        this.$message({
          message: "注销成功",
          center: true,
          type: "success",
        });
      }
    },
  },
};
</script>

<style>
html {
  font-size: 62.5%; /*10 ÷ 16 × 100% = 62.5%*/
}
body {
  background-color: rgb(225, 248, 254);
}
p {
  font-size: 14px;
  font-size: 1.4rem;
}
.header {
  background-image: url(./assets/header_img.jpg);
  background-position: center;
  background-color: rgb(225, 248, 254);
  background-repeat: no-repeat;
  height: 110px;
  margin: 0;
}
.header-text {
  color: #3a3a3a;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 0.1rem;
  margin-left: 2rem;
}
.menubar {
  text-decoration: none;
}
.label-font {
  font-size: 1.6rem;
  font-family: "微软雅黑";
  color: #303133;
  /* font-weight: bold; */
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
