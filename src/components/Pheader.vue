<template>
  <div id="pheader" class="flex jy-end">
    <ul class="header_list">
      <div class="flex jy-center as-center title" @click="GoIndex">
        <img src="../assets/sicnulogo.jpeg" alt />
        <b>四川师范大学 · SICNU</b>
      </div>
      <div class="flex jy-center as-center">
        <ul class="func">
          <li v-if="authLevel>=0 && authLevel<=99">
            <el-link
              class="black-hover-bold"
              type="info"
              :href="authLevel === 0 ? '/IndexStu' : '/IndexTch'"
            >首页</el-link>
          </li>
          <li v-if="authLevel===0">
            <el-link class="black-hover-bold" type="info" href="/SelectCourse">选课中心</el-link>
          </li>
          <!-- <li v-else-if="authLevel>0 && authLevel<=99">
          <el-link type="info">课程管理</el-link>
          </li>-->
          <li v-if="authLevel===0">
            <el-link class="black-hover-bold" type="info" href="/GradesCenter_Stu">成绩中心</el-link>
          </li>
          <li v-if="authLevel>0 && authLevel<=99">
            <el-link class="black-hover-bold" type="info" href="/GradesCenter_tch">课程成绩中心</el-link>
          </li>
          <!-- <li v-if="authLevel===0">
          <el-link type="info">错题本</el-link>
          </li>-->
          <li v-if="authLevel===99">
            <el-link class="black-hover-bold" type="info">权限管理</el-link>
          </li>
        </ul>
        <li class="user_photo" @click.stop="handlemenu">
          <el-dropdown @command="handleCommand">
            <img src="../assets/head_stu.jpg" class="head" v-if="this.authLevel === 0 " />
            <img src="../assets/head_tch.jpg" class="head" v-else />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="modify">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'pheader',
  data() {
    return {
      avatarUrl: '../assets/head_stu.jpg',
    };
  },
  // created() {
  //   console.log(this.authLevel);
  // },
  computed: {
    ...mapState(['uid']),
    ...mapState(['authLevel']),
  },
  methods: {
    GoIndex() { // 点击左上角返回主页
      if (this.authLevel ===0 ) {
        window.location.href = '/indexStu';
      } else {
        window.location.href = '/indexTch';
      }
    },
    handleCommand(command) { // 选择个人中心或退出登录
      if (command === 'modify') {
        if (this.authLevel === 0) {
          window.location.href = '/personalStu';
        } else if (this.authLevel > 0 && this.authLevel < 99) {
          window.location.href = '/personalTch';
        }
      } else if (command === 'logout') {
        // console.log(this.uid);
        this.$axios
          .post(`${this.HOST}/login/logout`, {
            keyword: this.uid,
          })
          .then(res => {
            const info = res.data;
            if (info.code === 200) {
              this.$store.dispatch('set_authLevel', 0);
              sessionStorage.setItem('Login', 'false');
              this.$store.dispatch('set_Login', 'false');
              window.location.href = '/';
            } else {
              console.log('操作失败');
            }
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#pheader {
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 9000;
  background-color: whitesmoke;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);

  .header_list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    img {
      width: 40px;
      border-radius: 50%;
    }
    b {
      margin-left: 20px;
      font-size: 22px;
    }

    .func {
      display: flex;
      text-align: right;
      line-height: 40px;
    }
    li {
      display: inline-block;
      margin-right: 20px;
    }
  }
  .title {
    cursor: pointer;
  }
}

.header_list {
  align-items: center;
}
.header_title {
  float: left;
  font-size: 30px;
  color: #909399;
}
.user_photo {
  float: right;

  img {
    cursor: pointer;
    border-radius: 50%;
  }

  .head {
    width: 40px;
    height: 40px;
  }
}
</style>
