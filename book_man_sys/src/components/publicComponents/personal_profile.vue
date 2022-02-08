<template>
  <div>
    <h2 class="label-font">个人信息</h2>
    <el-divider></el-divider>
    <!-- 学生部分 -->
    <table
      width="100%"
      border="0"
      cellpadding="5"
      cellspacing="1"
      style="padding: 8px"
      v-if="$store.state.userInfo.loginObject === 'student'"
    >
      <!-- 视口<768隐藏 -->
      <tbody class="hidden-xs-only">
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>证件号: {{ $store.state.userInfo.id }}</span>
          </td>
          <td>
            <span>年龄: {{ $store.state.userInfo.age }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span v-if="$store.state.userInfo.sex === 0">性别: 男</span>
            <span v-else>性别: 女</span>
          </td>
          <td>
            <span>邮箱: {{ $store.state.userInfo.email }}</span>
          </td>
          <td>
            <span>电话: {{ $store.state.userInfo.tel }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>学院: {{ $store.state.userInfo.department }}</span>
          </td>
          <td>
            <span>班级: {{ $store.state.userInfo.class }}</span>
          </td>
          <td>
            <span>身份: 学生</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>最大可借图书: {{ $store.state.userInfo.maxcount }}</span>
          </td>
          <td>
            <span
              >累计借阅数: {{ $store.state.userInfo.total_borrow_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>挂失次数: {{ $store.state.userInfo.total_loss_cnt }}</span>
          </td>
          <td>
            <span
              >超时次数: {{ $store.state.userInfo.total_overtime_cnt }}</span
            >
          </td>
          <td>
            <span>罚款金额: {{ $store.state.userInfo.total_fine }}</span>
          </td>
        </tr>
        <tr></tr>
      </tbody>
      <!-- 视口>=768隐藏 -->
      <tbody class="hidden-sm-and-up">
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>证件号: {{ $store.state.userInfo.id }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>年龄: {{ $store.state.userInfo.age }}</span>
          </td>
          <td>
            <span v-if="$store.state.userInfo.sex === 0">性别: 男</span>
            <span v-else>性别: 女</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>邮箱: {{ $store.state.userInfo.email }}</span>
          </td>
          <td>
            <span>电话: {{ $store.state.userInfo.tel }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>学院: {{ $store.state.userInfo.department }}</span>
          </td>
          <td>
            <span>班级: {{ $store.state.userInfo.class }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>身份: 学生</span>
          </td>
          <td>
            <span>最大可借图书: {{ $store.state.userInfo.maxcount }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span
              >累计借阅数: {{ $store.state.userInfo.total_borrow_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>挂失次数: {{ $store.state.userInfo.total_loss_cnt }}</span>
          </td>
          <td>
            <span
              >超时次数: {{ $store.state.userInfo.total_overtime_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>罚款金额: {{ $store.state.userInfo.total_fine }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 教师部分 -->
    <table
      width="100%"
      border="0"
      cellpadding="5"
      cellspacing="1"
      style="padding: 8px"
      v-else-if="$store.state.userInfo.loginObject === 'teacher'"
    >
      <!-- 视口<768隐藏 -->
      <tbody class="hidden-xs-only">
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>证件号: {{ $store.state.userInfo.id }}</span>
          </td>
          <td>
            <span>年龄: {{ $store.state.userInfo.age }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span v-if="$store.state.userInfo.sex === 0">性别: 男</span>
            <span v-else>性别: 女</span>
          </td>
          <td>
            <span>邮箱: {{ $store.state.userInfo.email }}</span>
          </td>
          <td>
            <span>电话: {{ $store.state.userInfo.tel }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>学院: {{ $store.state.userInfo.department }}</span>
          </td>
          <td>
            <span>身份: 教师</span>
          </td>
          <td>
            <span>最大可借图书: {{ $store.state.userInfo.maxcount }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>最大预约图书: {{ $store.state.userInfo.maxorder }}</span>
          </td>
          <td>
            <span
              >累计借阅数: {{ $store.state.userInfo.total_borrow_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>累计预约数: {{ $store.state.userInfo.total_order_cnt }}</span>
          </td>
          <td>
            <span
              >当前预约数: {{ $store.state.userInfo.current_order_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>挂失次数: {{ $store.state.userInfo.total_loss_cnt }}</span>
          </td>
          <td>
            <span
              >超时次数: {{ $store.state.userInfo.total_overtime_cnt }}</span
            >
          </td>
          <td>
            <span>罚款金额: {{ $store.state.userInfo.total_fine }}</span>
          </td>
        </tr>
        <tr></tr>
      </tbody>
      <!-- 视口>=768隐藏 -->
      <tbody class="hidden-sm-and-up">
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>证件号: {{ $store.state.userInfo.id }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>年龄: {{ $store.state.userInfo.age }}</span>
          </td>
          <td>
            <span v-if="$store.state.userInfo.sex === 0">性别: 男</span>
            <span v-else>性别: 女</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>邮箱: {{ $store.state.userInfo.email }}</span>
          </td>
          <td>
            <span>电话: {{ $store.state.userInfo.tel }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>学院: {{ $store.state.userInfo.department }}</span>
          </td>
          <td>
            <span>身份: 教师</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>最大可借图书: {{ $store.state.userInfo.maxcount }}</span>
          </td>
          <td>
            <span>最大预约图书: {{ $store.state.userInfo.maxorder }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span
              >累计借阅数: {{ $store.state.userInfo.total_borrow_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>累计预约数: {{ $store.state.userInfo.total_order_cnt }}</span>
          </td>
          <td>
            <span
              >当前预约数: {{ $store.state.userInfo.current_order_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>挂失次数: {{ $store.state.userInfo.total_loss_cnt }}</span>
          </td>
          <td>
            <span
              >超时次数: {{ $store.state.userInfo.total_overtime_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>罚款金额: {{ $store.state.userInfo.total_fine }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 管理员部分 -->
    <table
      width="100%"
      border="0"
      cellpadding="5"
      cellspacing="1"
      style="padding: 8px"
      v-else
    >
      <tbody>
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>账号: {{ $store.state.userInfo.id }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>身份: 管理员</span>
          </td>
          <td>
            <span> 电话: {{ $store.state.userInfo.tel }} </span>
          </td>
        </tr>
        <tr>
          <td>
            <span> 邮箱: {{ $store.state.userInfo.email }} </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: center">
      <!-- 修改邮箱和手机号 -->
      <el-button type="text" @click="dialogForm = true">修改信息</el-button>
      <span>&nbsp;&nbsp;</span>
      <el-dialog
        title="修改信息"
        :visible.sync="dialogForm"
        :width="dialogWidth"
        @open="clearDialog"
      >
        <div>
          <label for="emailOld" class="label-font">旧邮箱: </label>
          <el-input
            v-if="$store.state.userInfo.email === null"
            label="emailOld"
            :disabled="true"
            placeholder="暂没有填写邮箱"
          ></el-input>
          <el-input
            v-else
            label="emailOld"
            :disabled="true"
            :placeholder="$store.state.userInfo.email"
          ></el-input>
        </div>
        <div>
          <label for="emailNew" class="label-font">新邮箱: </label>
          <el-input
            v-model="form.newEmail"
            label="emailNew"
            maxlength="40"
          ></el-input>
        </div>
        <!-- 手机号 -->
        <div>
          <label for="emailOld" class="label-font">旧电话: </label>
          <el-input
            v-if="$store.state.userInfo.tel === null"
            label="telephoneOld"
            :disabled="true"
            placeholder="暂没有填写电话"
          ></el-input>
          <el-input
            v-else
            label="telephoneOld"
            :disabled="true"
            :placeholder="$store.state.userInfo.tel"
          ></el-input>
        </div>
        <div>
          <label for="telephoneNew" class="label-font" maxlength="16"
            >新电话:
          </label>
          <el-input v-model="form.newTelephone" label="telephoneNew"></el-input>
        </div>
        <!-- 错误消息弹出位置 -->
        <el-alert
          type="error"
          :title="errorMsg"
          :style="errorStyle"
          close-text="关闭"
          @close="closeErrMsg"
        >
        </el-alert>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="submitProfile">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改密码 -->
      <el-button type="text" @click="dialogPassword = true">修改密码</el-button>
      <el-dialog
        title="修改信息"
        :visible.sync="dialogPassword"
        :width="dialogWidth"
        @open="clearDialog"
      >
        <div>
          <label for="passwordOld" class="label-font">旧密码: </label>
          <el-input
            type="password"
            show-password
            label="passwordOld"
            v-model="pwd.oldPassword"
            maxlength="20"
          ></el-input>
        </div>
        <div>
          <label for="passwordNew1" class="label-font">新密码: </label>
          <el-input
            type="password"
            show-password
            label="passwordNew1"
            v-model="pwd.newPassword"
            maxlength="20"
          ></el-input>
        </div>
        <div>
          <label
            for="telephoneNew2"
            class="label-font"
            style="font-size: 1.4rem"
            >确认密码:
          </label>
          <el-input
            type="password"
            show-password
            v-model="pwd.newConfirmPassword"
            label="telephoneNew2"
            maxlength="20"
          ></el-input>
          <!-- 错误消息弹出位置 -->
          <el-alert
            type="error"
            :title="errorMsg"
            :style="errorStyle"
            close-text="关闭"
            @close="closeErrMsg"
          >
          </el-alert>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPassword = false">取 消</el-button>
          <el-button type="primary" @click="submitPassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 个人信息页面

export default {
  name: "Personal_profile",
  data() {
    return {
      // 是否显示修改邮件和电话的dialog
      dialogForm: false,
      // 是否显示修改密码的dialog
      dialogPassword: false,
      // 新邮箱和手机号
      form: {
        newEmail: "",
        newTelephone: "",
      },
      pwd: {
        oldPassword: "",
        newPassword: "",
        newConfirmPassword: "",
      },
      // dialog的宽度,在电脑端为50%, 移动端设为75%(假设屏幕宽度<768为移动)
      dialogWidth: document.documentElement.clientWidth < 768 ? "75%" : "50%",
      // 错误消息
      errorStyle: "display: none;",
      errorMsg: "",
    };
  },
  mounted() {
    let that = this;
    // 监听屏幕的实时变化以改变dialog的宽度达到适配部分pc 移动的目的。
    window.addEventListener("resize", function () {
      let screenWidth = document.documentElement.clientWidth;
      if (screenWidth < 768) {
        that.dialogWidth = "75%";
      } else {
        that.dialogWidth = "50%";
      }
    });
  },
  methods: {
    // 提交改变邮箱和电话
    submitProfile() {
      // 邮箱和手机号格式不正确,返回
      if (!this.isEmail() || !this.isTelephone()) return;
      if (this.form.newEmail === "" && this.form.newTelephone === "") {
        this.dialogForm = false;
        return;
      }
      let that = this;
      this.$axios({
        method: "post",
        url: "/profile/information",
        data: {
          newEmail: that.form.newEmail,
          newTelephone: that.form.newTelephone,
          loginObject: that.$store.state.userInfo.loginObject,
        },
      })
        .then(function (res) {
          // 接受错误信息
          if (
            res.data["status"] === 203 ||
            res.data["status"] === 204 ||
            res.data["status"] === 205
          ) {
            that.errorMsg = res.data["statusInfo"]["detail"];
            that.errorStyle = "display: inline-block;";
          } else if (res.data["status"] === 200) {
            if (that.form.newEmail !== "")
              that.$store.commit("setSomeUserInfo", {
                name: "email",
                value: that.form.newEmail,
              });
            if (that.form.newTelephone !== "")
              that.$store.commit("setSomeUserInfo", {
                name: "tel",
                value: that.form.newTelephone,
              });
            that.$message({
              message: "修改成功",
              center: true,
              type: "success",
              duration: "1500",
            });
            that.dialogForm = false;
          }
        })
        .catch((err) => {
          that.dialogForm = false;
          console.log(err);
        });
    },
    // 提交修改密码
    submitPassword() {
      if (!this.isPassword()) return;
      let that = this;
      this.$axios({
        method: "post",
        url: "/profile/password",
        data: {
          oldPassword: that.pwd.oldPassword,
          newPassword: that.pwd.newPassword,
          loginObject: that.$store.state.userInfo.loginObject,
        },
      })
        .then(function (res) {
          // 接受错误信息
          if (
            res.data["status"] === 203 ||
            res.data["status"] === 206 ||
            res.data["status"] === 207
          ) {
            that.errorMsg = res.data["statusInfo"]["detail"];
            that.errorStyle = "display: inline-block;";
          } else if (res.data["status"] === 200) {
            that.$message({
              message: "修改成功，请重新登录",
              center: true,
              type: "success",
              duration: "1500",
            });
            that.dialogPassword = false;
            that.$store.commit("loginOut");
            that.$router.replace("/login");
          }
        })
        .catch((err) => {
          that.dialogPassword = false;
          console.log(err);
        });
    },
    // 验证邮箱正确性
    isEmail() {
      // 为空代表不修改
      if (this.form.newEmail === "") return true;
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(this.form.newEmail)) {
        return true;
      } else {
        this.errorMsg = "邮箱格式不正确";
        this.errorStyle = "display: inline-block;";
        return false;
      }
    },
    // 验证手机正确性
    isTelephone() {
      if (this.form.newTelephone === "") return true;
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (reg.test(this.form.newTelephone)) {
        return true;
      } else {
        this.errorMsg = "手机号格式不正确";
        this.errorStyle = "display: inline-block;";
        return false;
      }
    },
    // 验证密码
    isPassword() {
      if (
        this.pwd.oldPassword === "" ||
        this.pwd.newPassword === "" ||
        this.pwd.newConfirmPassword === ""
      ) {
        this.errorMsg = "输入的密码不能为空";
        this.errorStyle = "display: inline-block;";
        return false;
      }
      if (this.pwd.newPassword != this.pwd.newConfirmPassword) {
        this.errorMsg = "前后两次输入密码不一致";
        this.errorStyle = "display: inline-block;";
        return false;
      }
      return true;
    },
    // 关闭错误消息
    closeErrMsg() {
      this.errorMsg = "";
      this.errorStyle = "display: none;";
    },
    // 打开dialog时情况内容
    clearDialog() {
      // 错误消息
      this.errorStyle = "display: none;";
      this.errorMsg = "";
      this.form.newEmail = "";
      this.form.newTelephone = "";
      this.pwd.oldPassword = "";
      this.pwd.newPassword = "";
      this.pwd.newConfirmPassword = "";
    },
  },
};
</script>

<style scoped>
span {
  font-size: 1.6rem;
}
.el-button {
  font-style: "微软雅黑";
  color: black;
  background-color: skyblue;
  width: 6rem;
}
.el-button:hover {
  color: blue;
}
.el-input {
  width: 75%;
}
.el-input >>> .el-input__inner {
  cursor: pointer;
  height: 3rem;
  background-color: rgba(255, 255, 255, 0.8);
}
div {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
.el-alert--error.is-light {
  color: red;
  background-color: #fff;
  width: 75%;
}
</style>