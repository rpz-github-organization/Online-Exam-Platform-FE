<template>
  <div class="body">
    <div class="main">
      <div class="name">{{ course.exam_name }}</div>
      <div class="row">
        <div>课目：{{ course.name }}</div>
        <div>学分：{{ course.credit }} 学分</div>
        <div>学时：{{ course.school_hour }} 学时</div>
        <div>考试分数：{{ course.score }} 分</div>
        <div>平均分：{{ course.common_score }} 分</div>
        <div>卷面分占比：{{ course.exam_proportion }}</div>
        <div>参加考试人数：{{ course.stu_num }} 人</div>
        <div class="status">
          考试状态：
          <div class="orange" v-if="course.status == 0">
            <img src="../assets/exam_status/orange.png" /> 考试未开始
          </div>
          <div class="green" v-if="course.status == 1">
            <img src="../assets/exam_status/green.png" /> 考试进行中
          </div>
          <div class="blue" v-if="course.status == 2">
            <img src="../assets/exam_status/blue.png" /> 考试已完成（已评分）
          </div>
          <div class="red" v-if="course.status == 3">
            <img src="../assets/exam_status/red.png" /> 考试已结束（未评分）
          </div>
        </div>
      </div>
    </div>
    <div class="goExam">
      <button class="goToExam" @click="goToExam">考试管理</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['coId']),
  },

  data() {
    return {
      course: {
        exam_name: 'Firset Examination of Chinese',
        name: 'Chinese',
        credit: 3,
        school_hour: 4,
        score: 100,
        common_score: 65,
        exam_proportion: '70%',
        stu_num: 66,
        status: 1,
      },
    };
  },
  methods: {
    goToExam() {
      window.location.href = '/-------'; // 考试管理
    },
    async getTeaExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/--------`, {
          co_id: this.coId,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log(info.data);
          this.course = info.data;
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getTeaExamInfo();
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
    height: 65%;
    width: 50%;
    padding-left: 80px;
    padding-right: 80px;
    padding-top: 30px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .name {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .row {
      font-size: 17px;
      display: flex;
      flex-direction: column;
      text-align: start;
      div {
        margin-bottom: 15px;
      }
      .status {
        display: flex;
        flex-direction: row;
        img {
          width: 20px;
        }
        .green {
          color: green;
        }
        .orange {
          color: orange;
        }
        .red {
          color: red;
        }
        .blue {
          color: blue;
        }
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
}
</style>
