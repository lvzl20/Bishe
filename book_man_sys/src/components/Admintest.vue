<template>
  <div>
    <h1>管理员界面:{{ "你好" + $store.state.userInfo.name }}</h1>
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
  methods: {},
};
</script>

