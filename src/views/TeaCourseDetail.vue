<template>
  <div class="body">
    <div class="bodyimg">
      <div class="main">
        <div class="name">{{ course.name }}</div>
        <div class="detail">
          <div class="row">
            <div>教师：{{ course.teacherName }}</div>
            <div>学分：{{ course.credit }} 学分</div>
          </div>
          <div class="row">
            <div>学生人数：{{ course.stu_num }} 人</div>
            <div>学时：{{ course.school_hour }} 学时</div>
          </div>
        </div>
        <table class="table">
          <tr>
            <th style="padding-left: 25px;">考试名字</th>
            <th>考试时间</th>
            <th>考试时长</th>
            <th>考试状态</th>
          </tr>
          <tr class="exams" v-for="(exam,index) in exams" :key="index">
            <td>{{ exam.exam_name }}</td>
            <td>{{ exam.begin_time}}</td>
            <td>{{ exam.last_time }} 分钟</td>
            <td class="status">
              <div class="orange" v-if="exam.status == 0">
                <img src="../assets/exam_status/orange.png" /> 考试未开始
              </div>
              <div class="green" v-if="exam.status == 1">
                <img src="../assets/exam_status/green.png" /> 考试进行中
              </div>
              <div class="blue" v-if="exam.status == 2 && is_judge">
                <img src="../assets/exam_status/blue.png" /> 考试已完成（已评分）
              </div>
              <div class="red" v-if="exam.status == 2 && is_judge">
                <img src="../assets/exam_status/red.png" /> 考试已结束（未评分）
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="goExam">
        <button class="goToExam" @click="goToExam">考试管理</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['coId']),
    ...mapState(['uid']),
  },

  data() {
    return {
      course: '',
      exams: '',
    };
  },
  methods: {
    goToExam() {
      window.location.href = '/-------'; // 考试管理
    },
    async getTeaExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/course/getByTea`, {
          // co_id: this.coId,
          co_id: 1,
          tea_id: this.uid,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log(info.data);
          this.course = info.data;
          this.exams = this.course.exams;
          this.timestamp();
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
    timestamp() {
      this.exams.forEach((item) => {
        const timestamp = item.begin_time;
        const newDate = new Date();
        newDate.setTime(timestamp);
        // eslint-disable-next-line no-param-reassign
        item.begin_time = newDate.toLocaleString();
      });
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
  .bodyimg {
    background: url('../assets/index_background_stu.gif');

    .main {
      background-color: #fff;
      margin: 0px auto;
      // height: 60%;
      width: 50%;
      padding-left: 80px;
      padding-right: 80px;
      padding-top: 30px;
      padding-bottom: 30px;
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
      .detail {
        font-size: 18px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        text-align: start;
        .row {
          display: flex;
          flex-direction: column;

          div {
            margin-bottom: 15px;
            margin-left: 10px;
          }
        }
      }

      .table table {
        width: 90%;
        border: 0;
      }
      .table th {
        background-color: #adadad;
        color: #000000;
      }
      .table,
      .table th,
      .table td {
        font-size: 17px;
        text-align: center;
        padding: 4px;
        border-collapse: collapse;
      }
      table tr:first-child th:first-child {
        border-top-left-radius: 15px;
      }

      table tr:first-child th:last-child {
        border-top-right-radius: 15px;
      }
      table tr:last-child td:first-child {
        border-bottom-left-radius: 15px;
      }

      table tr:last-child td:last-child {
        border-bottom-right-radius: 15px;
      }
      .table tr {
        border: 1px solid #ffffff;

        .name {
          font-size: 16px;
        }

        .status {
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
      .table tr:nth-child(odd) {
        background-color: #adadad1e;
      }
      .table tr:nth-child(even) {
        background-color: #ffffff;
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
    margin-bottom: 30px;
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
