<template>
  <div>
    <h2 class="label-font">个人信息</h2>
    <el-divider></el-divider>
    <!-- 学生部分 -->
    <table
      width="100%"
      border="0"
      cellpadding="5"
      cellspacing="1"
      style="padding: 8px"
      v-if="$store.state.userInfo.loginObject === 'student'"
    >
      <!-- 视口<768隐藏 -->
      <tbody class="hidden-xs-only">
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>证件号: {{ $store.state.userInfo.id }}</span>
          </td>
          <td>
            <span>条码号: {{ $store.state.userInfo.id }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span v-if="$store.state.userInfo.sex === 0">性别: 男</span>
            <span v-else>性别: 女</span>
          </td>
          <td>
            <span>邮箱: {{ $store.state.userInfo.email }}</span>
          </td>
          <td>
            <span>电话: {{ $store.state.userInfo.tel }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>学院: {{ $store.state.userInfo.department }}</span>
          </td>
          <td>
            <span>班级: {{ $store.state.userInfo.class }}</span>
          </td>
          <td>
            <span>身份: 学生</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>最大可借图书: {{ $store.state.userInfo.maxcount }}</span>
          </td>
          <td>
            <span
              >累计借阅数: {{ $store.state.userInfo.total_borrow_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>挂失次数: {{ $store.state.userInfo.total_loss_cnt }}</span>
          </td>
          <td>
            <span
              >超时次数: {{ $store.state.userInfo.total_overtime_cnt }}</span
            >
          </td>
          <td>
            <span>罚款金额: {{ $store.state.userInfo.total_fine }}</span>
          </td>
        </tr>
        <tr></tr>
      </tbody>
      <!-- 视口>=768隐藏 -->
      <tbody class="hidden-sm-and-up">
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>证件号: {{ $store.state.userInfo.id }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>条码号: {{ $store.state.userInfo.id }}</span>
          </td>
          <td>
            <span v-if="$store.state.userInfo.sex === 0">性别: 男</span>
            <span v-else>性别: 女</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>邮箱: {{ $store.state.userInfo.email }}</span>
          </td>
          <td>
            <span>电话: {{ $store.state.userInfo.tel }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>学院: {{ $store.state.userInfo.department }}</span>
          </td>
          <td>
            <span>班级: {{ $store.state.userInfo.class }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>身份: 学生</span>
          </td>
          <td>
            <span>最大可借图书: {{ $store.state.userInfo.maxcount }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span
              >累计借阅数: {{ $store.state.userInfo.total_borrow_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>挂失次数: {{ $store.state.userInfo.total_loss_cnt }}</span>
          </td>
          <td>
            <span
              >超时次数: {{ $store.state.userInfo.total_overtime_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>罚款金额: {{ $store.state.userInfo.total_fine }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 教师部分 -->
    <table
      width="100%"
      border="0"
      cellpadding="5"
      cellspacing="1"
      style="padding: 8px"
      v-else-if="$store.state.userInfo.loginObject === 'teacher'"
    >
      <!-- 视口<768隐藏 -->
      <tbody class="hidden-xs-only">
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>证件号: {{ $store.state.userInfo.id }}</span>
          </td>
          <td>
            <span>条码号: {{ $store.state.userInfo.id }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span v-if="$store.state.userInfo.sex === 0">性别: 男</span>
            <span v-else>性别: 女</span>
          </td>
          <td>
            <span>邮箱: {{ $store.state.userInfo.email }}</span>
          </td>
          <td>
            <span>电话: {{ $store.state.userInfo.tel }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>学院: {{ $store.state.userInfo.department }}</span>
          </td>
          <td>
            <span>身份: 教师</span>
          </td>
          <td>
            <span>最大可借图书: {{ $store.state.userInfo.maxcount }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>最大预约图书: {{ $store.state.userInfo.maxorder }}</span>
          </td>
          <td>
            <span
              >累计借阅数: {{ $store.state.userInfo.total_borrow_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>累计预约数: {{ $store.state.userInfo.total_order_cnt }}</span>
          </td>
          <td>
            <span
              >当前预约数: {{ $store.state.userInfo.current_order_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>挂失次数: {{ $store.state.userInfo.total_loss_cnt }}</span>
          </td>
          <td>
            <span
              >超时次数: {{ $store.state.userInfo.total_overtime_cnt }}</span
            >
          </td>
          <td>
            <span>罚款金额: {{ $store.state.userInfo.total_fine }}</span>
          </td>
        </tr>
        <tr></tr>
      </tbody>
      <!-- 视口>=768隐藏 -->
      <tbody class="hidden-sm-and-up">
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>证件号: {{ $store.state.userInfo.id }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>条码号: {{ $store.state.userInfo.id }}</span>
          </td>
          <td>
            <span v-if="$store.state.userInfo.sex === 0">性别: 男</span>
            <span v-else>性别: 女</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>邮箱: {{ $store.state.userInfo.email }}</span>
          </td>
          <td>
            <span>电话: {{ $store.state.userInfo.tel }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>学院: {{ $store.state.userInfo.department }}</span>
          </td>
          <td>
            <span>身份: 教师</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>最大可借图书: {{ $store.state.userInfo.maxcount }}</span>
          </td>
          <td>
            <span>最大预约图书: {{ $store.state.userInfo.maxorder }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span
              >累计借阅数: {{ $store.state.userInfo.total_borrow_cnt }}</span
            >
          </td>
          <td>
            <span
              >当前借阅数: {{ $store.state.userInfo.current_borrow_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>累计预约数: {{ $store.state.userInfo.total_order_cnt }}</span>
          </td>
          <td>
            <span
              >当前预约数: {{ $store.state.userInfo.current_order_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>挂失次数: {{ $store.state.userInfo.total_loss_cnt }}</span>
          </td>
          <td>
            <span
              >超时次数: {{ $store.state.userInfo.total_overtime_cnt }}</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <span>罚款金额: {{ $store.state.userInfo.total_fine }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 管理员部分 -->
    <table
      width="100%"
      border="0"
      cellpadding="5"
      cellspacing="1"
      style="padding: 8px"
      v-else
    >
      <tbody>
        <tr>
          <td>
            <span>姓名: {{ $store.state.userInfo.name }}</span>
          </td>
          <td>
            <span>账号: {{ $store.state.userInfo.id }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>身份: 管理员</span>
          </td>
          <td>
            <span> 电话: {{ $store.state.userInfo.tel }} </span>
          </td>
        </tr>
        <tr>
          <td>
            <span> 邮箱: {{ $store.state.userInfo.email }} </span>
          </td>
        </tr>
      </tbody>
    </table>
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
td {
  /* padding: 2px 5px; */
}
span {
  font-size: 1.6rem;
  /* background-color: #fff; */
}
</style>