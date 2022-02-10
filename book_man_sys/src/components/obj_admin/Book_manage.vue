<template>
  <div>
    <h2 class="label-font">图书管理</h2>
    <el-divider></el-divider>
    <br />
    <div>
      <el-button class="label-font" @click="dialogAddForm = true"
        >新增</el-button
      >
      <!-- 点击新增后显示 -->
      <el-dialog
        title="添加图书"
        :visible.sync="dialogAddForm"
        :width="dialogWidth"
      >
        <el-form
          :model="addForm"
          ref="addForm"
          label-width="80px"
          size="medium"
          :rules="addRules"
          class="demo-ruleForm"
        >
          <el-form-item label="图书名称" prop="name">
            <el-input v-model="addForm.name" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="addForm.author" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="ISBN" prop="isbn">
            <el-input v-model="addForm.isbn" maxlength="13"></el-input>
          </el-form-item>
          <el-form-item label="出版社" prop="publisher">
            <el-input v-model="addForm.publisher" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input v-model="addForm.type" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="版次日期" prop="edition_date">
            <el-date-picker
              value-format="yyyy年M月"
              v-model="addForm.edition_date"
              type="month"
              placeholder="版次年月"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="版次次序" prop="edition_number">
            <el-input
              type="tel"
              v-model.number="addForm.edition_number"
              maxlength="3"
              style="width: 30%"
            >
            </el-input>
            <span>次</span>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input
              v-model="addForm.price"
              :precision="2"
              maxlength="6"
              style="width: 30%"
            ></el-input>
            <span>元</span>
          </el-form-item>

          <el-form-item label="简介" prop="synopsis">
            <el-input
              type="textarea"
              :rows="5"
              width="70%"
              v-model="addForm.synopsis"
              maxlength="500"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div style="text-align: center">
              <el-button @click="onSubmitAdd('addForm')">添加</el-button>
              <el-button @click="resetForm('addForm')">重置</el-button>
              <el-button @click="closeDialog">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 搜索下拉框 -->
      <el-dropdown @command="changeOption" trigger="click" placement="bottom">
        <span class="label-font el-dropdown-link query-link">
          {{ query_dict[queryObject] }}
          <i class="caret label-font"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            class="label-font query-link"
            style="display: block"
            v-for="(val, key) in query_dict"
            :key="key"
            :command="key"
            >{{ val }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-input
        placeholder="模糊搜索"
        v-model="keyword"
        maxlength="30"
        :style="'width:' + queryWidth"
      ></el-input>
      <el-button class="label-font" @click="getCurrentTotalList"
        >搜索</el-button
      >
    </div>
    <br />
    <!-- 图书数据 -->
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
          <td>图书号</td>
          <td>图书名</td>
          <td>作者</td>
          <td>出版社</td>
          <td>ISBN</td>
          <td>类别</td>
          <td>入库时间</td>
          <td>是否借出</td>
          <td>操作</td>
        </tr>
        <tr v-for="book in currentPageData" :key="book.id">
          <td class="item font">{{ book.id }}</td>
          <td class="item font">
            <a :href="'/book_detail?id=' + book.id">{{ book.name }}</a>
          </td>
          <td class="item font">{{ book.author }}</td>
          <td class="item font">{{ book.publisher }}</td>
          <td class="item font">{{ book.isbn }}</td>
          <td class="item font">{{ book.type }}</td>
          <td class="item font">{{ book.in_time }}</td>
          <td class="item font" v-if="book.state === 0" style="color: green">
            否
          </td>
          <td class="item font" v-else style="color: red">是</td>
          <td class="item">
            <el-button size="small" class="font">编辑</el-button>
            <el-button size="small" class="font">删除</el-button>
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
        :total="currentTotalData.length"
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
      currentTotalData: [], // 当前需要显示的所有数据
      currentPageData: [], //当前页显示内容

      // 搜索部分
      query_dict: {
        name: "书名",
        author: "作者",
        isbn: "ISBN",
        publisher: "出版社",
        type: "类别",
      },
      queryObject: "name", // 当前选择搜索条件, 默认为书名
      keyword: "", // 输入的搜索关键字
      // 搜索框宽度,在电脑端为60%, 移动端设为30%(假设屏幕宽度<768为移动)
      queryWidth: document.documentElement.clientWidth < 768 ? "30%" : "55%",

      // 增加图书部分
      dialogAddForm: false, // 是否显示增加图书的dialog
      // dialog 宽度
      dialogWidth: document.documentElement.clientWidth < 768 ? "75%" : "50%",
      // 图书信息
      addForm: {
        name: "",
        author: "",
        isbn: "",
        publisher: "",
        price: "",
        type: "",
        edition_date: "",
        edition_number: "",
        synopsis: "",
      },
      addRules: {
        name: [{ required: true, message: "请输入图书名称", trigger: "blur" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        isbn: [
          { required: true, message: "请输入ISBN号", trigger: "blur" },
          { pattern: /^[0-9]{13}/, message: "请输入13位数字" },
        ],
        publisher: [
          { required: true, message: "请输入出版社", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          {
            pattern:
              /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入正确格式,可保留两位小数",
          },
        ],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        edition_date: [
          { required: true, message: "请选择版次日期", trigger: "blur" },
        ],
        edition_number: [
          { required: true, message: "请输入版次次序", trigger: "blur" },
          { type: "number", message: "版次次序必须为数字" },
        ],
      },
    };
  },
  mounted() {
    this.$store.commit("setLastPage", "book_manage");
    // 获取当前页数据
    // this.getCurrentPageList();
    this.getCurrentTotalList();
    let that = this;
    // 监听屏幕的实时变化以改变搜索框的宽度达到适配部分pc 移动的目的。
    window.addEventListener("resize", function () {
      let queryWidth = document.documentElement.clientWidth;
      if (queryWidth < 768) {
        that.queryWidth = "30%";
        that.dialogWidth = "75%";
      } else {
        that.queryWidth = "55%";
        that.dialogWidth = "50%";
      }
    });
  },
  methods: {
    // 获取数据库图书数据,根据查询条件
    getCurrentTotalList() {
      let that = this;
      this.$axios({
        method: "post",
        url: "/book_manage/query_book",
        data: {
          queryObject: that.queryObject,
          keyword: that.keyword,
        },
      })
        .then(function (res) {
          // 查询成功
          if (res.data["status"] === 200) {
            that.currentTotalData = res.data["data"]["book_list"];
            that.getCurrentPageList();
          } else {
            that.$showMsg(res.data["statusInfo"]["detail"], "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 改变pageSize触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCurrentPageList();
    },
    // 改变当前页触发
    handleCurrentChange(val) {
      this.currentPage = val;
      // 获取当前页数据
      this.getCurrentPageList();
    },
    // 得到当前页数据
    getCurrentPageList() {
      let begin = (this.currentPage - 1) * this.pageSize;
      let end = this.currentPage * this.pageSize;
      this.currentPageData = this.currentTotalData.slice(begin, end);
    },
    // 改变搜索条件
    changeOption(cmd) {
      this.queryObject = cmd;
    },
    // 点击搜索
    queryBooks() {
      var arr = [];
      for (var i = 0; i < this.book_list.length; i++) {
        if (this.book_list[i][this.queryObject].indexOf(this.keyword) >= 0) {
          arr.push(this.book_list[i]);
        }
      }
      this.currentTotalData = arr;
      // 获取当前页数据
      this.getCurrentPageList();
    },
    // 添加图书提交给后端
    onSubmitAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this;
          this.$axios({
            method: "post",
            url: "/book_manage/add_book",
            data: that.addForm,
          })
            .then(function (res) {
              if (res.data["status"] === 200) {
                that.$showMsg("添加图书成功", "success");
                // 提交后重置表单
                that.resetForm(formName);
                // 关闭dialog
                that.closeDialog();
              } else {
                that.$showMsg(res.data["statusInfo"]["detail"], "error");
              }
            })
            .catch((err) => {
              // 关闭dialog
              that.closeDialog();
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 关闭dialog
    closeDialog() {
      this.dialogAddForm = false;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #4585e1;
}
/* 用于当td数据放不下时,强行换行 */
td {
  text-align: center;
  word-break: break-all;
  word-wrap: break-word;
}
.item {
  background-color: rgb(225, 248, 254);
}
.font {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
}
.table_line {
  border: 1px solid #ccc;
}
.el-button {
  background-color: skyblue;
}
.el-button + .el-button {
  margin: 0;
}
/* 搜索下拉框样式 */
.query-link {
  display: inline-block;
  line-height: 1;
  cursor: pointer;
  background-color: rgba(189, 218, 230, 0.7);
  text-align: center;
  box-sizing: border-box;
  margin: 0;
  font-weight: 500;
  padding: 12px 20px;
  border-radius: 4px;
  width: 100%;
}
.el-dropdown-menu__item:hover {
  background-color: skyblue;
  color: blue;
}
.el-dropdown-menu {
  background-color: rgba(189, 218, 230, 0.7);
  margin: 0;
}
.el-input {
  width: 70%;
}
</style>