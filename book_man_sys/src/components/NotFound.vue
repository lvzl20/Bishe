<template>
  <div>
    <h1>404 Not Found,您访问的页面不存在</h1>
    <el-button @click="back">返回</el-button>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    back() {
      history.go(-1);
    },
  },
};
</script>

