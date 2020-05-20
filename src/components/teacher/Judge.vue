<template>
  <div id="judge">
    <el-card class="question_card">
      <div class="ques_row">
        <label class="ques_label">题目:</label>
        <el-input placeholder="请输入题目" v-model="question" type="textarea" autosize></el-input>
      </div>
      <div class="ques_row flex as-center">
        <label class="ques_label">答案:</label>
        <el-radio v-model="answer" label="true">正确</el-radio>
        <el-radio v-model="answer" label="false">错误</el-radio>
      </div>
      <el-divider></el-divider>
      <div class="ques_row">
        <label class="ques_label">知识点:</label>
        <el-input placeholder="请输入知识点" v-model="tag" clearable></el-input>
      </div>
      <div>
        <button @click="SubmitJudge()">提交</button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'judge',
  props: {
    index: {
      type: Number,
      required: true,
    },
    score: {
      type: String,
      required: false,
    },
    ques: {
      required: false,
    },
  },
  computed: {
    ...mapState(['uid']),
    ...mapState(['examId']),
  },
  created() {
    if (this.ques) {
      // console.log(this.ques);
      this.question = this.ques.question;
      this.answer = this.ques.answer;
      this.tag = this.ques.tag;
      this.questionid = this.ques.question_id;
    }
  },
  data() {
    return {
      ans: [
        {
          value: 'true',
        },
        {
          value: 'false',
        },
      ],
      question: '',
      answer: '',
      tea_id: '',
      tag: '',
      questionid: null,
      isChange: false,
    };
  },
  watch: {
    score(val, oldval) {
      if (val !== oldval) {
        this.isChange = true;
      }
    },
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
    // isSubmit() {
    //   let res = true;
    //   if (!this.question) {
    //     res = false;
    //   } else if (!this.tag) {
    //     res = false;
    //   } else if (!this.answer) {
    //     res = false;
    //   }
    //   return res;
    // },
    async getInfo() {
      if (this.questionid === null) { // 当questionid为null，即此题未提交过，调用两个接口
        try {
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: 'Judge',
            question: this.question,
            answer: this.answer,
            tag: this.tag,
            tea_id: this.uid,
          });
          const info = res.data;
          // console.log(info);
          if (info.code === 200) {
            this.questionid = info.data;
            const quesid = parseInt(this.questionid, 10);
            const scoreN = parseInt(this.score, 10);
            // console.log(this.questionid);
            try {
              // console.log(this.examId);
              const response = await this.$axios.post(
                `${this.HOST}/exam/addQuestionToExam`,
                {
                  type: 'Judge',
                  question_id: quesid,
                  num: this.index + 1,
                  score: scoreN,
                  exam_id: this.examId,
                }
              );
              const inFo = response.data;
              if (inFo.code === 200) {
                this.$message({
                  message: '提交成功',
                  type: 'success',
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
      } else if (this.isChange) { // 当小题分值变化，调用addQuestionToExam接口
        const quesid = parseInt(this.questionid, 10);
        const scoreN = parseInt(this.score, 10);
        // console.log(this.questionid);
        try {
          const response = await this.$axios.post(
            `${this.HOST}/exam/addQuestionToExam`,
            {
              type: 'Judge',
              question_id: quesid,
              num: this.index + 1,
              score: scoreN,
              exam_id: this.examId,
            }
          );
          const inFo = response.data;
          if (inFo.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success',
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
      } else { // 已经出过的题目再次修改，只调用addQuestion
        try {
          const quesid = parseInt(this.questionid, 10);
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: 'Judge',
            question_id: quesid,
            question: this.question,
            answer: this.answer,
            tag: this.tag,
            tea_id: this.uid,
          });
          const info = res.data;
          if (info.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success',
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
    existNull() {
      if (!this.question) {
        return true;
      }
      if (!this.answer) {
        return true;
      }
      return false;
    },
    async SubmitJudge() {
      //检查必填项
      if (this.existNull()) {
        this.$message({
          message: '题目内容不完整，请检查！',
          type: 'error',
          offset: 70,
        });
        return;
      }
      // console.log(this.questionid);
      if (!this.tag) {
        this.$alert('本道题还有未填写部分，您确定要提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: true,
        })
          .then(async () => {
            await this.getInfo();
            this.isChange = false;
          })
          .catch(() => {});
      } else {
        // 填写完整直接提交。
        await this.getInfo();
        this.isChange = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#judge {
  display: flex;
  margin: 10px 5px 30px 5px;

  .question_card {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .ques_row {
    display: flex;
    flex-direction: row;
    margin: 10px;

    .select {
      width: 100%;
    }
    .ques_label {
      width: 15%;
      padding: 5px;
      text-align: left;
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
  }
  button:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
  }
}
</style>
