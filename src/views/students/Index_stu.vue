<template>
  <div class="stu">
    <div class="page-title page-title-stu flex as-center">Online · Exam 在线考试系统</div>
    <div class="main">
      <div class="left">
        <button class="onExam" @click="ChangeToOn" :class="{ notactive: !isActive }">正在进行的考试</button>
        <button class="passExam" @click="ChangeToPass" :class="{ notactive: isActive }">已经结束的考试</button>
      </div>
      <div class="middle">
        <OnExam v-if="Seen" />
        <PassExam v-if="!Seen" />
      </div>
      <div class="right">
        <img v-if="male" src="../../assets/head_stu_male.png" />
        <img v-if="!male" src="../../assets/head_stu_female.png" />
        <div class="hello">
          {{ name }}同学
          <br />
          <br />现在是
          <br />
          {{ nowTime.toLocaleString("chinese", { hour12: false })
          .substring(0,new Date().toLocaleString("chinese", { hour12: false }).length-3) }}
          <br />
          <br />
          {{ greeting }}
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OnExam from './OnExam.vue';
import PassExam from './PassExam.vue';

export default {
  name: 'indexStu',

  components: {
    OnExam,
    PassExam,
  },
  mounted() {
    setInterval(() => {
      this.nowTime = new Date();
    }, 1000);
  },
  data() {
    return {
      nowTime: new Date(),

      name: '川师',
      greeting: '你好！',
      Seen: true,
      isActive: true,
      male: true,
      timer: '',
    };
  },

  methods: {
    ChangeToOn() {
      this.Seen = true;
      this.isActive = true;
    },
    sessionJudge() {
      localStorage.setItem('Login', 'false');
      this.$message({
        message: '登录过期，请重新登录',
        type: 'error',
        offset: 70,
      });
      this.$router.push('/');
    },

    ChangeToPass() {
      this.Seen = false;
      this.isActive = false;
    },
    async getStuNameAndSex() {
      try {
        const res = await this.$axios.get(
          `${this.HOST}/PersonalData/getStudent`,
          {}
        );
        const info = res.data;
        // console.log(info);
        if (info.code === 200) {
          const stuInfo = info.data;
          this.name = stuInfo.name;
          if (stuInfo.sex === 'female') this.male = false;
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
      } catch (err) {
        if (err.response.status === 401) {
          this.sessionJudge();
        } else {
          this.$message({
            message: '系统异常',
            type: 'error',
            offset: 70,
          });
        }
      }
    },
    changeTime() {
      const date = new Date(); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = `${date.getFullYear()}/`;
      const M = `${date.getMonth() + 1 < 12 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/`;
      const D = `${date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate()} `;
      const h = `${date.getHours() + 1 < 10 ? `0${date.getHours()}` : date.getHours()}:`;
      const m = `${date.getMinutes() + 1 < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
      return Y + M + D + h + m;
    },
  },

  beforeMount() {
    this.getStuNameAndSex();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },

  created() {
    console.log(localStorage.getItem('Login'));
    const d = new Date();
    if (d.getHours() < 12) this.greeting = '上午好！';
    else if (d.getHours() >= 12 && d.getHours() < 18)
      this.greeting = '下午好！';
    else this.greeting = '晚上好！';
    this.timer = setInterval(() => {
      this.nowTime = this.changeTime();
    }, 1000);
  },
};
</script>


<style scoped lang="less">
.stu {
  height: 100%;
  width: 100%;
  margin-top: 47px;
  background: url(../../assets/index_background_stu.gif);

  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: auto;
    width: 100%;
    background: url(../../assets/index_background_stu.gif);

    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 25px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      font-size: 16px;
      margin-top: 15px;
      margin-right: 50px;
      width: 170px;
      height: 230px;
      padding: 20px;
      flex-shrink: 0;
      background-color: rgba(255, 251, 251, 0.87);

      img {
        width: 60px;
      }
    }

    .middle {
      width: 100%;
      flex-shrink: 1;
    }

    .left {
      display: flex;
      margin-top: 10px;
      margin-right: 20px;
      margin-left: 50px;
      flex-direction: column;
      justify-content: flex-start;
      width: 150px;
      height: 100%;
      flex-shrink: 0;

      .onExam,
      .passExam {
        margin-top: 10px;
        color: black;
        // font-weight: bold;
        border: none;
        border-radius: 20px;
        padding: 5px 10px;
        width: 150px;
        height: 30px;
        font-size: 15px;
        line-height: 15px;
        background-color: #5379a563;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
      }

      .notactive {
        background: #5379a5c4;
        color: white;
        font-weight: bold;
        box-shadow: none;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      }
    }
  }
}
</style>
