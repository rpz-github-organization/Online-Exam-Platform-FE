<template>
  <div>
    <ul v-for="(exam,index) in exams" :key="index" class="middle">
      <li id="exam">
        <div class="one">
          <div class="name" :class="{ yescolor: exam.yes }" @click.stop="toDetail(exam.exam_id)">
            <img src="../assets/exam.png" alt="exam" />
            {{ exam.name }}
            <img v-if="!exam.yes" src="../assets/exam_no.png" />
            <img v-if="exam.yes" src="../assets/exam_yes.png" />
          </div>
          <div class="time">{{ exam.begin_time }}</div>
        </div>
        <div class="two">
          <div>考试时长：{{exam.last_time}}分钟</div>
          <div class="green" v-if="exam._judge && exam.yes"
          @click="toCheckGrades" style="cursor:pointer">
            <img src="../assets/exam_status/green.png" > 已完成评分(点击查看)
          </div>
          <div class="orange" v-if="!exam._judge && exam.yes"
           style="cursor:pointer" >
            <img src="../assets/exam_status/orange.png" > 未完成评分
          </div>
        </div>
      </li>
    </ul>
    <div class="buttons" v-if="pagerSeen">
      <button @click="upPage" class="changepage">上一页</button>
      <div class="text">当前第 {{ nowpage }} 页 ，共 {{ totalpage }} 页</div>
      <button @click="downPage" class="changepage">下一页</button>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
<script>
import { mapState } from 'vuex';

export default {
  name: 'OnExam',

  computed: {
    ...mapState(['uid']),
  },

  data() {
    return {
      exams: '',
      exam_num: '',
      start: 0,
      ready: false,
      nowpage: 1,
      totalpage: '',
      pagerSeen: false,
      onExamInfo_All: '',
    };
  },

  methods: {
    async getStunoExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/homePage/stu/id`, {
          stu_id: this.uid,
          status: 0,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('no', info.data);
          return info.data;
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getStuyesExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/homePage/stu/id`, {
          stu_id: this.uid,
          status: 1,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('yes', info.data);
          return info.data;
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
    async addYesExamToNoExam() {
      const noexam = await this.getStunoExamInfo();
      const yesexam = await this.getStuyesExamInfo();
      noexam.forEach(item => {
        item.yes = false;
      });
      yesexam.forEach(item => {
        item.yes = true;
      });
      //  转换时间戳
      let examInfo = noexam.concat(yesexam);
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
    // 获得页数
    pager() {
      let exam_num = this.onExamInfo_All.length;
      if (exam_num <= 5) {
      } else {
        const page_num = parseInt(exam_num / 5) + 1; // 判断页数
        this.totalpage = page_num;
        this.pagerSeen = true;
      }
    },
    // 控制显示的exams
    showPage() {
      this.exams = this.onExamInfo_All.slice(this.start, this.start + 5);
      scrollTo(0, 0);
    },
    toDetail(examId) {
      this.$store.dispatch('set_examId', examId);
      window.location.href = '/StuExamDetail';
    },
    toCheckGrades(examId){
      this.$store.dispatch('set_examId', examId);
      // console.log(examId);
      window.location.href = '/StuExamGrades';
    }
  },

  beforeMount() {
    this.addYesExamToNoExam();
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
      display:flex;
      flex-direction: row;
      justify-content: space-between;

      img{
        width: 15px;
      }
      .green{
        color: green;
        margin-right: 15px;
      }
      .orange{
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
