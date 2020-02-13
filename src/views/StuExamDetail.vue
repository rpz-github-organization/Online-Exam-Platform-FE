<template>
  <div class="body">
    <div class="main" v-for="(exam,index) in exams" :key="index">
      <div class="name">{{ exam.name }}</div>
      <div class="row">
        <div>考试科目：{{ exam.co_name }}</div>
        <div>任课老师：{{ exam.tea_name }}</div>
        <div>考试开始时间：{{ exam.begin_time }}</div>
        <div>考试时长：{{ exam.last_time }} 分钟</div>
      </div>
    </div>
    <div class="goExam">
      <button class="goToExam" @click="goToExam" v-if="this.status">参加考试</button>
      <button class="goToExam" :class="{ grey: !this.status}" v-if="!this.status">考试还未开始</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['uid']),
    ...mapState(['examId']),
  },

  data() {
    return {
      status: '',
      exams: '',
    };
  },
  methods: {
    goToExam() {
      window.location.href = '/StuQuestion';
    },
    async getStuExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/homePage/stu/-----`, {
          stu_id: this.uid,
          exam_id: this.examId,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log(info.data);
          this.exams = info.data;
          this.timestampToDate();
        }
        console.log('请求失败');
      } catch (err) {
        console.log(err);
      }
    },
    timestampToDate() {
      this.exams.forEach((item) => {
        const timestamp = item.begin_time;
        const newDate = new Date();
        newDate.setTime(timestamp);
        // eslint-disable-next-line no-param-reassign
        item.begin_time = newDate.toLocaleString();
        this.status = item.status;
      });
      console.log(this.exams);
    },
  },
  mounted() {
    this.getStuExamInfo();
  },
};
</script>

<style scoped lang="less">
.body {
  height: 100%;
  padding-top: 20px;
  background: url('../assets/index_background_stu.gif');

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
    cursor: default;
    box-shadow: 0px 0px 0px;
  }
}
</style>
