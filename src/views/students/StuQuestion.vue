<template>
    <div id="stuQuestion">
      <label class="res_time">{{ new Date().toLocaleString() }}</label>
      <div class="paper">
          <div class="menu">
            <el-card>
              <label class="selectType">选择题</label>
              <div class="question_list">
              <div class="question_item" v-for="(item,index) in counterS" :key="index">
                <label class="question_item">
                <span @click="JumpTo(index+1, 'counterS')">{{ index+1 }}</span>
                </label>
              </div>
              </div>
              <label class="selectType">判断题</label>
              <div class="question_list">
              <div class="question_item" v-for="(item,index) in counterJ" :key="index">
                <label class="question_item">
                <span @click="JumpTo(index+1, 'counterJ')">{{ index+1 }}</span>
                </label>
              </div>
              </div>
              <label class="selectType">问答题</label>
              <div class="question_list">
              <div class="question_item" v-for="(item,index) in counterD" :key="index">
                <label class="question_item">
                <span @click="JumpTo(index+1, 'counterD')">{{ index+1 }}</span>
                </label>
              </div>
              </div>
              <label class="selectType">编程题</label>
              <div class="question_list">
              <div class="question_item" v-for="(item,index) in counterP" :key="index">
                <label class="question_item">
                <span @click="JumpTo(index+1, 'counterP')">{{ index+1 }}</span>
                </label>
              </div>
              </div>
            </el-card>
          </div>
          <div class="ques">
            <el-card class="ques_card" v-if="this.isShowS">
              <div v-for="(item,index) in counterS"
              :key="index"
              v-bind:id="('counterS'+(index+1))">
                <label>选择题-{{ index+1 }}</label>
                <singleQues
                :index="index"
                :SingleQ="singleList[index]"
                @func="getList"></singleQues>
              </div>
            </el-card>
            <el-card class="ques_card" v-if="this.isShowJ">
              <div v-for="(item,index) in counterJ" :key="index" v-bind:id="('counterJ'+(index+1))">
                <label>判断题-{{ index+1 }}</label>
                <judgeQues
                  ref="judge"
                  :index="index"
                  :JudgeQ="judgeList[index]"
                  @func="getList"/>
              </div>
            </el-card>
            <el-card class="ques_card" v-if="this.isShowD">
              <div v-for="(item,index) in counterD" :key="index" v-bind:id="('counterD'+(index+1))">
                <label>讨论题-{{ index+1 }}</label>
                <discussionQues
                :index="index"
                :DiscussionQ="discussionList[index]"
                @func="getList"/>
              </div>
            </el-card>
            <el-card class="ques_card" v-if="this.isShowP">
              <div v-for="(item,index) in counterP" :key="index" v-bind:id="('counterP'+(index+1))">
                <label>编程题-{{ index+1 }}</label>
                <programQues
                :index="index"
                :ProgramQ="programList[index]"
                :examId="exam_id"
                @func="getList"/>
              </div>
            </el-card>
            <div class="button_card">
              <button @click="SubmitExam()">交卷</button>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import singleQues from '@/components/student/SingleQues.vue';
import judgeQues from '@/components/student/JudgeQues.vue';
import discussionQues from '@/components/student/DiscussionQues.vue';
import programQues from '@/components/student/ProgramQues.vue';

