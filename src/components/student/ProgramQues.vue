<template>
  <div id="programQues">
    <el-card class="single_card">
      <div class="single_row">
        <label class="index">{{ index + 1 }}.</label>
        <label class="timu">{{ timu }}</label>
      </div>
      <div class="single_row">
        <div class="example">
          <label>样例输入</label>
          <label class="ex">{{ stdinput }}</label>
          <label>样例输出</label>
          <label class="ex">{{ stdoutput }}</label>
        </div>
      </div>
      <div class="single_row">
        <label class="tip">提示：{{ this.tip }}</label>
      </div>
      <div class="single_row">
          <label class="ques_label">语言：</label>
          <el-select
            v-model="language"
            size="small"
            class="selt">
            <el-option
              v-for="item in lis"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
      </div>
      <div class="single_row">
        <el-input type="textarea" v-model="code" autosize></el-input>
      </div>
      <div class="button_row">
        <button @click="submit()">
          <i class="el-icon-edit"></i>submit
        </button>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      title="提交结果"
      width="1100px"
      customClass="diatable">
      <div>
        <el-table
          style="width: 100%"
          :data="statusList">
          <el-table-column property="date" label="提交时间" width="180"></el-table-column>
          <el-table-column property="status" label="状态" width="170"></el-table-column>
          <el-table-column property="score" label="分数" width="150"></el-table-column>
          <el-table-column property="language" label="语言" width="180"></el-table-column>
          <el-table-column property="username" label="用户" width="180"></el-table-column>
          <el-table-column property="num" label="题目" width="170"></el-table-column>
        </el-table>
        <el-table
          :data="testList"
          style="width: 100%"
          stripe>
          <el-table-column property="number" label="测试点" width="250"></el-table-column>
          <el-table-column property="result" label="结果" width="250"></el-table-column>
          <el-table-column property="runtime" label="耗时" width="250"></el-table-column>
          <el-table-column property="memory" label="内存" width="250"></el-table-column>
        </el-table>
      </div>
      <div style="margin: 20px 0;">
        <label>代码</label>
        <el-input
          type="textarea"
          v-model="code"
          :disabled="true"
          autosize>
          </el-input>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'progarmQues',
  props: {
    index: {
      type: Number,
      required: true,
    },
    ProgramQ: {
      required: false,
    },
    examId: {
      type: Number,
    },
  },
  data() {
    return {
      answer: '',
      timu: '',
      stdinput: '',
      stdoutput: '',
      code: '',
      tip: 'aa',
      score: 0,

      language: '',
      lis: [{
        value: 'C',
      }, {
        value: 'C++',
      }, {
        value: 'Python2',
      }, {
        value: 'Python3',
      }, {
        value: 'Java',
      }],

      dialogVisible: false,
      statusList: [],
      testList: [],
    };
  },
  created() {
    this.Question();
    console.log(this.ProgramQ);
  },
  watch: {
    dialogVisible(val) {
      if (val === false) {
        this.testList = [];
        this.statusList = [];
      }
    },
    code(val) {
      this.info = {
        question_id: this.ProgramQ.question_id,
        answer: val,
        score: this.score,
        type: this.type,
      };
      this.$emit('func', this.info);
    },
  },
  methods: {
    Question() {
      this.timu = this.ProgramQ.question;
      if (this.ProgramQ.input === null) {
        this.stdinput = '无';
      } else {
        this.stdinput = this.ProgramQ.input;
      }
      this.stdoutput = this.ProgramQ.output;
    },
    getTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${year}/${month}/${day}/  ${hours}:${minutes}:${seconds}`;
    },
    async submit() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/judgeProgram`, {
          code: this.code,
          language: this.language,
          question_id: this.ProgramQ.question_id,
          exam_id: this.ProgramQ.exam_id,
        });
        const info = res.data.data;
        this.score = info.score;
        this.statusList.push({
          date: this.getTime(),
          status: info.status,
          score: this.score,
          language: info.language,
          username: info.username,
          num: info.num,
        });
        const testCase = info.test_case_res;
        testCase.forEach((item) => {
          this.testList.push({
            number: item.case_num,
            result: item.result,
            runtime: item.run_time,
            memory: item.memory,
          });
        });
        this.dialogVisible = true;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less">
#programQues{
  display: flex;
  margin: 10px 5px 30px 5px;

  .single_card{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .single_row{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;

    .timu{
      word-wrap:break-word;
      width: 800px;
      text-align: left;
      margin-left: 5px;
    }
    .index{
      margin-top: 3px;
    }
    .tip{
      color: #CF3516;
    }
    .ques_label{
      width: 50px;
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
      .ex{
        width: 100%;
        background-color: #DCDDDD;
        padding-left: 10px;
      }
    }
  }
  .op{
    display: flex;
    width: 90%;
    margin-left: 5%;
  }
  .button_row{
    display: flex;
    justify-content: flex-end;
    button{
      color: white;
      margin: 10px 0;
      border: none;
      border-radius: 2px;
      padding: 5px 10px;
      width: 80px;
      font-size: 15px;
      background-color: #5379a5c4;
      cursor: pointer;
      outline: none;
      display: flex;
      flex-direction: center;
    }
    button:hover{
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
  }
  .diatable{
    text-align: left;
  }
}
</style>
