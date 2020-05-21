<template>
  <div id="stuQuestion">
    <label class="res_time">剩余时间： {{ day }}天{{ hour }}时{{ min }}:{{ second }}</label>
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
          <div v-for="(item,index) in counterS" :key="index" v-bind:id="('counterS'+(index+1))">
            <label>选择题-{{ index+1 }}</label>
            <singleQues :index="index" :SingleQ="singleList[index]" @func="getList"></singleQues>
          </div>
        </el-card>
        <el-card class="ques_card" v-if="this.isShowJ">
          <div v-for="(item,index) in counterJ" :key="index" v-bind:id="('counterJ'+(index+1))">
            <label>判断题-{{ index+1 }}</label>
            <judgeQues ref="judge" :index="index" :JudgeQ="judgeList[index]" @func="getList" />
          </div>
        </el-card>
        <el-card class="ques_card" v-if="this.isShowD">
          <div v-for="(item,index) in counterD" :key="index" v-bind:id="('counterD'+(index+1))">
            <label>讨论题-{{ index+1 }}</label>
            <discussionQues :index="index" :DiscussionQ="discussionList[index]" @func="getList" />
          </div>
        </el-card>
        <el-card class="ques_card" v-if="this.isShowP">
          <div v-for="(item,index) in counterP" :key="index" v-bind:id="('counterP'+(index+1))">
            <label>编程题-{{ index+1 }}</label>
            <programQues
              :index="index"
              :ProgramQ="programList[index]"
              :examId="examId"
              @func="getList"
            />
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
    ...mapState(['examId']),
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
      answerList: [],
      res_time: 0,
      curStartTime: '2020-03-17 20:30:00',
      day: '0',
      hour: '00',
      min: '00',
      second: '00',
    };
  },
  created() {
    this.Begin();
    this.WindowJudge();
    this.JudgeStatus();
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
    WindowJudge() {
      let co = 0;
      window.onblur = () => {
        co += 1;
        this.$confirm(`已切换了${co}次标签页，超过五次则自动交卷`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        if (co > 5) {
          this.SubmitExam();
          this.$confirm('您已切换了五次标签页，无法继续作答', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              window.location.href = '/IndexStu';
            })
            .catch(() => {
              window.location.href = '/IndexStu';
            });
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
          exam_id: this.examId,
          stu_id: this.uid,
        });
        const info = res.data;
        if (info.code === 200) {
          const infodata = info.data;
          // console.log(info);
          infodata.forEach(item => {
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
        } else {
          this.$message({
            message: info.message,
            type: 'error',
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
    },

    async GetQuestion() {
      // console.log('this ouke');
      try {
        // console.log(this.counterP);
        this.counterS.forEach(async item => {
          if (item.question_id) {
            const questionId = parseInt(item.question_id, 10);
            const res = await this.$axios.post(
              `${this.HOST}/exam/getQuestion`,
              {
                question_id: questionId,
              }
            );
            const info = res.data;
            // console.log(info.data);
            const infodata = info.data;
            this.singleList.push(infodata);
            if (this.counterS.length === this.singleList.length) {
              this.isShowS = true;
            }
          }
        });
        this.counterJ.forEach(async item => {
          if (item.question_id) {
            const questionId = parseInt(item.question_id, 10);
            const res = await this.$axios.post(
              `${this.HOST}/exam/getQuestion`,
              {
                question_id: questionId,
              }
            );
            const info = res.data;
            // console.log(info.data);
            const infodata = info.data;
            this.judgeList.push(infodata);
            if (this.counterJ.length === this.judgeList.length) {
              this.isShowJ = true;
            }
          }
        });
        this.counterD.forEach(async item => {
          if (item.question_id) {
            const questionId = parseInt(item.question_id, 10);
            const res = await this.$axios.post(
              `${this.HOST}/exam/getQuestion`,
              {
                question_id: questionId,
              }
            );
            const info = res.data;
            // console.log(info.data);
            const infodata = info.data;
            this.discussionList.push(infodata);
            if (this.counterD.length === this.discussionList.length) {
              this.isShowD = true;
            }
          }
        });
        this.counterP.forEach(async item => {
          if (item.question_id) {
            const questionId = parseInt(item.question_id, 10);
            const res = await this.$axios.post(
              `${this.HOST}/exam/getQuestion`,
              {
                question_id: questionId,
              }
            );
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

    getList(data) {
      let isAdd = true;
      this.answerList.forEach(item => {
        if (item.question_id === data.question_id) {
          this.$set(item, 'answer', data.answer);
          isAdd = false;
        }
      });
      if (isAdd) {
        this.answerList.push(data);
      }
    },
    async SubmitExam() {
      const len =
        this.counterS.length +
        this.counterJ.length +
        this.counterD.length +
        this.counterP.length;
      if (this.answerList.length !== len) {
        this.$confirm('您还有题目未作答, 是否继续提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await this.SubmitInfo();
          })
          .catch(() => {
            this.$message({
              type: 'warning',
              message: '已取消提交',
              offset: 70,
            });
          });
      } else {
        this.SubmitInfo();
      }
    },
    async SubmitInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/handInExam`, {
          data: this.answerList,
          exam_id: this.examId,
        });
        // console.log(this.answerList);
        const info = res.data;
        // console.log(info);
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功',
            offset: 70,
          });
          window.location.href = '/IndexStu';
        } else {
          this.$message({
            message: info.message,
            type: 'error',
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
    },
    async JudgeStatus() {
      try {
        const interval = setInterval(async () => {
          const res = await this.$axios.post(
            `${this.HOST}/exam/getTimeAndStatus`,
            {
              exam_id: this.examId,
            }
          );
          const info = res.data.data;
          // console.log(info);
          if (res.data.code === 200) {
            this.curStartTime = this.changeTime(
              info.begin_time,
              info.last_time
            );
            this.countTime();
            if (info.status === 'end') {
              this.$confirm('考试时间到，无法继续作答', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              })
                .then(() => {
                  window.location.href = '/IndexStu';
                  clearInterval(interval);
                })
                .catch(() => {
                  window.location.href = '/IndexStu';
                  clearInterval(interval);
                });
            }
            if (
              this.day === 0 &&
              this.hour === '00' &&
              this.min === '00' &&
              this.second === '00'
            ) {
              this.$confirm('考试时间到，无法继续作答', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              })
                .then(() => {
                  window.location.href = '/IndexStu';
                  clearInterval(interval);
                })
                .catch(() => {
                  window.location.href = '/IndexStu';
                  clearInterval(interval);
                });
            }
          } else {
            this.$message({
              message: info.message,
              type: 'error',
              offset: 70,
            });
            clearInterval(interval);
          }
        }, 1000);
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
    },
    changeTime(beginTime, lastTime) {
      const date = new Date(beginTime); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const lastHour = parseInt((lastTime / 60), 10);
      const lastMin = lastTime % 60;
      const Y = `${date.getFullYear()}/`;
      const M = `${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }/`;
      const D = `${date.getDate()} `;
      const h = `${date.getHours() + lastHour}:`;
      const m = `${date.getMinutes() + lastMin}:`;
      const s = `${date.getSeconds()}`;
      if (date.getSeconds() > 60) {
        s = s - 60;
        m = `${date.getMinutes() + lastMin + 1}:`;
      } else if (date.getMinutes() + lastMin > 60) {
        h = `${date.getHours() + lastHour + 1}:`
        m = `${date.getMinutes() + lastMin - 60}:`
      } else if (date.getHours() + lastHour > 24) {
        h = `${date.getHours() + lastHour - 24}:`
        D = `${date.getDate() + 1} `;
      }
      return Y + M + D + h + m + s;
    },
    countTime() {
      // 获取当前时间
      const date = new Date();
      const now = date.getTime();
      // 设置截止时间
      const endDate = new Date(this.curStartTime); // this.curStartTime需要倒计时的日期
      const end = endDate.getTime();
      // 时间差
      const leftTime = end - now;
      // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        // 时
        const h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.hour = h < 10 ? `0${h}` : h;
        // 分
        const m = Math.floor((leftTime / 1000 / 60) % 60);
        this.min = m < 10 ? `0${m}` : m;
        // 秒
        const s = Math.floor((leftTime / 1000) % 60);
        this.second = s < 10 ? `0${s}` : s;
      } else {
        this.day = 0;
        this.hour = '00';
        this.min = '00';
        this.second = '00';
      }
      // 等于0的时候不调用
      if (
        Number(this.hour) === 0 &&
        Number(this.day) === 0 &&
        Number(this.min) === 0 &&
        Number(this.second) === 0
      ) {
        console.log('a');
      } else {
        // 递归每秒调用countTime方法，显示动态时间效果,
        setTimeout(this.countTime, 1000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#stuQuestion {
  display: flex;
  flex-direction: column;
  margin: auto 0px;
  background: url(../../assets/index_background_stu.gif);

  .res_time {
    display: flex;
    justify-content: flex-start;
    margin-left: 5%;
    font-weight: bold;
    margin-top: 20px;
    position: fixed;
  }
  .paper {
    display: flex;
    flex-direction: row;
    margin-top: 50px;
  }
  .menu {
    width: 20%;
    height: 100%;
    margin-left: 5%;
    position: fixed;

    .selectType {
      background-color: #7cc68c;
      padding: 5px 10px;
      border-radius: 4px;
    }
    .question_list {
      margin: 20px 0 30px 0;
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
  .ques {
    margin-left: 30%;
    width: 60%;

    .ques_card {
      display: flex;
      flex-direction: column;
      margin-bottom: 5%;
    }
    .button_card {
      margin-bottom: 20px;
    }
  }
  button {
    color: white;
    margin: 10px 0;
    border: none;
    border-radius: 2px;
    padding: 5px 10px;
    width: 100px;
    font-size: 15px;
    background-color: #da6148;
    cursor: pointer;
    outline: none;
  }
  button:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
  }
}
</style>
