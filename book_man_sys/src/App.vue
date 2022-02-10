<template>
  <div id="app">
    <!-- 回到顶部 -->
    <el-backtop :bottom="100" :right="10" :visibility-height="400">
      <div class="back-top"></div>
    </el-backtop>
    <el-row class="header">
      <el-col>
        <div class="header-text">计算机科学与技术学院图书系统</div>
      </el-col>
      <!-- 用户登录后才显示头像和个人信息 -->
      <el-col :style="$store.state.isLoginStyle">
        <!-- 个人信息下拉框 -->。
        <el-dropdown
          @command="changeOption"
          style="float: right; margin: 25px 0 5px 10px"
          trigger="click"
          placement="bottom"
        >
          <span class="el-dropdown-link label-font">
            {{ $store.state.userInfo.name + " " }}
            <i class="el-icon-arrow-down label-font"></i>
          </span>
          <!-- 当视口>=768时隐藏(hidden-sm-and-up),改为用户页面的左侧导航栏 -->
          <!-- 视图小于768时动态生成不同用户的菜单选项 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              class="label-font hidden-sm-and-up"
              v-for="(item, i) in $store.getters.getMobileMenu"
              :key="item.command"
              :command="item.command"
              >{{ item.name }}
            </el-dropdown-item>
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
    <el-divider></el-divider>
    <!-- 路由匹配到的文件显示到这里 -->
    <router-view />
    <!-- 2333333333333333333333333 -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
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
    changeOption(cmd) {
      // 点击注销
      if (cmd === "loginOut") {
        this.$store.commit("loginOut");
        // 清空历史栈
        let backlen = history.length - 1;
        history.go(-backlen);
        this.$router.replace("/login");
        this.$showMsg("注销成功", "success");
      } else {
        this.$router.push(`/${this.$store.state.userInfo.loginObject}/${cmd}`);
      }
    },
  },
};
</script>

<style>
#app {
  /* overflow-y: scroll; */
}
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
/* 顶部内容 */
.header {
  background-image: url(./assets/header_img.jpg);
  background-position: center;
  background-color: rgb(225, 248, 254);
  background-repeat: no-repeat;
  height: 110px;
  margin: 0;
}
/* 顶部文字 */
.header-text {
  color: #3a3a3a;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 0.1rem;
  margin-left: 2rem;
}

/* 全局文字样式,需要时调用 */
.label-font {
  font-size: 1.6rem;
  font-family: "微软雅黑";
  color: #303133;
}
/* 下拉框 */
.el-dropdown-link {
  cursor: pointer;
}

/* 设置分割线样式 */
.el-divider {
  background-color: #ccc;
}
.el-divider--horizontal {
  margin: 0;
}
/* 下拉选择符号 */
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 4px;
  vertical-align: middle;
  border-top: 6px dashed;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}
.el-button:hover {
  /* color: blue; */
  color: rgba(0, 0, 255, 0.7);
  font-weight: bold;
}
.el-button:focus {
  /* color: blue; */
  color: rgba(0, 0, 255, 0.7);
  font-weight: bold;
}
/* dialog */
.el-dialog__header {
  text-align: center;
  /* background-color: rgb(225, 248, 254); */
}
.el-dialog__body {
  /* background-color: rgb(225, 248, 254); */
}
.el-dialog__footer {
  /* background-color: rgb(225, 248, 254); */
}
/* form选项标签 */
.el-form-item__label {
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
}
</style>

<style scoped>
.el-dropdown-menu__item:hover {
  background-color: skyblue;
  color: blue;
}
.el-dropdown-menu {
  background-color: rgba(189, 218, 230, 0.7);
  margin: 0;
}
.back-top {
  width: 100%;
  height: 100%;
  background-image: url(./assets/backTop.png);
  background-repeat: no-repeat;
}
</style>
