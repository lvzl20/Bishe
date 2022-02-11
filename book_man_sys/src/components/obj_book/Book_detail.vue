<template>
  <div>
    <div>
      <h2 class="label-font back" @click="goBack" style="display: inline-block">
        返回
      </h2>
    </div>
    <el-divider></el-divider>
    <!-- <h2 class="label-font">图书id:{{ id }}</h2> -->
    <div class="book-info">
      <div id="book-pic">
        <img
          id="book_img"
          width="105"
          height="155"
          style="border: 1px solid #efefef"
          :src="bookDetail.cover_photo"
        />
      </div>
      <div id="item_detail" style="float: left; width: 80%">
        <dl class="booklist">
          <dt class="label-font">图书id:&nbsp;&nbsp;</dt>
          <dd class="label-font">{{ id }}</dd>
        </dl>
        <dl class="booklist">
          <dt class="label-font">图书名:&nbsp;&nbsp;</dt>
          <dd class="label-font">{{ bookDetail.name }}</dd>
        </dl>
        <dl class="booklist">
          <dt class="label-font">ISBN:&nbsp;&nbsp;</dt>
          <dd class="label-font">{{ bookDetail.isbn }}</dd>
        </dl>
        <dl class="booklist">
          <dt class="label-font">作者:&nbsp;&nbsp;</dt>
          <dd class="label-font">{{ bookDetail.author }}</dd>
        </dl>
        <dl class="booklist">
          <dt class="label-font">出版社:&nbsp;&nbsp;</dt>
          <dd class="label-font">{{ bookDetail.publisher + "出版社" }}</dd>
        </dl>
        <dl class="booklist">
          <dt class="label-font">版次:&nbsp;&nbsp;</dt>
          <dd class="label-font">{{ bookDetail.edition }}</dd>
        </dl>
        <dl class="booklist">
          <dt class="label-font">类型:&nbsp;&nbsp;</dt>
          <dd class="label-font">{{ bookDetail.type }}</dd>
        </dl>
        <dl class="booklist">
          <dt class="label-font">价格:&nbsp;&nbsp;</dt>
          <dd class="label-font">{{ bookDetail.price + "元" }}</dd>
        </dl>
        <dl class="booklist">
          <dt class="label-font">入库时间:&nbsp;&nbsp;</dt>
          <dd class="label-font">{{ bookDetail.in_time }}</dd>
        </dl>
        <dl class="booklist">
          <dt class="label-font">简介:&nbsp;&nbsp;</dt>
          <dd class="label-font" v-if="bookDetail.synopsis === ''">暂无简介</dd>
          <dd class="label-font" v-else>{{ bookDetail.synopsis }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
// 图书详情页面
export default {
  name: "Book_detail",
  data() {
    return {
      id: "",
      // 获取book的所有信息
      bookDetail: {},
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
    // 获取图书信息
    this.getBookDetail();
  },
  methods: {
    goBack() {
      history.go(-1);
    },
    getBookDetail() {
      let that = this;
      this.$axios({
        method: "post",
        url: "/book_manage/book_detail",
        data: {
          id: that.id,
        },
      })
        .then(function (res) {
          if (res.data["status"] === 200) {
            that.bookDetail = res.data["data"];
          } else {
            that.$showMsg(res.data["statusInfo"]["detail"], "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
div {
  display: block;
}
dt,
dd {
  padding: 0;
  margin: 0 auto;
  list-style: none;
}
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
.book-info {
  word-wrap: break-word;
  font-size: 12px;
  color: #333;
  padding: 0 0 2px 10px;
  line-height: 180%;
  width: 99%;
}
#book-pic {
  float: right;
  text-align: center;
  width: 110px;
  overflow: hidden;
  margin: 0 auto;
  padding: 0;
  position: relative;
}
.booklist {
  width: 99%;
  float: left;
  clear: both;
  padding: 0;
  margin: 2px auto;
}
.booklist dt {
  float: left;
  text-align: right;
  width: 25%;
  height: 24px;
  color: #333;
  font-weight: bold;
}
#item_detail {
  float: left;
  width: 80%;
}
</style>