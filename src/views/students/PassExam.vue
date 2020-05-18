<template>
  <div>
    <h2 v-if="NoExams">最近没有已完成的考试哦！</h2>
    <ul v-for="(exam,index) in exams" :key="index" class="middle">
      <li id="exam">
        <div class="one" @click.stop="toDetail(exam.exam.exam_id)">
          <div class="name" :class="{ yescolor: exam.exam.yes }">
            <img src="../../assets/exam.png" alt="exam" />
            {{ exam.exam.name }}
            <img v-if="!exam.exam.yes" src="../../assets/exam_no.png" />
            <img v-if="exam.exam.yes" src="../../assets/exam_yes.png" />
          </div>
          <div class="time">{{ exam.exam.begin_time }}</div>
        </div>
        <div class="two">
          <div>
            <span>教师：{{exam.tea_name}}老师</span>
            <span>考试时长：{{exam.exam.last_time}}分钟</span>
            <span>课程：{{exam.co_name}}</span>
          </div>
          <div
            class="green"
            v-if="exam.exam._judge && exam.exam.yes"
            @click.stop="toCheckGrades(exam.exam.exam_id)"
            style="cursor:pointer"
          >
            <img src="../../assets/exam_status/green.png" /> 已完成评分（点击查看）
          </div>
          <div class="orange" v-else>
            <img src="../../assets/exam_status/orange.png" /> 未完成评分
          </div>
        </div>
      </li>
    </ul>
    <div class="buttons" v-if="pagerSeen">
      <button @click="firstPage" class="changepage" v-if="nowpage!=1">首页</button>
      <button @click="upPage" class="changepage">上一页</button>
      <div class="text">当前第 {{ nowpage }} 页 ，共 {{ totalpage }} 页</div>
      <button @click="downPage" class="changepage">下一页</button>
      <button @click="lastPage" class="changepage" v-if="nowpage!=totalpage">末页</button>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
<script>
import { mapState } from 'vuex';
export default {
  name: 'PassExam',

  computed: {
    ...mapState(['uid']),
  },

  data() {
    return {
      exams: [],
      passExamInfo_All: [],
      exam_num: '',
      start: 0,
      nowpage: 1,
      totalpage: '',
      pagerSeen: false,
      NoExams: false,
    };
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
    async getStuNoExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/homePage/stu/id`, {
          stu_id: this.uid,
          status: 3,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log(info.data);
          return info.data;
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
    async getStuYesExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/homePage/stu/id`, {
          stu_id: this.uid,
          status: 2,
        });
        const info = res.data;
        if (info.code === 200) {
          // console.log(info.data);
          return info.data;
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
    async addNoExamToYesExam() {
      const noexam = await this.getStuNoExamInfo();
      const yesexam = await this.getStuYesExamInfo();
      // add stuts code
      if (yesexam !== null) {
        yesexam.forEach(item => {
          item.exam.begin_time = this.changeTime(item.exam.begin_time);
          console.log(item.exam.begin_time);
          item.exam.yes = true;
          this.passExamInfo_All.push(item);
        });
      }
      if (noexam !== null) {
        noexam.forEach(item => {
          item.exam.begin_time = this.changeTime(item.exam.begin_time);
          item.exam.yes = false;
          this.passExamInfo_All.push(item);
        });
      }
      this.pager();
      this.showPage();
      this.check();
    },
    upPage() {
      if (this.start !== 0) {
        this.start -= 5;
        this.nowpage -= 1;
        this.showPage();
      }
    },
    downPage() {
      if (this.nowpage !== this.totalpage) {
        this.start += 5;
        this.nowpage += 1;
        this.showPage();
      }
    },
    firstPage() {
      this.start = 0;
      this.nowpage = 1;
      this.showPage();
    },
    lastPage() {
      this.start = (this.totalpage - 1) * 5;
      this.nowpage = this.totalpage;
      this.showPage();
    },
    pager() {
      if (this.passExamInfo_All) {
        let exam_num = this.passExamInfo_All.length;
        if (exam_num <= 5) {
        } else {
          if (exam_num % 5 == 0) exam_num -= 1; // 避免页数为5的倍数时影响下一步
          this.totalpage = parseInt(exam_num / 5) + 1; // 判断页数
          this.pagerSeen = true;
        }
      }
    },
    showPage() {
      this.exams = this.passExamInfo_All.slice(this.start, this.start + 5);
      // console.log(this.passExamInfo_All);
      scrollTo(0, 0);
    },
    toDetail(examId) {
      this.$store.dispatch('set_examId', examId);
      window.location.href = '/StuExamDetail';
    },
    toCheckGrades(examId) {
      this.$store.dispatch('set_examId', examId);
      window.location.href = '/StuExamGrades';
    },
    check() {
      if (this.exams == '') {
        this.NoExams = true;
      }
    },
    changeTime(sj) {
      const date = new Date(sj); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const dateNumFun = (num) => num < 10 ? `0${num}` : num;
      const Y = `${date.getFullYear()}/`;
      const M = `${dateNumFun(date.getMonth())}/`;
      const D = `${dateNumFun(date.getDate())} `;
      const h = `${dateNumFun(date.getHours())}:`;
      const m = `${dateNumFun(date.getMinutes())}:`;
      const s = `${dateNumFun(date.getSeconds())}`;
      return Y + M + D + h + m + s;
    },
  },

  beforeMount() {
    this.addNoExamToYesExam();
  },
};
</script>

<style lang="less" scoped>
.middle {
  margin: 15px 1px;
  width: auto;
  padding-left: 5px;
  flex-direction: column;

  #exam {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin: 10px auto;
    padding: 10px 3px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);

    .one {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: baseline;
      height: auto;
      padding-top: 10px;
      cursor: pointer;

      img {
        width: 15px;
      }

      .name {
        font-weight: bold;
        margin-left: 5px;
        color: red;
      }
      .name:hover {
        font-size: 18px;
        transition: all 0.8s ease;
      }
      .yescolor {
        color: green;
      }

      .time {
        font-size: 13px;
        margin-left: 15px;
      }
    }

    .two {
      font-size: 14px;
      text-align: left;
      margin-left: 5px;
      margin-top: 5px;
      margin-bottom: 0px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      span {
        margin-right: 20px;
      }
      img {
        width: 15px;
      }
      .green {
        color: green;
        margin-right: 15px;
      }
      .orange {
        color: orange;
        margin-right: 15px;
      }
    }
  }
  .buttons {
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .text {
      width: auto;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
    }

    .changepage {
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 20px;
      margin: 10px 20px;
      width: 80px;
      height: 30px;
      font-size: 15px;
      background-color: #5379a5c4;
      cursor: pointer;
      outline: none;
      transition: all 0.3s ease;
    }
    .changepage:hover {
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
  }
}
</style>
