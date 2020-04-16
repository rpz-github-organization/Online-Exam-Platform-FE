<template>
    <div id="singleQues">
        <el-card class="single_card">
            <div class="single_row">
                <label class="index">{{ index + 1 }}.</label>
                <label class="timu">{{ timu }}</label>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="true">
                    <label class="Al">true</label>
                </el-radio>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="false">
                    <label class="Al">false</label>
                </el-radio>
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
    JudgeQ: {
      required: false,
    },
  },
  data() {
    return {
      answer: '',
      timu: '',
    };
  },
  created() {
    this.Question();
  },
  watch: {
    answer(val) {
      this.info = {
        question_id: this.JudgeQ.question_id,
        answer: val,
        score: 0,
        type: 'Judge',
      };
      this.$emit('func', this.info);
    },
  },
  methods: {
    Question() {
      this.timu = this.JudgeQ.question;
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

    .timu{
      word-wrap:break-word;
      width: 800px;
      text-align: left;
      margin-left: 5px;
      margin-top: 2px;
    }
    .index{
      margin-top: 3px;
    }
    .answer{
      margin-left: 20px;
    }
    .Al{
      margin-right: 20px;
    }
  }
  .op{
    display: flex;
    width: 90%;
    margin-left: 5%;
  }
}
</style>
