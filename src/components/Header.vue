<template>
  <div id="header">
    <ul class="header_list">
      <li class="header_title">考试系统</li>
      <li class="user_photo"  @click.stop="handlemenu">
        <el-dropdown @command="handleCommand">
          <el-avatar :size="40" :src="circleUrl" class="el-dropdown-link"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="modify">修改资料</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <ul class="func">
        <li v-if="authLevel===0"><el-link type="info">选课中心</el-link></li>
        <li v-else-if="authLevel>0 && authLevel<=99"><el-link type="info">课程管理</el-link></li>
        <li><el-link type="info">课程成绩中心</el-link></li>
        <li v-if="authLevel===0"><el-link type="info">错题本</el-link></li>
        <li v-else-if="authLevel>0 && authLevel<=99"><el-link type="info">评卷场</el-link></li>
        <li v-if="authLevel===99"><el-link type="info">权限管理</el-link></li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      circleUrl: 'https://tse2-mm.cn.bing.net/th/id/OIP.uC8OzPvFdPvVpsxjF7F8sQAAAA?w=206&h=170&c=7&o=5&dpr=1.25&pid=1.7',
      authLevel: 0,
      user_function: '',
    };
  },
  methods: {
    handleCommand(command) {
      this.user_function = command;
      console.log(this.user_function);
    },
  },
};
</script>

<style>
li{
  display: inline-block;
  margin-right: 20px;
}
.header_list{
  align-items: center;
}
.header_title{
  float: left;
  font-size: 30px;
  color: #909399;
}
.user_photo{
  float: right;
}
.func{
  text-align: right;
  line-height: 40px;
}
</style>
