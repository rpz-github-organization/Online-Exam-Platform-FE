<template>
  <div id="program">
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
        <label class="ques_label">标准样例:</label>
        <div class="example">
          <label>样例输入</label>
          <el-input
          type="textarea"
          v-model="answer_input"
          class="std"
          autosize>
          </el-input>
          <label>样例输出</label>
          <el-input
          type="textarea"
          v-model="answer_output"
          class="std"
          autosize>
          </el-input>
        </div>
      </div>
      <div class="ques_row">
        <label class="ques_label">提示:</label>
        <el-input
        type="textarea"
        placeholder="请输入提示语句"
        v-model="tip"
        autosize>
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
        <button @click="SubmitProgram()">submit</button>
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
      lans: [{
        value: 'C',
      }, {
        value: 'C++',
      }, {
        value: 'Java',
      }, {
        value: 'Python2',
      }, {
        value: 'Python3',
      }],

      question: '',
      answer_input: '',
      answer_output: '',
      tea_id: '',
      tip: '',
      tag: '',
      questionid: null,
      score: null,
      isChange: false,
    };
  },
  methods: {
    isSubmit() {
      let res = true;
      if (!this.question) {
        res = false;
      } else if (!this.tag) {
        res = false;
      } else if (!this.answer_input) {
        res = false;
      } else if (!this.answer_output) {
        res = false;
      }
      return res;
    },
    async getInfo() {
      if (this.questionid === null) {
        try {
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: 'Program',
            question: this.question,
            input: this.answer_input,
            output: this.answer_output,
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
                type: 'Program',
                question_id: quesid,
                num: this.index + 1,
                score: scoreN,
                exam_id: this.examId,
              });
              const infom = response.data;
              if (infom.code === 200) {
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  offset: 70,
                });
              }
            } catch (error) {
              console.log(error);
            }
          }
        } catch (err) {
          console.log(err);
        }
      } else if (this.isChange) {
        const quesid = parseInt(this.questionid, 10);
        const scoreN = parseInt(this.score, 10);
        try {
          const response = await this.$axios.post(`${this.HOST}/exam/addQuestionToExam`, {
            type: 'Program',
            question_id: quesid,
            num: this.index + 1,
            score: scoreN,
            exam_id: this.examId,
          });
          const info = response.data;
          if (info.code === 200) {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: 70,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const quesid = parseInt(this.questionid, 10);
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: 'Program',
            question_id: quesid,
            question: this.question,
            input: this.answer_input,
            output: this.answer_output,
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
          console.log(err);
        }
      }
    },
    async SubmitProgram() {
      console.log(this.isChange);
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

<style lang="less">
#program{
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
    .example{
      display: flex;
      flex-direction: column;
      width: 100%;
      label{
        text-align: left;
        font-weight: bold;
        padding: 10px 0;
      }
      .std{
        .el-textarea__inner{
            background-color: #DCDDDD;
            font-weight: bold;
        }
      }
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
