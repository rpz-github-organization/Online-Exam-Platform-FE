<template>
  <div id="program">
    <el-card class="question_card">
      <div class="ques_row">
        <label class="ques_label">题目:</label>
        <el-input type="textarea" placeholder="请输入题目" v-model="question" autosize></el-input>
      </div>
      <div class="ques_row">
        <div class="left">
          <label>标准样例:</label>
          <button class="add" @click="Addstd()">添加</button>
        </div>
        <div class="example">
          <label>样例输入</label>
          <el-input
            v-for="(item, index) in answer_input"
            :key="item.index"
            type="textarea"
            v-model="answer_input[index]"
            class="std"
            autosize
          ></el-input>
          <label>样例输出</label>
          <el-input
            v-for="(it, index) in answer_output"
            :key="it.index"
            type="textarea"
            v-model="answer_output[index]"
            class="std"
            autosize
          ></el-input>
          <label>注：一个输入框为一个输入/输出，若本题无输入，不填样例输入</label>
        </div>
      </div>
      <div class="ques_row">
        <label class="ques_label">提示:</label>
        <el-input type="textarea" placeholder="请输入提示语句" v-model="tip" autosize></el-input>
      </div>
      <el-divider></el-divider>
      <div class="ques_row">
        <label class="ques_label">分值:</label>
        <el-input placeholder="请输入选项" v-model="score" clearable></el-input>
      </div>
      <div class="ques_row">
        <label class="ques_label">知识点:</label>
        <el-input placeholder="请输入知识点" v-model="tag" clearable></el-input>
      </div>
      <div>
        <button @click="SubmitProgram()">提交</button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'program',
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
  watch: {
    score(val, oldval) {
      if (val !== oldval) {
        this.isChange = true;
      }
    },
  },
  created() {
    if (this.ques) {
      console.log(this.ques);
      this.question = this.ques.question;
      const input = [];
      const output = [];
      this.ques.test_case.forEach(element => {
        input.push(element.input);
        output.push(element.output);
      });
      this.answer_input = input;
      this.answer_output = output;
      this.tag = this.ques.tag;
      this.tip = this.ques.tip;
      this.score = this.ques.score;
      this.questionid = this.ques.question_id;
    }
  },
  data() {
    return {
      lans: [
        {
          value: 'C',
        },
        {
          value: 'C++',
        },
        {
          value: 'Java',
        },
        {
          value: 'Python2',
        },
        {
          value: 'Python3',
        },
      ],

      question: '',
      answer_input: [''],
      answer_output: [''],
      tea_id: '',
      tip: '',
      tag: '',
      type: '',
      test_case: [],
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
      this.$router.push('/');
    },
    // isSubmit() {
    //   let res = true;
    //   if (!this.question) {
    //     res = false;
    //   } else if (!this.tag) {
    //     res = false;
    //   } else if (!this.answer_input) {
    //     res = false;
    //   } else if (!this.answer_output) {
    //     res = false;
    //   }
    //   return res;
    // },

    Addstd() {
      this.answer_input.push('');
      this.answer_output.push('');
    },

    testCase() {
      this.test_case = [];
      const len = this.answer_output.length;
      for (let i = 0; i < len; i += 1) {
        this.test_case.push({
          input: this.answer_input[i],
          output: this.answer_output[i],
        });
      }
    },

    async getInfo() {
      if (this.questionid === null) {
        try {
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: this.type,
            question: this.question,
            tag: this.tag,
            tip: this.tip,
            tea_id: this.uid,
            test_case: this.test_case,
          });
          const info = res.data;
          if (info.code === 200) {
            this.questionid = info.data;
            const quesid = parseInt(this.questionid, 10);
            const scoreN = parseInt(this.score, 10);
            try {
              const response = await this.$axios.post(
                `${this.HOST}/exam/addQuestionToExam`,
                {
                  type: this.type,
                  question_id: quesid,
                  num: this.index + 1,
                  score: scoreN,
                  exam_id: this.examId,
                }
              );
              const infom = response.data;
              if (infom.code === 200) {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  offset: 70,
                });
              }
            } catch (error) {
              this.$message({
                message: '系统异常',
                type: 'error',
                offset: 70,
              });
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
          const response = await this.$axios.post(
            `${this.HOST}/exam/addQuestionToExam`,
            {
              type: this.type,
              question_id: quesid,
              num: this.index + 1,
              score: scoreN,
              exam_id: this.examId,
            }
          );
          const info = response.data;
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
      } else {
        try {
          const quesid = parseInt(this.questionid, 10);
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: this.type,
            question_id: quesid,
            question: this.question,
            tag: this.tag,
            tip: this.tip,
            tea_id: this.uid,
            test_case: this.test_case,
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
    async SubmitProgram() {
      if (this.answer_input) {
        this.type = 'Normal_Program';
      } else {
        this.type = 'SpecialJudge_Program';
      }
      this.testCase();
      // console.log(this.test_case);
        //检查必填项
      if (this.existNull()) {
        this.$message({
          message: '题目内容不完整，请检查！',
          type: 'error',
          offset: 70,
        });
        return;
      }
      if (!this.tag||!this.answer_input||!this.answer_output) {
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

<style lang="less">
#program {
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

    .left {
      width: 15%;
      display: flex;
      flex-direction: column;

      label {
        padding: 5px;
        text-align: left;
      }
      .add {
        width: 50px;
        margin-left: 20%;
        border-radius: 5px;
      }
    }
    .select {
      width: 100%;
    }
    .ques_label {
      width: 15%;
      padding: 5px;
      text-align: left;
    }
    .example {
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        text-align: left;
        font-weight: bold;
        padding: 10px 0;
      }
      .std {
        margin-bottom: 10px;
        .el-textarea__inner {
          background-color: #dcdddd;
          font-weight: bold;
        }
      }
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
