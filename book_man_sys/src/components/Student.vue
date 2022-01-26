<template>
  <div>
    <el-row :gutter="10">
      <el-col :sm="4" class="hidden-xs-only">
        <el-menu class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/student/personal_profile">
            <!-- <i class="el-icon-location"></i> -->
            <span slot="title" class="label-font">我的首页</span>
          </el-menu-item>
          <el-menu-item index="/student/personal_profile">
            <!-- <i class="el-icon-menu"></i> -->
            <span slot="title" class="label-font">证件信息</span>
          </el-menu-item>
          <el-menu-item index="3">
            <!-- <i class="el-icon-document"></i> -->
            <span slot="title" class="label-font">我的借阅</span>
          </el-menu-item>
          <el-menu-item index="4">
            <!-- <i class="el-icon-setting"></i> -->
            <span slot="title" class="label-font">我的挂失</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :sm="19" :xs="24">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 学生页面
export default {
  name: "Student",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 8em;
  min-height: 75em; */
  background-color: rgb(225, 248, 254);
  /* background-color: rgba(128, 128, 128, 0.5); */
  border-top: solid 1px #ccc;
  border-right: solid 1px #ccc;
}

span:hover {
  color: rgb(102, 177, 255);
}
.el-menu-item {
  border-bottom: 1px dashed #ccc;
}
.el-menu-item:hover {
  background-color: gray;
}
.el-menu-item:focus {
  background-color: gray;
}
</style>