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
        <div>
          <el-button @click="AddExam()" class="button_sub">+ 添加考试</el-button>
        </div>
        <div class="exams">
          <div class="exam" v-for="(exam,index) in exams" :key="index">
            <div class="one">
              <div class="name">{{exam.exam_name}}</div>
              <div class="time">
                考试时间：{{ exam.begin_time }}
                <br />
                考试时长：{{exam.last_time}} 分钟
              </div>
            </div>
            <div class="two" @click="goToExam(exam.exam_id)">
              <div class="orange" v-if="exam.status == 0">
                <img src="../../assets/exam_status/orange.png" />考试未开始
              </div>
              <div class="green" v-if="exam.status == 1">
                <img src="../../assets/exam_status/green.png" />考试进行中
              </div>
              <div class="blue" v-if="exam.status == 2 && exam.is_judge">
                <img src="../../assets/exam_status/blue.png" />考试已完成（已评分）
              </div>
              <div class="red" v-if="exam.status == 2 && !exam.is_judge">
                <img src="../../assets/exam_status/red.png" /> 考试已结束(未评分)
              </div>
            </div>
          </div>
        </div>
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
    goToExam(examId) {
      console.log(examId);
      this.$store.dispatch('set_examId', examId);
      window.location.href = '/ExamInfo'; // 考试管理
    },
    AddExam() {
      window.location.href = '/AddExam';
    },
    async getTeaExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/course/getByTea`, {
          co_id: this.coId,
          // co_id: 1,
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
    goAddExam() {
      window.location.href = '/AddExam';
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
  background: url('../../assets/index_background_stu.gif');
  .bodyimg {
    padding-bottom: 10px;
    background: url('../../assets/index_background_stu.gif');

    .main {
      background-color: #fff;
      margin: 0px auto;
      width: 60%;
      padding-left: 80px;
      padding-right: 80px;
      padding-top: 30px;
      padding-bottom: 10px;
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
        }

        div {
          margin-bottom: 15px;
          margin-left: 10px;
        }
      }
      .button_sub{
        width: 150px;
        margin-bottom: 30px;
      }
      .exams {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        .exam {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-radius: 15px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
          margin-bottom: 10px;
          padding: 10px 20px;

          .one {
            display: flex;
            flex-direction: column;
            .name {
              font-size: 18px;
              text-align: start;
              margin-bottom: 5px;
            }
            .time {
              font-size: 16px;
              text-align: start;
            }
          }
          .two {
            margin: auto 0px;
            img {
              width: 20px;
            }
            button {
              margin-top: 10px;
              color: rgb(0, 0, 0);
              font-weight: bold;
              border: none;
              border-radius: 20px;
              padding: 5px 10px;
              width: 150px;
              // height: 90%;
              font-size: 15px;
              line-height: 25px;
              background-color: #5379a593;
              cursor: pointer;
              outline: none;
              transition: all 0.3s ease;
            }
            button:hover {
              box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
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
    }
  }
}
</style>
