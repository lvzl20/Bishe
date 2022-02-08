<template>
  <div class="login-flex">
    <el-card class="box-login label-font" body-style="padding:1rem;">
      <div slot="header">
        <el-dropdown @command="changeLoginObject">
          <span class="el-dropdown-link label-font">
            {{ curLoginObject + "登录"
            }}<i class="el-icon-arrow-down label-font"></i>
          </span>
          <!-- <span class="label-font">学生登录</span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="label-font" command="student"
              >学生</el-dropdown-item
            >
            <el-dropdown-item class="label-font" command="teacher"
              >教师</el-dropdown-item
            >
            <el-dropdown-item class="label-font" command="admin"
              >管理员</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="item">
        <label for="username" class="label-font">账号:</label>
        <el-input
          placeholder="请输入账号"
          v-model="user.username"
          label="username"
          maxlength="16"
        ></el-input>
      </div>
      <!-- <el-divider class="item"></el-divider> -->
      <div class="item">
        <label for="password" class="label-font">密码:</label>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="user.password"
          label="password"
          show-password
          maxlength="16"
        ></el-input>
      </div>
      <!-- <el-divider class="item"></el-divider> -->
      <div class="item">
        <label for="verificationCode" class="label-font" style="float: left"
          >验证:</label
        >
        <el-input
          type="text"
          placeholder="请输入4位验证码"
          v-model="user.inputCode"
          label="verificationCode"
          style="width: 58%; float: left; margin: 0px 10px 10px 5px"
          maxlength="8"
        >
        </el-input>
        <img
          :src="verificationCodeSrc"
          @click="getVeficationCode"
          alt="加载失败"
          class="verification-code clear"
        />
      </div>
      <!-- <div class="item" style="text-align: center"> -->
      <!-- 错误消息弹出位置 -->
      <el-alert
        type="error"
        :title="errorMsg"
        :style="errorStyle"
        close-text="关闭"
        @close="closeErrMsg"
      >
      </el-alert>
      <!-- </div> -->
      <div class="item" style="text-align: center">
        <el-button
          class="login-btn label-font"
          @click="loginUser"
          :loading="loadingBtn"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          {{ loadingLoginText }}</el-button
        >
      </div>
      <div class="item">
        <el-checkbox v-model="isRemember"></el-checkbox
        ><span class="label-font"> 记住密码</span>
        <a href="#" class="label-font clear" @click="forgetPwd">忘记密码?</a>
      </div>
    </el-card>
  </div>
</template>

