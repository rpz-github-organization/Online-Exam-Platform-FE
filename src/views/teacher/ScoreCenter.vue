<template>
  <div id="scoreCenter">
    <div class="head">
      <el-card>
        <label class="tip">
          尊敬的老师您好！
          <br />这里是问答题评分中心，左侧是参与本次考试所有学生的学号和姓名，请点击您想评分的学生进行评分，
          评分结束后记得及时提交，祝您阅卷愉快~
        </label>
      </el-card>
    </div>
    <div class="center">
      <div class="left">
        <el-card>
          <div class="stu_list">
            <label
              v-for="(item, index) in stuList"
              :key="item.id"
              class="stu_label"
              :class="{active:item.active}"
              @click="showStuQues(index)"
            >{{ item.id }} - {{ item.name }}</label>
          </div>
        </el-card>
      </div>
      <div class="right">
        <el-card>
          <div class="row">
            <label class="ing">考生：</label>
            <label class="answer ing">{{ this.id }}</label>
          </div>
          <div class="ques_list">
            <div class="ques_card" v-for="(item, index) in List" :key="index">
              <el-card>
                <div class="row">
                  <label>题目：</label>
                  <label class="answer">{{ item.ques }}</label>
                </div>
                <div class="row">
                  <label>学生答案：</label>
                  <label class="answer">{{ item.stuanswer }}</label>
                </div>
                <div class="row">
                  <label>参考答案：</label>
                  <label class="answer">{{ item.answer }}</label>
                </div>
                <div class="row">
                  <label>满分：</label>
                  <label class="answer">{{ item.score }}</label>
                </div>
                <div class="row">
                  <label>学生得分：</label>
                  <el-input size="small" v-model="score[index]"></el-input>
                </div>
              </el-card>
            </div>
          </div>
        </el-card>
        <button @click="SubmitScore()">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'scoreCenter',
  created() {
    this.getQues();
    // console.log(this.examId);
  },
  computed: {
    ...mapState(['examId']),
  },
  data() {
    return {
      stuList: [],
      stuAnswer: [],
      List: [],
      score: [],
      id: '',
      quesList: [],
      index: 0,
      timer: '',
    };
  },
  beforeDestroy() {
    clearTimeout(this.timer);
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
    async getQues() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/getDiscussion`, {
          exam_id: this.examId,
        });
        const info = res.data.data;
        // console.log(info);
        if (res.data.code === 200) {
          this.stuAnswer = info.stuInfo;
          const ques = info.question;
          ques.forEach(item => {
            this.List.push({
              ques: item.question,
              answer: item.answer,
              score: item.score,
              stuanswer: '',
            });
            this.quesList.push(item.question_id);
          });
          this.stuAnswer.forEach(item => {
            this.stuList.push({
              id: item.id,
              name: item.name,
              active: false,
            });
          });
        } else {
          this.$message({
            message: res.data.message,
            type: 'error',
            offset: 70,
          });
          this.timer = setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
      } catch (err) {
        // console.log(err);
        this.$message({
          message: '系统异常',
          type: 'error',  
          offset: 70,
        });
      }
    },
    showStuQues(index) {
      this.score = [];
      this.index = index;
      this.id = this.stuAnswer[index].id;
      const stuques = this.stuAnswer[index].question;
      for (let i = 0; i < this.List.length; i += 1) {
        this.List[i].stuanswer = stuques[i].answer;
      }
      const data = JSON.parse(sessionStorage.getItem(this.id));
      if (data) {
        this.score = data;
      }
    },
    async ScoreWhole() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/completeJudge`, {
          exam_id: this.examId,
        });
        const info = res.data;
        if (info.code === 200) {
          this.$router.push('/ExamInfo');
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    SubmitScore() {
      let isOk = false;
      for (let i = 0; i < this.score.length; i += 1) {
        if (this.score[i] > this.List[i].score) {
          isOk = false;
        } else {
          isOk = true;
        }
      }
      if (this.score.length < this.List.length) {
        this.$alert('您还有题目没有进行打分', '提示', {
          confirmButtonText: '确定',
        });
      }
      if (isOk) {
        sessionStorage.setItem(this.id, JSON.stringify(this.score));
        this.HandIn();
      } else {
        this.$message({
          message: '学生得分大于满分',
          type: 'error',
          offset: 70,
        });
      }
    },
    async HandIn() {
      const scoreList = [];
      for (let i = 0; i < this.score.length; i += 1) {
        const score = parseInt(this.score[i], 10);
        scoreList.push({
          question_id: this.quesList[i],
          score,
        });
        console.log(scoreList);
      }
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/handInScore`, {
          exam_id: this.examId,
          stu_id: this.id,
          scoreList,
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功',
            offset: 70,
          });
          this.stuList[this.index].active = true;
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
      } catch (err) {
        this.$message({
          message: '系统异常',
          type: 'error',
          offset: 70,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#scoreCenter {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  background: url(../../assets/index_background_tch.gif);

  .center {
    display: flex;
    flex-direction: row;
    margin: 30px 0;

  }
  .head {
    display: flex;
    justify-content: center;
    text-align: left;
  }
  .left {
    width: 300px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;

    .list_label {
      color: #1c3044;
      font-weight: bold;
    }
    .stu_list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: left;

      label {
        cursor: pointer;
      }
    }
    .stu_label {
      margin: 5px;
    }
  }
  .right {
    margin: 0 30px;
    width: 100%;
    .ques_card {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-bottom: 10px;
      label {
        font-weight: bold;
        width: 100px;
        bottom: 0;
      }
      .answer {
        font-weight: normal;
        width: 90%;
        margin-top: 3px;
        word-wrap: break-word;
      }
    }
    .row {
      display: flex;
      flex-direction: row;
      margin: 15px;
    }
    .ing {
      color: red;
    }
  }
  button {
    color: white;
    margin: 20px 0 10px 0;
    border: none;
    border-radius: 2px;
    padding: 5px 10px;
    width: 100px;
    font-size: 15px;
    background-color: #da6148;
    cursor: pointer;
    outline: none;
  }
  button:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
  }
  .active {
    color: red;
  }
}
</style>
