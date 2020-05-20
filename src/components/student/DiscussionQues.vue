<template>
    <div id="singleQues">
        <el-card class="single_card">
            <div class="single_row">
                <label class="index">{{ index + 1 }}.</label>
                <label class="timu">{{ timu }}</label>
            </div>
            <div class="single_row op">
                <el-input
                type="textarea"
                placeholder="请输入内容"
                autosize
                v-model="answer"
                @paste.native.capture.prevent="handlePaste">
                </el-input>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'singleQues',
  props: { // 父组件传值，index：下标，DiscussionQ：讨论题
    index: {
      type: Number,
      required: true,
    },
    DiscussionQ: {
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
        question_id: this.DiscussionQ.question_id,
        answer: val,
        score: 0,
        type: 'Discussion',
        num: this.index + 1,
      };
      this.$emit('func', this.info); // 学生答题时，实时向父组件传值（父组件统一提交所有答案）
    },
  },
  methods: {
    Question() {
      this.timu = this.DiscussionQ.question; // 渲染获取到的题目
    },
    handlePaste() { // 粘贴操作不执行任何事件，阻止粘贴操作向下传
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
