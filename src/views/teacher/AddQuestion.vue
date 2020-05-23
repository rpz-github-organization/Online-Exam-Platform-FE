<template>
  <div id="back">
    <div id="AddQuestion">
      <div class="left">
        <el-card>
          <label class="selectType">选择题</label>
          <div class="question_list">
            <div class="question_item" v-for="(item,index) in counterS" :key="index">
              <label class="question_item">
                <span @click="JumpTo(index+1, 'counterS')">{{ index+1 }}</span>
              </label>
            </div>
            <label class="question_item" @click="AddCount(counterS)">
              <span>+</span>
            </label>
          </div>
          <label class="selectType">判断题</label>
          <div class="question_list">
            <div class="question_item" v-for="(item,index) in counterJ" :key="index">
              <label class="question_item">
                <span @click="JumpTo(index+1, 'counterJ')">{{ index+1 }}</span>
              </label>
            </div>
            <label class="question_item" @click="AddCount(counterJ)">
              <span>+</span>
            </label>
          </div>
          <label class="selectType">问答题</label>
          <div class="question_list">
            <div class="question_item" v-for="(item,index) in counterD" :key="index">
              <label class="question_item">
                <span @click="JumpTo(index+1, 'counterD')">{{ index+1 }}</span>
              </label>
            </div>
            <label class="question_item" @click="AddCount(counterD)">
              <span>+</span>
            </label>
          </div>
          <label class="selectType">编程题</label>
          <div class="question_list">
            <div class="question_item" v-for="(item,index) in counterP" :key="index">
              <label class="question_item">
                <span @click="JumpTo(index+1, 'counterP')">{{ index+1 }}</span>
              </label>
            </div>
            <label class="question_item" @click="AddCount(counterP)">
              <span>+</span>
            </label>
          </div>
        </el-card>
      </div>
      <div class="right">
        <div v-if="counterS.length > 0 && this.isShow">
          <el-card class="ques_card">
            <div class="type_score">
              <label class="type_title">小题分值</label>
              <el-input v-model="scoreS" clearable></el-input>
            </div>
            <div v-for="(item,index) in counterS" :key="index" v-bind:id="('counterS'+(index+1))">
              <label>选择题 No.{{ index+1 }}</label>
              <single :index="index" :score="scoreS" :ques="Single[index]"></single>
            </div>
          </el-card>
        </div>
        <div v-if="counterJ.length > 0 && this.isShow">
          <el-card class="ques_card">
            <div class="type_score">
              <label class="type_title">小题分值</label>
              <el-input v-model="scoreJ" clearable></el-input>
            </div>
            <div v-for="(item,index) in counterJ" :key="index" v-bind:id="('counterJ'+(index+1))">
              <label>判断题 No.{{ index+1 }}</label>
              <judge :index="index" :score="scoreJ" :ques="Judge[index]" />
            </div>
          </el-card>
        </div>
        <div v-if="counterD.length > 0 && this.isShow">
          <el-card class="ques_card">
            <div v-for="(item,index) in counterD" :key="index" v-bind:id="('counterD'+(index+1))">
              <label>讨论题 No.{{ index+1 }}</label>
              <discussion :index="index" :ques="Discussion[index]" />
            </div>
          </el-card>
        </div>
        <div v-if="counterP.length > 0 && this.isShow">
          <el-card class="ques_card">
            <div v-for="(item,index) in counterP" :key="index" v-bind:id="('counterP'+(index+1))">
              <label>编程题 No.{{ index+1 }}</label>
              <program :index="index" :ques="Program[index]" />
            </div>
          </el-card>
        </div>
        <div class="button_row">
          <el-button type="success" plain @click="goToInfo()">点击完成出题</el-button>
          <!-- <el-button type="primary" plain @click="() => { $router.push('/configPDF') }">点击上传 PDF 配卷</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import single from '../../components/teacher/Single.vue';
import judge from '../../components/teacher/Judge.vue';
import discussion from '../../components/teacher/Discussion.vue';
import program from '../../components/teacher/Program.vue';

