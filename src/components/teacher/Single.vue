<template>
  <div id="single">
    <el-card class="question_card">
      <div class="ques_row">
        <label>题目:</label>
        <el-input placeholder="请输入题目" v-model="question" type="textarea" autosize></el-input>
      </div>
      <div class="ques_row">
        <label>选项A:</label>
        <el-input placeholder="请输入选项" v-model="option[0]" clearable></el-input>
      </div>
      <div class="ques_row">
        <label>选项B:</label>
        <el-input placeholder="请输入选项" v-model="option[1]" clearable></el-input>
      </div>
      <div class="ques_row">
        <label>选项C:</label>
        <el-input placeholder="请输入选项" v-model="option[2]" clearable></el-input>
      </div>
      <div class="ques_row">
        <label>选项D:</label>
        <el-input placeholder="请输入选项" v-model="option[3]" clearable></el-input>
      </div>
      <div class="ques_row">
        <label>答案:</label>
        <el-select v-model="answer" class="select">
          <el-option v-for="item in ans" :key="item.valuse" :label="item.value" :value="item.value"></el-option>
        </el-select>
      </div>
      <el-divider></el-divider>
      <div class="ques_row">
        <label>知识点:</label>
        <el-input placeholder="请输入知识点" v-model="tag" clearable></el-input>
      </div>
      <div>
        <button @click="SubmitSingle()">提交</button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'single',
  props: {
    index: {
      type: Number,
      required: true,
    },
    score: {
      type: String,
      required: true,
    },
    ques: {
      required: false,
    },
  },
  created() {
    if (this.ques) {
      this.question = this.ques.question;
      this.option = this.ques.option.split(';');
      this.answer = this.ques.answer;
      this.tag = this.ques.tag;
      this.questionid = this.ques.question_id;
    }
    console.log(this.score);
  },
  data() {
    return {
      ans: [
        {
          value: 'A',
        },
        {
          value: 'B',
        },
        {
          value: 'C',
        },
        {
          value: 'D',
        },
      ],
      questionid: null,

      question: '',
      option: [],
      answer: '',
      isChange: false,
      tag: '',
    };
  },
  computed: {
    ...mapState(['uid']),
    ...mapState(['examId']),
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
    // 验证表单完整性
    isSubmit() {
      let res = true;
      if (!this.question) {
        res = false;
      } else if (this.option.length < 4) {
        res = false;
      } else if (!this.tag) {
        res = false;
      } else if (!this.answer) {
        res = false;
      }
      return res;
    },
    // 向后台请求数据
    async getInfo() {
      if (this.questionid === null) {
        // 判断，当questionid为空，请求两个接口
        try {
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: 'Single',
            question: this.question,
            options: this.option.join(';'),
            answer: this.answer,
            tag: this.tag,
            tea_id: this.uid,
          });
          // console.log(res);
          const info = res.data;
          console.log(info);
          if (info.code === 200) {
            // 获取questionid后再请求addQuestionToExam接口
            this.questionid = info.data;
            const quesid = parseInt(this.questionid, 10); // 将questionid和score转换为Number
            const scoreN = parseInt(this.score, 10);
            // console.log(this.questionid);
            try {
              const response = await this.$axios.post(
                `${this.HOST}/exam/addQuestionToExam`,
                {
                  type: 'Single',
                  question_id: quesid,
                  num: this.index + 1,
                  score: scoreN,
                  exam_id: this.examId,
                }
              );
              const resdata = response.data;
              // console.log(resdata);
              if (resdata.code === 200) {
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
        try {
          const quesid = parseInt(this.questionid, 10); // 将questionid和score转换为Number
          const scoreN = parseInt(this.score, 10);
          const response = await this.$axios.post(
            `${this.HOST}/exam/addQuestionToExam`,
            {
              type: 'Single',
              question_id: quesid,
              num: this.index + 1,
              score: scoreN,
              exam_id: this.examId,
            }
          );
          const resdata = response.data;
          // console.log(resdata);
          if (resdata.code === 200) {
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
         console.log("3");
        // 只是修改题目，请求一个接口
        try {
          const quesid = parseInt(this.questionid, 10);
          const res = await this.$axios.post(`${this.HOST}/exam/addQuestion`, {
            type: 'Single',
            question: this.question,
            question_id: quesid,
            options: this.option.join(';'),
            answer: this.answer,
            tag: this.tag,
            tea_id: this.uid,
          });
          const info = res.data;
          // if (info.code === 200) {
          if (info.data === 302) {
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
    async SubmitSingle() {
      if (!this.isSubmit()) {
        // 未填写完整的提示信息
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
        if (this.existSame()) {
          this.$message({
            message: '有选项内容一致，请修改',
            type: 'info',
            offset: 70,
          });
          return;
        }
        // 填写完整直接提交。
        await this.getInfo();
        this.isChange = false;
      }
    },
    existSame() {
      console.log('进来了');
      for (var i = 0; i < this.option.length - 1; i++) {
        for (var j = i + 1; j < this.option.length; j++) {
          if (this.option[i] == this.option[j]) {
            console.log(this.option[i], '==', this.option[j]);
            return true;
          }
        }
      }
      return false;
    },
  },
};
</script>

<style lang="less" scoped>
#single {
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
    label {
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
