<template>
    <div id="singleQues">
        <el-card class="single_card">
            <div class="single_row">
                <label class="index">{{ index + 1 }}.</label>
                <label class="timu">{{ timu }}</label>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="A" class="op_row">
                    <label class="Al">A</label>
                    <span class="options">{{ this.optionA }}</span>
                </el-radio>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="B" class="op_row">
                    <label class="Al">B</label>
                    <span class="options">{{ this.optionB }}</span>
                </el-radio>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="C" class="op_row">
                    <label class="Al">C</label>
                    <span class="options">{{ this.optionC }}</span>
                </el-radio>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="D" class="op_row">
                    <label class="Al">D</label>
                    <span class="options">{{ this.optionD }}</span>
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
    SingleQ: {
      required: false,
    },
  },
  data() {
    return {
      answer: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      timu: '',
      info: {},
    };
  },
  created() {
    this.Question();
    console.log(this.SingleQ);
  },
  watch: {
    answer(val) {
      this.info = {
        question_id: this.SingleQ.question_id,
        answer: val,
        score: 0,
        type: 'Single',
        num: this.index + 1,
      };
      this.$emit('func', this.info);
    },
  },
  methods: {
    Question() {
      this.timu = this.SingleQ.question;
      if (this.SingleQ.options) {
        const oplist = this.SingleQ.options.split(';');
        const a = oplist[0];
        const b = oplist[1];
        const c = oplist[2];
        const d = oplist[3];
        this.optionA = a;
        this.optionB = b;
        this.optionC = c;
        this.optionD = d;
      }
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
    text-align: left;
    margin-bottom: 10px;

    .index{
      margin-top: 3px;
    }
    .timu{
      word-wrap:break-word;
      width: 800px;
      text-align: left;
      margin-left: 5px;
      margin-top: 2px;
    }
    .answer{
      margin-left: 20px;
      word-wrap:break-word;
    }
    .Al{
      margin-right: 20px;
    }
    .options{
      margin-left: 20px;
      margin-top: -17px;
      line-height: 20px;
      text-align: left;
      display: block;
      word-wrap:break-word;
      white-space:normal;
    }
  }
  .op_row {
    display: flex;
    flex-direction: row;
  }
  .op{
    width: 90%;
    margin-left: 5%;
  }
}
</style>
