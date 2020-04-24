<template>
  <div class="stu">
    <div class="title">
      <img src="../../assets/title_tch.png" class="word" />
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
              <div class="two">考试课程：{{exam.co_name}}</div>
              <div class="two">
                <div>考试时长：{{exam.last_time}}分钟</div>
              </div>
            </li>
          </ul>
          <div class="buttons" v-if="pagerSeen">
            <button @click="upPage" class="changepage">上一页</button>
            <div class="text">当前第 {{ nowpage }} 页 ，共 {{ totalpage }} 页</div>
            <button @click="downPage" class="changepage">下一页</button>
          </div>
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
      exams: [],
      ExamInfo_All: [],
      start: 0,
      nowpage: 1,
      totalpage: '',
      pagerSeen: false,
      isActive: true,
      male: true,
    };
  },

  created() {
    this.getInfo();
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
    //获取所有已打分的exam
    async getInfo() {
      try{
        const res = await this.$axios.post(`${this.HOST}/course/getDoneExam`,{
          tea_id: this.uid,
        });
        const info = res.data.data;
        console.log(info);
        if (res.data.code === 200) {
          info.forEach(element => {
            this.ExamInfo_All.push({
              name: element.exam_name,
              begin_time: this.changeTime(element.begin_time),
              last_time: element.last_time,
              co_name: element.co_name,
              exam_id: element.exam_id,
            });
          });
          this.pager();
          this.showPage();
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
      let exam_num = this.ExamInfo_All.length;
      if (exam_num <= 5) {
      } else {
        const page_num = parseInt(exam_num / 5) + 1; // 判断页数
        this.totalpage = page_num;
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
      window.location.href = '/StuGradesCenter';
    },
    changeTime(sj) {
      const date = new Date(sj); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = `${date.getFullYear()}/`;
      const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/`;
      const D = `${date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : date.getDate() + 1} `;
      const h = `${date.getHours() + 1 < 10 ? `0${date.getHours() + 1}` : date.getHours() + 1}:`;
      const m = `${date.getMinutes() + 1<10?`0${date.getMinutes() + 1}` : date.getMinutes() + 1}:`;
      const s = `${date.getSeconds() + 1<10?`0${date.getSeconds() + 1}` : date.getSeconds() + 1}`;
      return Y + M + D + h + m + s;
    },
  },

};
</script>


<style scoped lang="less">
.stu {
  height: 100%;
  width: 100%;
  margin-top: 47px;
  background: url(../../assets/index_background_tch.gif);

  .title {
    display: flex;
    flex-direction: row;
    height: 80px;
    margin: 0px auto;
    background-color: #2850a7;

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
    background: url(../../assets/index_background_tch.gif);

    .middle {
      width: 85%;
      flex-shrink: 1;
      margin: 15px 1px;
      flex-direction: column;
      margin-left: 70px;

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
