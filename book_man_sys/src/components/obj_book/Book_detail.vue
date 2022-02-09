<template>
  <div>
    <div>
      <h2 class="label-font back" @click="goBack" style="display: inline-block">
        返回
      </h2>
    </div>
    <el-divider></el-divider>
    <h2 class="label-font">图书id:{{ id }}</h2>
  </div>
</template>

<script>
// 图书详情页面
export default {
  name: "Book_detail",
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    // 获取图书参数id
    var sHref = window.location.href;
    var args = sHref.split("?");
    if (args[0] == sHref) {
      this.id = "";
    } else {
      this.id = args[1].split("=")[1];
    }
  },
  methods: {
    goBack() {
      history.go(-1);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #4585e1;
}
.back {
  color: #4585e1;
}
.back:hover {
  cursor: pointer;
}
</style>