<template>
  <div class="stu">
    <div class="title">
      <img src="../../assets/title_stu.png" class="word" />
    </div>
    <div class="main">
      <div class="middle">
        <div>
          <ul v-for="(exam,index) in exams" :key="index" class="middle">
            <li id="exam">
              <div class="one">
                <div class="name" @click.stop="toCheckGrades(exam.exam_id)">
                  <img src="../../assets/exam.png" alt="exam" />
                  {{ exam.name }}
                </div>
                <div class="time">{{ exam.begin_time }}</div>
              </div>
              <div class="two">考试课程：{{exam.co_name}} 任课教师：{{exam.tea_name}}</div>
              <div class="two">
                <div>考试时长：{{exam.last_time}}分钟</div>
                <div class="green" style="cursor:pointer" @click.stop="toCheckGrades(exam.exam_id)">
                  <img src="../../assets/exam_status/green.png" />
                  成绩：{{exam.score}}分
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
      </div>
      <div class="right">
        <img v-if="male" src="../../assets/head_stu_male.png" />
        <img v-if="!male" src="../../assets/head_stu_female.png" />
        <div class="hello">
          {{ name }}同学
          <br />
          <br />现在是
          <br />
          {{ new Date().toLocaleString("chinese", { hour12: false })
          .substring(0,new Date().toLocaleString("chinese", { hour12: false }).length-3) }}
          <br />
          <br />
          {{ greeting }}
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['uid']),
  },

  data() {
    return {
      name: '川师',
      greeting: '你好！',
      exams: '',
      ExamInfo_All: '',
      start: 0,
      nowpage: 1,
      totalpage: '',
      pagerSeen: false,
      isActive: true,
      male: true,
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
      window.location.href('/');
    },
    async getStuNameAndSex() {
      try {
        const res = await this.$axios.get(
          `${this.HOST}/PersonalData/getStudent`,
          {}
        );
        const info = res.data;
        // console.log(info);
        if (info.code === 200) {
          const stuInfo = info.data;
          this.name = stuInfo.name;
          if (stuInfo.sex === 'female') this.male = false;
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
    async getStuDoneExamInfo() {
      try {
        const res = await this.$axios.post(
          `${this.HOST}/exam/getStuScoreInfo`,
          {
            stu_id: this.uid,
          }
        );
        const info = res.data;
        if (info.code === 200) {
          // console.log('exams:', info.data);
          this.ExamInfo_All = info.data;
          this.timeStamp();
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
    timeStamp() {
      let examInfo = this.ExamInfo_All;
      examInfo.forEach(item => {
        let timestamp = item.begin_time;
        let newDate = new Date();
        newDate.setTime(timestamp);
        item.begin_time = newDate.toLocaleString();
      });
      this.onExamInfo_All = examInfo;
      this.pager();
      this.showPage();
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
    firstPage(){
      this.start = 0;
      this.nowpage = 1;
      this.showPage();
    },
    lastPage(){
      this.start = (this.totalpage-1)*5;
      this.nowpage = this.totalpage;
      this.showPage();
    },
    pager() {
      let exam_num = this.ExamInfo_All.length;
      if (exam_num <= 5) {
      } else {
        if (exam_num % 5 == 0)exam_num -=1; // 避免页数为5的倍数时影响下一步
        this.totalpage = parseInt(exam_num / 5) + 1; // 判断页数
        this.pagerSeen = true;
      }
    },
    // 控制显示的exams
    showPage() {
      this.exams = this.ExamInfo_All.slice(this.start, this.start + 5);
      scrollTo(0, 0);
    },
    toCheckGrades(examId) {
      this.$store.dispatch('set_examId', examId);
      window.location.href = '/StuExamGrades';
    },
  },

  beforeMount() {
    this.getStuNameAndSex();
    this.getStuDoneExamInfo();
  },

  created() {
    const d = new Date();
    if (d.getHours() < 12) this.greeting = '上午好！';
    else if (d.getHours() >= 12 && d.getHours() < 18)
      this.greeting = '下午好！';
    else this.greeting = '晚上好！';
  },
};
</script>


<style scoped lang="less">
.stu {
  height: 100%;
  width: 100%;
  margin-top: 47px;
  background: url(../../assets/index_background_stu.gif);

  .title {
    display: flex;
    flex-direction: row;
    height: 80px;
    margin: 0px auto;
    background-color: #276e51;

    .word {
      height: 60px;
      margin-top: 10px;
    }
  }

  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: auto;
    width: 100%;
    background: url(../../assets/index_background_stu.gif);

    .right {
      margin-left: 25px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      font-size: 16px;
      margin-top: 15px;
      margin-right: 50px;
      width: 170px;
      height: 230px;
      padding-top: 20px;
      flex-shrink: 0;
      background-color: rgba(255, 251, 251, 0.87);

      img {
        width: 60px;
      }
    }

    .middle {
      width: 85%;
      flex-shrink: 1;
      margin: 15px 1px;
      flex-direction: column;
      margin-left: 50px;

      #exam {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        margin: 10px auto;
        padding: 10px 10px;
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
          line-height: 30px;
          padding-top: 10px;

          img {
            width: 15px;
          }

          .name {
            font-weight: bold;
            margin-left: 5px;
          }
          .name:hover {
            font-size: 18px;
            cursor: pointer;
            transition: all 0.5s ease;
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

          img {
            width: 15px;
          }
          .green {
            color: green;
            margin-right: 15px;
          }
        }
      }
      .buttons {
        margin-bottom: 15px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-left: 50px;
        margin-right: 50px;

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
  }
}
</style>
