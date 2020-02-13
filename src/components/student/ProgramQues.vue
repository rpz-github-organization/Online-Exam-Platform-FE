<template>
    <div id="singleQues">
        <el-card class="single_card">
            <div class="single_row">
                <label class="index">{{ index + 1 }}.</label>
                <label>{{ timu }}</label>
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
                <label class="ques_label">代码</label>
                <el-input type="textarea" v-model="code" autosize></el-input>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'singleQues',
  props: {
    index: {
      type: Number,
      required: true,
    },
    ProgramQ: {
      required: false,
    },
  },
  data() {
    return {
      answer: '',
      timu: '',
      stdinput: '',
      code: '',
    };
  },
  created() {
    this.Question();
  },
  methods: {
    Question() {
      this.timu = this.ProgramQ.question;
      this.stdinput = this.ProgramQ.input;
      this.stdoutput = this.ProgramQ.output;
    },
  },
};
</script>

<style lang="less" scoped>
#singleQues{
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
    margin-bottom: 10px;

    .index{
        margin-top: 3px;
    }
    .answer{
        margin-left: 20px;
    }
    .Al{
        margin-right: 20px;
    }
    .options{
        text-align: left;
    }
    .ques_label{
      width: 5%;
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
}
</style>