export default {
  name: 'stuQuestion',
  components: {
    singleQues,
    judgeQues,
    discussionQues,
    programQues,
  },
  computed: {
    ...mapState(['uid']),
  },
  data() {
    return {
      counterS: [],
      counterJ: [],
      counterD: [],
      counterP: [],
      singleList: [],
      judgeList: [],
      discussionList: [],
      programList: [],
      isShowS: false,
      isShowJ: false,
      isShowD: false,
      isShowP: false,
      exam_id: 65,
      answerList: [],
    };
  },
  created() {
    this.Begin();
    this.WindowJudge();
  },
  methods: {
    WindowJudge() {
      let co = 0;
      window.onblur = function () {
        co += 1;
        if (co > 3) {
          console.log('考试结束');
        }
      };
    },
    JumpTo(key, counterW) {
      const PageId = document.querySelector(`#${counterW}${key}`);
      // console.log(PageId.offsetTop);
      window.scroll({
        top: PageId.offsetTop,
        behavior: 'smooth',
      });
    },
    async Begin() {
      // console.log('a');
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/getStuExam`, {
          exam_id: this.exam_id,
          stu_id: this.uid,
        });
        const info = res.data;
        if (info.code === 200) {
          const infodata = info.data;
          console.log(info);
          infodata.forEach((item) => {
            if (item.type === 'Single') {
              this.counterS.push(item);
              // console.log(this.counterS);
            } else if (item.type === 'Judge') {
              this.counterJ.push(item);
            } else if (item.type === 'Discussion') {
              this.counterD.push(item);
            } else if (item.type.search('Program') !== -1) {
              // console.log(item);
              this.counterP.push(item);
            }
          });
          this.GetQuestion();
        }
      } catch (err) {
        console.log(err);
      }
    },

    async GetQuestion() {
      // console.log('this ouke');
      try {
        // console.log(this.counterP);
        this.counterS.forEach(async (item) => {
          if (item.question_id) {
            const questionId = parseInt(item.question_id, 10);
            const res = await this.$axios.post(`${this.HOST}/exam/getQuestion`, {
              question_id: questionId,
            });
            const info = res.data;
            // console.log(info.data);
            const infodata = info.data;
            this.singleList.push(infodata);
            if (this.counterS.length === this.singleList.length) {
              this.isShowS = true;
            }
          }
        });
        this.counterJ.forEach(async (item) => {
          if (item.question_id) {
            const questionId = parseInt(item.question_id, 10);
            const res = await this.$axios.post(`${this.HOST}/exam/getQuestion`, {
              question_id: questionId,
            });
            const info = res.data;
            // console.log(info.data);
            const infodata = info.data;
            this.judgeList.push(infodata);
            if (this.counterJ.length === this.judgeList.length) {
              this.isShowJ = true;
            }
          }
        });
        this.counterD.forEach(async (item) => {
          if (item.question_id) {
            const questionId = parseInt(item.question_id, 10);
            const res = await this.$axios.post(`${this.HOST}/exam/getQuestion`, {
              question_id: questionId,
            });
            const info = res.data;
            // console.log(info.data);
            const infodata = info.data;
            this.discussionList.push(infodata);
            if (this.counterD.length === this.discussionList.length) {
              this.isShowD = true;
            }
          }
        });
        this.counterP.forEach(async (item) => {
          if (item.question_id) {
            const questionId = parseInt(item.question_id, 10);
            const res = await this.$axios.post(`${this.HOST}/exam/getQuestion`, {
              question_id: questionId,
            });
            const info = res.data;
            // console.log(info.data);
            const infodata = info.data;
            this.programList.push(infodata);
            if (this.counterP.length === this.programList.length) {
              this.isShowP = true;
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    },

    getList(data) {
      let isAdd = true;
      this.answerList.forEach((item) => {
        if (item.question_id === data.question_id) {
          this.$set(item, 'answer', data.answer);
          isAdd = false;
        }
      });
      if (isAdd) {
        this.answerList.push(data);
      }
      console.log(this.answerList);
    },
    async SubmitExam() {
      const len = this.counterS.length
      + this.counterJ.length
      + this.counterD.length
      + this.counterP.length;
      if (this.answerList.length !== len) {
        this.$confirm('您还有题目未作答, 是否继续提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          await this.SubmitInfo();
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消提交',
            offset: 70,
          });
        });
      } else {
        try {
          const res = await this.$axios.post(`${this.HOST}/exam/handInExam`, {
            data: this.answerList,
            exam_id: this.examId,
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async SubmitInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/handInExam`, {
          data: this.answerList,
          exam_id: this.exam_id,
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功',
            offset: 70,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#stuQuestion{
  display: flex;
  flex-direction: column;
  margin: auto 0px;
  background: url(../../assets/index_background_stu.gif);

  .res_time{
    display: flex;
    justify-content: flex-start;
    margin-left: 5%;
    font-weight: bold;
    margin-top: 20px;
    position: fixed;
  }
  .paper{
    display: flex;
    flex-direction: row;
    margin-top: 50px;
  }
  .menu{
    width: 20%;
    height: 100%;
    margin-left: 5%;
    position: fixed;

    .selectType{
      background-color: #7CC68C;
      padding: 5px 10px;
      border-radius: 4px
    }
    .question_list{
      margin: 20px 0 30px 0;
      flex-wrap: wrap;
      display: flex;
    }

    .question_item{
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
    .active_item{
    box-shadow: 0 0 0 2px #695de0;
    }
  }
  .ques{
    margin-left: 30%;
    width: 60%;

    .ques_card{
      display: flex;
      flex-direction: column;
      margin-bottom: 5%;
    }
    .button_card{
      margin-bottom: 20px;
    }
  }
  button{
    color: white;
    margin: 10px 0;
    border: none;
    border-radius: 2px;
    padding: 5px 10px;
    width: 100px;
    font-size: 15px;
    background-color: #DA6148;
    cursor: pointer;
    outline: none;
  }
  button:hover{
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
  }
}
</style>
