<template>
  <div class="body">
    <div class="main">
      <div class="name">{{ exams.name }}</div>
      <div class="row">
        <div>考试科目：{{ exams.co_name }}</div>
        <div>任课老师：{{ exams.tea_name }}</div>
        <div>考试开始时间：{{ exams.begin_time }}</div>
        <div>考试时长：{{ exams.last_time }} 分钟</div>
      </div>
    </div>
    <div class="goExam">
      <button
        class="goToExam"
        @click="goToExam"
        v-if="exams.status==1 && exams.is_handIn === 0"
      >参加考试</button>
      <button
        class="goToExam"
        :class="{ grey: !exams.status}"
        @click="goBack"
        v-if="exams.status==0"
      >考试还未开始（点击返回）</button>
      <button
        class="goToExam"
        :class="{ grey: 'this.status == -1'}"
        @click="goBack"
        v-if="exams.status == -1 || exams.is_handIn === 1"
      >考试已结束（点击返回）</button>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['examId']),
  },

  data() {
    return {
      exams: '',
    };
  },
  methods: {
    sessionJudge() {
      localStorage.setItem('Login', 'false');
      this.$message({
        message: '登录过期，请重新登录',
        type: 'error',
        offset: 70,
      });
      window.location.href('/');
    },
    goToExam() {
      window.location.href = '/StuQuestion';
    },
    goBack() {
      window.location.href = '/IndexStu';
    },
    async getStuExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/stuExamInfo`, {
          exam_id: this.examId,
        });
        console.log(res);
        const info = res.data;
        if (info.code === 200) {
          // console.log(info.data)
          return info.data;
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
    async timestampToDate() {
      let exam = await this.getStuExamInfo();
      let timestamp = exam.begin_time;
      let newDate = new Date();
      newDate.setTime(timestamp);
      exam.begin_time = newDate.toLocaleString();
      this.exams = exam;
    },
  },
  mounted() {
    this.timestampToDate();
  },
};
</script>

<style scoped lang="less">
.body {
  height: 100%;
  padding-top: 20px;
  background: url('../../assets/index_background_stu.gif');

  .main {
    background-color: #fff;
    margin: 0px auto;
    height: 60%;
    width: 50%;
    padding-left: 80px;
    padding-right: 80px;
    padding-top: 60px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .name {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .row {
      font-size: 18px;
      display: flex;
      flex-direction: column;
      text-align: start;
      div {
        margin-bottom: 25px;
      }
    }
  }

  .goToExam {
    color: white;
    font-weight: bold;
    border: none;
    padding: 5px 30px;
    border-radius: 20px;
    margin-top: 20px;
    width: auto;
    height: 40px;
    font-size: 18px;
    background-color: #5379a5c4;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
  }
  .goToExam:hover {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.17);
  }
  .grey {
    color: rgba(255, 255, 255, 0.808);
    background-color: grey;
  }
  .grey:hover {
    box-shadow: 0px 0px 0px;
  }
}
</style>
