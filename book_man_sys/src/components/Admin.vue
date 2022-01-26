<template>
  <div>
    <h1>管理员界面:{{ "你好" + $store.state.userInfo.name }}</h1>
  </div>
</template>

<script>
// 管理员页面
export default {
  name: "Admin",
  data() {
    return {
      msg: "This is a test msg",
    };
  },
  methods: {},
};
</script>

