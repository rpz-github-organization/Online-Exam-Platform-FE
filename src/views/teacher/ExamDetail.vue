<template>
    <div id="examDetail">
        <div class="center">
            <el-card>
                <div v-if="Single">
                    <div class="label_row">
                        <span>选择题</span>
                    </div>
                    <div
                    v-for="(item, index) in Single"
                    :key="item.question_id"
                    class="ques_row">
                        <span class="row">{{ index + 1 }}.{{ item.question }}</span>
                        <span class="row option">A.{{ item.option[0] }}</span>
                        <span class="row option">B.{{ item.option[1] }}</span>
                        <span class="row option">C.{{ item.option[2] }}</span>
                        <span class="row option">D.{{ item.option[3] }}</span>
                        <span>答案：{{ item.answer }}</span>
                    </div>
                </div>
                <div v-if="Judge">
                    <div class="label_row">
                        <span>判断题</span>
                    </div>
                    <div
                    v-for="(item, index) in Judge"
                    :key="item.question_id"
                    class="ques_row">
                        <span class="row">{{ index + 1}}.{{ item.question }}</span>
                        <span>答案：{{ item.answer }}</span>
                    </div>
                </div>
                <div v-if="Discussion">
                    <div class="label_row">
                        <span>问答题</span>
                    </div>
                    <div
                    v-for="(item, index) in Discussion"
                    :key="item.question_id"
                    class="ques_row">
                        <span class="row">{{ index + 1}}.{{item.question}}</span>
                        <span>参考答案：{{ item.answer }}</span>
                    </div>
                </div>
                <div v-if="Program">
                    <div class="label_row">
                        <span>编程题</span>
                    </div>
                    <div
                    v-for="(item, index) in Judge"
                    :key="item.question_id"
                    class="ques_row">
                        <span class="row">{{ index + 1 }}.{{ item.question }}</span>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="button_row">
          <el-button @click="GoBack()">返回</el-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'examDetail',
  data() {
    return {
      Single: [],
      Judge: [],
      Discussion: [],
      Program: [],
      scoreS: '',
      scoreJ: '',
    };
  },
  computed: {
    ...mapState(['examId']),
  },
  created() {
    this.GetWhole();
  },
  methods: {
    async GetWhole() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/getWholeExam`, {
          exam_id: this.examId,
        });
        const info = res.data.data;
        console.log(info);
        this.Single = info.single;
        this.Judge = info.judge;
        this.Discussion = info.discussion;
        this.Program = info.program;
        this.scoreS = `${info.singleScore}`;
        this.scoreJ = `${info.judgeScore}`;
        this.ChangeType();
      } catch (err) {
        console.log(err);
      }
    },
    ChangeType() {
      for (let i = 0; i < this.Single.length; i += 1) {
        this.Single[i].option = this.Single[i].option.split(';');
      }
      console.log(this.Single);
    },
    GoBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
#examDetail{
    background: url(../../assets/index_background_tch.gif);
    display: flex;
    flex-direction: column;
    .center{
        margin-top: 40px;
        margin-left: 20%;
        width: 60%;
    }
    .label_row{
        text-align: left;
        font-weight: bold;
        font-size: larger;
        margin: 10px 5px;
    }
    .ques_row{
        display: flex;
        flex-direction: column;
        text-align: left;
        margin: 5px 0 40px 10px;

        .row{
            margin: 5px 0;
            word-wrap: break-word;
            font-size: large;
        }
        .option{
            margin-left: 15px;
        }
    }
    .button_row{
        margin: 50px 0;
    }
}
</style>
