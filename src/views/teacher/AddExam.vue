<template>
  <div id="AddExam">
    <label class="title">建立考试</label>
    <el-card class="exam_info">
      <div class="exam_row">
        <label class="examtitle">考试名称</label>
        <el-input placeholder="请输入题目" v-model="examTitle" clearable></el-input>
      </div>
      <div class="exam_row">
        <label class="examtitle">考试时间</label>
        <div class="date">
          <el-date-picker
            v-model="date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择日期时间"
          ></el-date-picker>
          <div class="con">
            <span class="title min">考试时长</span>
            <el-input v-model="examTime" placeholder="请输入考试时长" clearable></el-input>
            <span class="dan">分钟</span>
          </div>
        </div>
      </div>
      <div>
        <button @click="backToCourseDetail" style="backgroundColor:grey">返回</button>
        <button @click="submitExam">提交</button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AddExam',
  data() {
    return {
      examTitle: '',
      date: '',
      examTime: '',
    };
  },
  created() {
    console.log(this.coId);
  },
  computed: {
    ...mapState(['uid']),
    ...mapState(['coId']),
  },
  methods: {
    sessionJudge() {
      localStorage.setItem('Login', 'false');
      this.$message({
        message: '登录过期，请重新登录',
        type: 'error',
        offset: 70,
      });
      this.$router.push('/');
    },
    isAll() {
      if (!this.examTitle) {
        this.$message({
          message: '考试名称不能为空',
          type: 'error',
          offset: 70,
        });
        return false;
      }
      if (!this.date) {
        this.$message({
          message: '考试时间不能为空',
          type: 'error',
          offset: 70,
        });
        return false;
      }
      if (!this.examTime) {
        this.$message({
          message: '考试时长不能为空',
          type: 'error',
          offset: 70,
        });
        return false;
      }
      return true;
    },
    async submitExam() {
      console.log(this.date);
      const date = new Date(this.date.replace(/-/g, '/'));
      const lastTime = parseInt(this.examTime, 10);
      if (this.isAll()) {
        try {
          const res = await this.$axios.post(`${this.HOST}/exam/addExam`, {
            name: this.examTitle,
            co_id: this.coId,
            tea_id: this.uid,
            begin_time: date.valueOf(),
            last_time: lastTime,
          });
          const info = res.data;
          // console.log(info.data);
          if (info.code === 200) {
            // console.log(info.data);
            this.$store.dispatch('set_examId', info.data);
            // console.log(this.examId);
            window.location.href = './AddQuestion';
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
      }
    },
    backToCourseDetail(){
       window.location.href = '/TeaCourseDetail';
    }
  },
};
</script>

<style lang="less" scoped>
#AddExam {
  margin-top: 100px;
  display: flex;
  flex-direction: column;

  .title {
    color: #324e6c;
    font-weight: bold;
  }
  .exam_info {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: 20px 25%;

    .exam_row {
      display: flex;
      flex-direction: row;
      margin: 10px 5px;

      .examtitle {
        font-weight: bold;
        width: 20%;
        text-align: left;
        margin-top: 5px;
        color: #5d6670;
      }
      .date {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }
      .con {
        display: flex;
        flex-direction: row;
      }
      .min {
        width: 50%;
        margin: 10px 5px 10px 30px;
        color: #5d6670;
      }
      .dan {
        margin: 10px;
        width: fit-content;
        min-width: 40px;
      }
    }
    button {
      color: white;
      margin: 10px 0;
      font-weight: bold;
      border: none;
      border-radius: 10px;
      padding: 5px 10px;
      width: 80px;
      font-size: 15px;
      background-color: #5379a5c4;
      cursor: pointer;
      outline: none;
      margin: 10px;
    }
    button:hover {
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
  }
}
</style>
