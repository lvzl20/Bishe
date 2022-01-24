<template>
  <div id="app">
    <el-row id="header">
      <el-col>
        <div class="header-text">计算机科学与技术学院图书系统</div>
      </el-col>
    </el-row>

    <!-- <div>
      <router-link to="./helloworld" class="menubar">helloword界面</router-link>
      <router-link to="./test" class="menubar">test界面</router-link>
    </div> -->
    <!-- 路由匹配到的文件显示到这里 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      // 取出加密的store信息并解密
      let Store = sessionStorage.getItem("store");
      let oldStore = this.$decrypt(Store);
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(oldStore))
      );
    }

    //如果当前用户已登录(有token代表登录),在页面刷新时将vuex里的信息保存到sessionStorage里
    if (sessionStorage.getItem("token") !== undefined) {
      window.addEventListener("beforeunload", () => {
        // 调用加密类进行加密
        let newStore = this.$encrypt(JSON.stringify(this.$store.state));
        sessionStorage.setItem("store", newStore);
        // sessionStorage.setItem("store", JSON.stringify(this.$store.state));
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
          alert("登录失效,请重新登录");
          // 重新跳转到login页面
          this.$router.push("/login");
        }
        return Promise.reject(error);
      }
    );
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
#header {
  background-image: url(./assets/header_img.jpg);
  background-position: center;
  background-color: rgb(225, 248, 254);
  background-repeat: no-repeat;
  height: 110px;
  margin: 0;
}
.header-text {
  color: #3a3a3a;
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 30px;
}
.menubar {
  text-decoration: none;
}
</style>
