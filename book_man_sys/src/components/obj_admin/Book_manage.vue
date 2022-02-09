<template>
  <div>
    <h2 class="label-font">图书管理</h2>
    <el-divider></el-divider>
    <br />
    <div>
      <el-button class="label-font">新增</el-button>
    </div>
    <br />
    <!-- <h1>This is book_manage page!</h1> -->
    <table
      width="100%"
      border="0"
      cellpadding="1"
      cellspacing="1"
      bgcolor="#CCCCCC"
      class="table_line"
      style="table-layout: fixed"
    >
      <tbody>
        <tr class="font">
          <td>序号</td>
          <td>书名</td>
          <td>作者</td>
          <td>出版社</td>
          <td>操作</td>
        </tr>
        <tr v-for="book in currentPageData" :key="book.id">
          <td class="item font">{{ book.id }}</td>
          <td class="item font">
            <a :href="'/book_detail?id=' + book.id">{{ book.name }}</a>
          </td>
          <td class="item font">{{ book.author }}</td>
          <td class="item font">{{ book.publisher }}</td>
          <td class="item font">
            <el-button size="small">编辑</el-button>
            <el-button size="small">删除</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分页展示 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :pager-count="5"
        :page-sizes="[20, 40, 60, 80, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="book_list.length"
      >
        <!-- hide-on-single-page="true" -->
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 图书管理页面,用于管理员增删改查图书
export default {
  name: "Book_manage",
  data() {
    return {
      // 后端获取的图书数据
      book_list: [
        {
          id: "00001",
          name: "vue.js实战",
          author: "梁灏333",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "00002",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "00003",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "00004",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "00005",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "00006",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "00007",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "00008",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "00009",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000010",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000011",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000012",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000013",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000014",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000015",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000016",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000017",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000018",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000019",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000020",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000021",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000022",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000023",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000024",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000025",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000026",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000027",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000028",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000029",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000030",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000031",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000032",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000033",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000034",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000035",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000036",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000037",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
        {
          id: "000038",
          name: "vue.js实战",
          author: "梁灏",
          price: "79.00",
          publisher: "清华大学",
        },
      ],
      listLoading: true,
      totalPage: 1, // 总共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 20, // 每页显示数量
      currentPageData: [], //当前页显示内容
    };
  },
  mounted() {
    this.$store.commit("setLastPage", "book_manage");
    // 获取当前页数据
    this.getCurrentPageData();
  },
  methods: {
    // 改变pageSize触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCurrentPageData();
    },
    // 改变当前页触发
    handleCurrentChange(val) {
      this.currentPage = val;
      // 获取当前页数据
      this.getCurrentPageData();
    },
    // 得到当前页数据
    getCurrentPageData() {
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      this.currentPageData = this.book_list.slice(begin, end);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #4585e1;
}
.item {
  background-color: rgb(225, 248, 254);
}
.font {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}
.table_line {
  border: 1px solid #ccc;
}
.el-button {
  background-color: skyblue;
}
/* 用于当td数据放不下时,强行换行 */
td {
  text-align: center;
  word-break: break-all;
  word-wrap: break-word;
}
.el-button + .el-button {
  margin: 0;
}
</style>