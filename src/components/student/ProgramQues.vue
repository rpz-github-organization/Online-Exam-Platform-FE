<template>
    <div id="singleQues">
        <el-card class="single_card">
            <div class="single_row">
                <label>{{ index + 1 }}.</label>
                <label>qqqqqqqqqqq</label>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="A">
                    <label class="Al">A</label>
                    <label class="options">{{ this.optionA }}</label>
                </el-radio>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="B">
                    <label class="Al">B</label>
                    <label class="options">{{ this.optionB }}</label>
                </el-radio>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="C">
                    <label class="Al">C</label>
                    <label class="options">{{ this.optionC }}</label>
                </el-radio>
            </div>
            <div class="single_row op">
                <el-radio v-model="answer" label="D">
                    <label class="Al">D</label>
                    <label class="options">{{ this.optionD }}</label>
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
  },
  data() {
    return {
      answer: '',
      optionA: 'aa',
      optionB: 'aa',
      optionC: 'aa',
      optionD: 'aa',
    };
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

      .answer{
          margin-left: 20px;
      }
      .Al{
          margin-right: 20px;
      }
      .options{
          text-align: left;
      }
  }
  .op{
      display: flex;
      width: 90%;
      margin-left: 5%;
  }
}
</style>
