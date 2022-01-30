<template>
  <div>
    <h2 class="label-font">个人信息</h2>
    <el-divider></el-divider>
    <h1>This is {{ $store.state.loginObject }}'s Personal_profile page!</h1>
  </div>
</template>

<script>
// 个人信息页面
export default {
  name: "Personal_profile",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
h2 {
  padding-bottom: 0.5rem;
}
</style>