<script>
// 登录页面
export default {
  name: "Login",
  data() {
    return {
      // 记录输入用户账号密码验证码,以及登录对象
      user: {
        username: "5120220000",
        password: "zs123456789",
        inputCode: "",
        // 当前登录对象(默认学生/教师/管理员)
        loginObject: "student",
        codeReal: "",
      },
      // 显示切换当前登录用户
      curLoginObject: "学生",
      // 后台传入的验证码及内容
      verificationCodeSrc: "",
      // 控制是否加载
      loadingBtn: false,
      // 控制加载前后的文本
      loadingLoginText: "登录",
      // 错误消息
      errorStyle: "display: none;",
      errorMsg: "",
      // 是否勾选记住密码
      isRemember: false,
    };
  },
  mounted: function () {
    // 加载完网页后就需要显示验证码
    this.getVeficationCode();
    // 目前不知道哪里有问题(进入登录页面，调用函数清空sessionstorage)
    this.$store.commit("loginOut");
    // 如果用户记住了账号信息,加载出来
    if (localStorage.getItem("rememberInfo")) {
      let rememberInfo = localStorage.getItem("rememberInfo");
      rememberInfo = JSON.parse(this.$decrypt(rememberInfo));
      this.user.username = rememberInfo["username"];
      this.user.password = rememberInfo["password"];
      this.user.loginObject = rememberInfo["loginObject"];
      this.isRemember = true;
      if (this.user.loginObject === "student") {
        this.curLoginObject = "学生";
      } else if (this.user.loginObject === "teacher") {
        this.curLoginObject = "教师";
      } else if (this.user.loginObject === "admin") {
        this.curLoginObject = "管理员";
      }
    }
  },
  methods: {
    // 切换登录对象(学生,教师,管理员)
    changeLoginObject(cmd) {
      // 将登录对象修改
      if (cmd === "student") {
        this.user.loginObject = "student";
        this.curLoginObject = "学生";
      } else if (cmd === "teacher") {
        this.user.loginObject = "teacher";
        this.curLoginObject = "教师";
      } else if (cmd === "admin") {
        this.user.loginObject = "admin";
        this.curLoginObject = "管理员";
      }
    },
    // 点击验证码,重新获取验证码
    getVeficationCode() {
      var that = this;
      this.$axios({
        methods: "get",
        url: "/login/getVerificationCode",
      }).then((res) => {
        that.verificationCodeSrc =
          "data:image/jepg;base64," +
          that.$strToBase64(res.data["data"]["img"]);
        that.user.codeReal = res.data["data"]["codeReal"];
      });
    },
    // 点击忘记密码
    forgetPwd() {
      alert("忘了就忘了呗!");
    },
    // 点击登录
    loginUser() {
      var flag = this.judgeUserInput();
      // 输入有误,返回重新输入并重置验证码,作为前端验证部分
      if (!flag) {
        this.getVeficationCode();
        return;
      }
      var that = this;
      // 开始加载
      this.loadingBtn = true;
      this.loadingLoginText = "登录中...";
      // 向后端发送登录请求
      this.$axios({
        method: "post",
        url: "/login/loginOn",
        data: that.user,
      })
        .then(function (res) {
          // 取消加载
          that.loadingBtn = false;
          that.loadingLoginText = "登录";

          // 接受错误信息
          if (
            res.data["status"] == 201 ||
            res.data["status"] == 202 ||
            res.data["status"] == 203
          ) {
            that.errorMsg = res.data["statusInfo"]["detail"];
            that.errorStyle = "display: inline-block;";
            // 重置验证码
            that.getVeficationCode();
          } else if (res.data["status"] == 200) {
            // 如果勾选了记住密码
            if (that.isRemember === true) {
              let rememberInfo = {
                username: that.user.username,
                password: that.user.password,
                loginObject: that.user.loginObject,
              };
              rememberInfo = that.$encrypt(JSON.stringify(rememberInfo));
              localStorage.setItem("rememberInfo", rememberInfo);
            } else {
              // 如果取消勾选则删除localStorage
              if (localStorage.getItem("rememberInfo")) {
                localStorage.removeItem("rememberInfo");
              }
            }
            // 登录成功, 将用户基本信息存入store,将登录对象添加进去
            let userInfo = res.data["data"];
            userInfo["loginObject"] = that.user.loginObject;
            that.$store.commit("setUserInfo", userInfo);

            // 将token保存至会话中
            sessionStorage.setItem("token", res.data["token"]);
            // 进入相应页面
            that.$message({
              message: "登录成功",
              center: true,
              type: "success",
              duration: "1500",
            });
            that.$router.replace(`/${that.user.loginObject}/personal_profile`);
          }
        })
        .catch((err) => {
          // 取消加载
          that.loadingBtn = false;
          that.loadingLoginText = "登录";
          console.log(err);
        });
    },
    // 检查用户输入信息是否正确,前端进行简单判断,主要还是给后端判断
    judgeUserInput() {
      if (this.user.username === "") {
        this.errorMsg = "请输入账号";
        this.errorStyle = "display: inline-block;";
        return false;
      }
      if (this.user.password === "") {
        this.errorMsg = "请输入密码";
        this.errorStyle = "display: inline-block;";
        return false;
      }
      if (this.user.inputCode === "") {
        this.errorMsg = "请输入验证码";
        this.errorStyle = "display: inline-block;";
        return false;
      }
      if (this.user.inputCode.length !== 4) {
        this.errorMsg = "验证码错误";
        this.errorStyle = "display: inline-block;";
        return false;
      }
      return true;
    },
    // 关闭错误提示时,设置this.errorStyle = "display: none;";
    closeErrMsg() {
      this.errorMsg = "";
      this.errorStyle = "display: none;";
    },
  },
};
</script>

<style scoped>
.login-flex {
  display: flex;
  justify-content: center;
  margin-top: 5rem !important;
}
.box-login {
  /* position: relative; */
  width: 400px;
  background-color: rgb(93, 164, 220);
}

.label-font {
  font-size: 1.6rem;
  font-family: "微软雅黑";
  color: #303133;
  /* font-weight: bold; */
}
.el-checkbox >>> .el-checkbox__label {
  font-size: 1.6rem;
  font-family: "微软雅黑";
  color: #303133;
}
.item {
  height: 36px;
  margin: 15px auto;
  /* float: left; */
}
a {
  text-decoration: none;
  float: right;
}

.verification-code {
  width: 25%;
  height: 36px;
  /* float: none; */
}
.verification-code:hover {
  cursor: pointer;
}
.el-input {
  /* height: 20px; */
  width: 75%;
}
.el-input >>> .el-input__inner {
  cursor: pointer;
  height: 3rem;
  /* color: red; */
  background-color: rgba(255, 255, 255, 0.8);
}
.el-alert--error.is-light {
  color: red;
  background-color: #fff;
  width: 70%;
  padding-left: 20%;
  margin-left: 15%;
}

.login-btn {
  height: 40px;
  width: 80%;
  /* background-color: rgb(18, 146, 63); */
}
/* 清除浮动 */
.clear {
  clear: both;
}
</style>
