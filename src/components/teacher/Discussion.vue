<template>
  <div id="discussion">
    <el-card class="question_card">
      <div class="ques_row">
        <label class="ques_label">题目:</label>
        <el-input
        type="textarea"
        placeholder="请输入题目"
        v-model="question"
        autosize>
        </el-input>
      </div>
      <div class="ques_row">
        <label class="ques_label">答案:</label>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          autosize
          v-model="answer">
        </el-input>
      </div>
      <el-divider></el-divider>
      <div class="ques_row">
        <label class="ques_label">分值:</label>
        <el-input
        placeholder="请输入选项"
        v-model="score"
        clearable>
        </el-input>
      </div>
      <div class="ques_row">
        <label class="ques_label">知识点:</label>
        <el-input
        placeholder="请输入知识点"
        v-model="tag"
        clearable>
        </el-input>
      </div>
      <div>
        <button @click="SubmitDiscussion()">submit</button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'discussion',
  computed: {
    ...mapState(['uid']),
    ...mapState(['examId']),
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    ques: {
      required: false,
    },
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
  watch: {
    score(val, oldval) {
      if (val !== oldval) {
        this.isChange = true;
      }
    },
  },
  data() {
    return {
      question: '',
      answer: '',
      tea_id: '',
      tag: '',
      questionid: null,
      score: null,
      isChange: false,
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
    isSubmit() {
      let res = true;
      if (!this.question) {
        res = false;
      } else if (!this.tag) {
        res = false;
      } else if (!this.answer) {
        res = false;
      }
      return res;
    },
    async getInfo() {
      if (this.questionid === null) {
        try {
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: 'Discussion',
            question: this.question,
            answer: this.answer,
            tag: this.tag,
            tea_id: this.uid,
          });
          const info = res.data;
          if (info.code === 200) {
            this.questionid = info.data;
            const quesid = parseInt(this.questionid, 10);
            const scoreN = parseInt(this.score, 10);
            try {
              const response = await this.$axios.post(`${this.HOST}/exam/addQuestionToExam`, {
                type: 'Discussion',
                question_id: quesid,
                num: this.index + 1,
                score: scoreN,
                exam_id: this.examId,
              });
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
      } else if (this.isChange) {
        const quesid = parseInt(this.questionid, 10);
        const scoreN = parseInt(this.score, 10);
        try {
          const response = await this.$axios.post(`${this.HOST}/exam/addQuestionToExam`, {
            type: 'Discussion',
            question_id: quesid,
            num: this.index + 1,
            score: scoreN,
            exam_id: this.examId,
          });
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
      } else {
        try {
          const quesid = parseInt(this.questionid, 10);
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: 'Discussion',
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
    async SubmitDiscussion() {
      console.log(this.answer);
      if (!this.isSubmit()) {
        this.$alert('本道题还有未填写部分，您确定要提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: true,
        }).then(async () => {
          await this.getInfo();
          this.isChange = false;
        }).catch(() => {
        });
      } else { // 填写完整直接提交。
        await this.getInfo();
        this.isChange = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#discussion{
  display: flex;
  margin: 10px 5px 30px 5px;

  .question_card{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .ques_row{
    display: flex;
    flex-direction: row;
    margin: 10px;

    .select{
        width: 100%;
    }
    .ques_label{
      width: 15%;
      padding: 5px;
      text-align: left;
    }
  }
  button{
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
  button:hover{
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
  }
}
</style>