export default {
  name: 'AddQuestion',
  components: {
    single,
    judge,
    discussion,
    program,
  },
  computed: {
    ...mapState(['uid']),
    ...mapState(['examId']),
  },
  beforeMount() {
    const url = document.referrer;
    console.log(url);
    if (url.search('/ExamInfo') !== -1) {
      this.GetWhole();
    } else {
      this.isShow = true;
    }
  },
  data() {
    return {
      options: [
        {
          value: 'single',
          label: '选择题',
        },
        {
          value: 'judge',
          label: '判断题',
        },
        {
          value: 'discussion',
          label: '简答题',
        },
        {
          value: 'program',
          label: '编程题',
        },
      ],
      type: '',
      counterS: [],
      counterJ: [],
      counterD: [],
      counterP: [],
      scoreS: '',
      scoreJ: '',
      Single: [],
      Judge: [],
      Program: [],
      Discussion: [],
      isEdit: false,
      isShow: false,
    };
  },

  methods: {
    AddCount(counter) {
      counter.push('a');
    },
    JumpTo(key, counterW) {
      const PageId = document.querySelector(`#${counterW}${key}`);
      // console.log(PageId.offsetTop);
      window.scroll({
        top: PageId.offsetTop,
        behavior: 'smooth',
      });
    },
    goToInfo() {
      if (
        !(
          this.counterS.length ||
          this.counterJ.length ||
          this.counterD.length ||
          this.counterP.length
        )
      ) {
        this.$confirm('本考试无题目，请选择您要进行的操作', '提示', {
          confirmButtonText: '删除考试',
          cancelButtonText: '继续出题',
          type: 'warning',
        })
        .then(async () => {
          try {
            const res = await this.$axios.post(`${this.HOST}/exam/delExam`, {
              exam_id: this.examId,
            });
            const info = res.data;
            if (info.code === 200) {
              this.$message({
                type: 'success',
                offset: 70,
                message: '删除成功',
              });
              window.location.href = '/AddExam';
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            offset: 70,
            message: '已取消',
          });
        });
      } else {
        this.judgeScore();
      }
    },
    judgeScore() {
      let res1 = true;
      let res2 = true;
      if (this.counterS.length !== 0 && this.scoreS === '') {
        this.$message({
          type: 'error',
          offset: 70,
          message: '请为选择题小题设置分数！',
        });
        res1 = false;
      } else {
        this.uploadScore('Single', this.scoreS);
        res1 = true;
      }
      if (this.counterJ.length !== 0 && this.scoreJ === '') {
        this.$message({
          type: 'error',
          offset: 70,
          message: '请为判断题小题设置分数！',
        });
        res2 = false;
      } else{
        res2 = true;
        this.uploadScore('Judge', this.scoreJ);
      }
      if (res1 && res2) {
        window.location.href = '/ExamInfo';
      }
    },
    // 上传大题的每个小题的分值
    async uploadScore(type, score) {
      try {
        const res = await this.$axios.post(
          `${this.HOST}/exam/modifyQuestionsScore`,
          {
            exam_id: this.examId,
            type: type,
            score: parseInt(score),
          }
        );
        const info = res.data;
        console.log(info);
      } catch (err) {
        console.log(err);
      }
    },
    async GetWhole() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/getWholeExam`, {
          exam_id: this.examId,
        });
        const info = res.data.data;
        console.log(info);
        if (res.data.code === 200) {
          if (info.single) {
            this.Single = info.single;
          }
          if (info.judge) {
            this.Judge = info.judge;
          }
          if (info.program) {
            this.Program = info.program;
          }
          if (info.discussion) {
            this.Discussion = info.discussion;
          }
          this.scoreS = `${info.singleScore}`;
          this.scoreJ = `${info.judgeScore}`;
          this.Count();
          this.isShow = true;
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
      } catch (err) {
        console.log(err);
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
    },
    Count() {
      if (this.Single) {
        for (let i = 0; i < this.Single.length; i += 1) {
          this.AddCount(this.counterS);
        }
      }
      if (this.Judge) {
        for (let i = 0; i < this.Judge.length; i += 1) {
          this.AddCount(this.counterJ);
        }
      }
      if (this.Discussion) {
        for (let i = 0; i < this.Discussion.length; i += 1) {
          this.AddCount(this.counterD);
        }
      }
      if (this.Program) {
        for (let i = 0; i < this.Program.length; i += 1) {
          this.AddCount(this.counterP);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#back {
  height: 100%;
  background: url(../../assets/index_background_tch.gif);
  #AddQuestion {
    margin-top: 60px;
    padding-top: 40px;
    background: url(../../assets/index_background_tch.gif);
    display: flex;
    .left {
      width: 20%;
      // height: 80%;
      margin-left: 5%;
      position: fixed;

      .selectType {
        background-color: #5379a563;
        padding: 5px 10px;
        margin-bottom: 30%;
        border-radius: 4px;
        font-weight: bold;
      }
      .question_list {
        margin: 10% 0 30% 0;
        flex-wrap: wrap;
        display: flex;
      }

      .question_item {
        margin: 4px;
        align-items: center;
        justify-content: center;
        height: 24px;
        width: 24px;
        min-width: 24px;
        text-align: center;
        line-height: 24px;
        border-radius: 2px;
        background: #f0f0f0;
      }
      .active_item {
        box-shadow: 0 0 0 2px #695de0;
      }
    }
    .right {
      width: 60%;
      height: 100%;
      margin-left: 30%;

      .ques_card {
        display: flex;
        flex-direction: column;
        margin-bottom: 5%;

        .type_score {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          width: 200px;
        }
        .type_title {
          width: 200px;
          text-align: left;
          margin: 5% 5px;
        }
        label {
          color: #8590a6;
        }
      }
      .button_row {
        margin-bottom: 10px;

        * {
          margin: 0 10px;
        }
      }
      .warn_tip {
        margin-bottom: 30px;
        color: red;
      }
    }
  }
}
</style>
