<template>
  <div>
    <el-row :gutter="10">
      <el-col :sm="4" class="hidden-xs-only">
        <el-menu
          class="el-menu-vertical-demo"
          :router="true"
          :default-active="`/${$store.state.userInfo.loginObject}/${$store.state.lastPage}`"
        >
          <el-menu-item index="/admin/personal_profile">
            <span slot="title" class="label-font">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/admin/book_manage">
            <span slot="title" class="label-font">图书管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :sm="20" :xs="24">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 管理员页面
export default {
  name: "Admin",
  data() {
    return {};
  },
  mounted: function () {
    // 进入页面先进入个人信息
    if (this.$store.state.isFirstInto === true) {
      this.$router.replace("/admin/personal_profile");
      this.$store.commit("setLastPage", "personal_profile");
      this.$store.commit("setFirstLoginInvalid");
    }
  },
  methods: {},
};
</script>

<style scoped>
.el-menu-vertical-demo {
  /* width: 8em;
  min-height: 75em; */
  background-color: rgb(225, 248, 254);
  border-top: solid 1px #ccc;
  border-right: solid 1px #ccc;
}

span:hover {
  font-weight: bold;
  color: blue;
}
.el-menu-item {
  border-bottom: 1px dashed #ccc;
}
.el-menu-item.is-active {
  background-color: skyblue;
  font-weight: bold;
}
</style>