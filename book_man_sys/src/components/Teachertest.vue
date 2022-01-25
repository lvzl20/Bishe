<template>
  <div>
    <h1>教师:{{ "你好" + $store.state.userInfo.name }}</h1>
    <el-button @click="logOut">注销</el-button>
    <el-button @click="testClick">test</el-button>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      msg: "This is a test msg",
    };
  },
  methods: {
    // send() {
    //   this.$axios.get("http://localhost:5000/index1").then((res) => {
    //     this.msg = res.data;
    //   });
    // },
    logOut() {
      this.$store.commit("loginOut");
      this.$router.replace("/login");
      this.$message({
        message: "注销成功",
        center: true,
        type: "success",
      });
    },
    testClick() {
      var that = this;
      this.$axios({
        method: "POST",
        url: "/login/test",
        data: { testMsg: 233 },
      })
        .then((res) => {})
        .catch((err) => {
          // alert(err);
        });
    },
  },
};
</script>

