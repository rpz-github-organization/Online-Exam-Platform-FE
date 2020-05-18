<template>
  <div id="examManagement">
    <div class="title">
      <h2>{{ this.examName }}</h2>
    </div>
    <el-divider></el-divider>
    <div class="list">
      <div class="list_row">
        <el-card>
          <div class="exam_row">
            <label class="iden">考试时间：{{ this.startTime }}</label>
          </div>
          <div class="exam_row">
            <label class="iden">考试时长：{{ this.examTime }}min</label>
          </div>
          <div class="exam_row">
            <label class="iden">考生人数：{{ this.stuN }}</label>
          </div>
          <div class="exam_row" v-if="status !== 1">
            <label class="iden">实际考生：{{ this.stuAc }}</label>
          </div>
          <div class="exam_row" v-if="status === 1">
            <label>题目编辑：</label>
            <el-button size="mini" @click="EditExam()">编辑题目</el-button>
          </div>
          <div class="exam_row" v-if="status === 1">
            <label>修改时间：</label>
            <el-button size="mini" @click="EditTime()">修改时间</el-button>
            <el-button
              size="mini"
              style="color:green"
              v-show="this.isEditTime"
              @click="ComfirmEditTime()"
            >确认修改</el-button>
            <el-button
              size="mini"
              style="color:red"
              v-show="this.isEditTime"
              @click="CancleEditTime()"
            >取消修改</el-button>
          </div>
          <div class="date" v-show="this.isEditTime">
            <el-date-picker
              v-model="date"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择日期时间"
            ></el-date-picker>
            <div class="con">
              <span class="title min">考试时长</span>
              <el-input v-model="editExamTime" placeholder="请输入考试时长" clearable></el-input>
              <span class="dan">分钟</span>
            </div>
          </div>
          <div class="exam_row" v-if="status !== 1">
            <label>题目查看：</label>
            <el-button size="mini" @click="QuesView()">查看题目</el-button>
          </div>
          <div class="exam_row" v-if="!isHand">
            <label>发布考试：</label>
            <el-button size="mini" @click="HandOut()">点击发布</el-button>
          </div>
          <div class="exam_row" v-if="status === 2">
            <label>延长考试</label>
            <el-button size="mini" @click="ExtendExam()">考试延长</el-button>
          </div>
          <div class="exam_row" v-if="status === 2">
            <label>终止考试</label>
            <el-button size="mini" @click="ExamEnd()">终止考试</el-button>
          </div>
          <div class="exam_row" v-if="status === 3">
            <label>评卷：</label>
            <el-button size="mini" @click="JumpToScore()">点击评卷</el-button>
          </div>
          <div class="exam_row" v-if="status === 4">
            <label>考生成绩：</label>
            <el-button size="mini" @click="GetScore()">查看成绩</el-button>
          </div>
          <div class="warn_tip" v-if="!isHand">
            <span>
              <b>注意：只有发布考试后，学生才可以参加考试</b>
            </span>
          </div>
        </el-card>
      </div>
      <div class="button_row">
        <el-button @click="GoBack">返回</el-button>
        <el-button style="color:red" @click="DeleteExam()">删除该试卷</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'examManagement',
  data() {
    return {
      isEditTime: false,
      date: '',
      editExamTime: '',
      beginTime: '',
      examName: '',
      stuAc: 0,
      stuN: 0,
      examTime: '120min',
      startTime: '2020-02-02',
      status: 0,
      isHand: false,
      extendTime: 0,
      timer: '',
    };
  },
  created() {
    this.GetList();
  },
  computed: {
    ...mapState(['examId']),
    ...mapState(['uid']),
    ...mapState(['coId']),
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    GoBack() {
      // this.$router.go(-1);
      window.location.href = '/IndexTch';
    },
    sessionJudge() {
      localStorage.setItem('Login', 'false');
      this.$message({
        message: '登录过期，请重新登录',
        type: 'error',
        offset: 70,
      });
      this.$router.push('/');
    },
    // 删除试卷
    DeleteExam() {
      {
        this.$confirm('删除操作不可撤销，确认删除吗？', '提示', {
          confirmButtonText: '删除考试',
          cancelButtonText: '取消删除',
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
                window.location.href = '/TeaCourseDetail';
              }
            } catch (err) {
              console.log(err);
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              offset: 70,
              message: '已取消删除！',
            });
          });
      }
    },
    // 获取考试详情
    async GetList() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/getExamInfo`, {
          exam_id: this.examId,
        });
        const info = res.data.data;
        console.log(info);
        this.isHand = info.is_distribute;
        this.examName = info.exam_name;
        this.stuN = info.stu_number;
        this.stuAc = info.actual_number;
        this.examTime = info.last_time;
        const time = this.timestampToTime(info.begin_time);
        this.beginTime = info.begin_time;
        if (info.status === '考试未开始') {
          this.status = 1;
        }
        if (info.status === '考试中') {
          this.status = 2;
        }
        if (info.status === '考试结束未评分') {
          this.status = 3;
        }
        if (info.status === '考试结束已评分') {
          this.status = 4;
        }
        this.startTime = time;
      } catch (err) {
        console.log(err);
        // if (err.response.status === 401) {
        //   this.sessionJudge();
        // } else {
        //   this.$message({
        //     message: '系统异常',
        //     type: 'error',
        //     offset: 70,
        //   });
        // }
      }
    },
    // 编辑试卷
    EditExam() {
      window.location.href = document.referrer;
      window.location.href = '/AddQuestion';
    },
    // 检查考试时间是否过期
    timeDeprecatied() {
      // console.log("time",this.beginTime);
      // console.log(new Date().getTime());
      var nowTime = new Date().getTime();
      var beginTime = this.beginTime;
      console.log(nowTime, '--', beginTime);
      if (nowTime > beginTime) {
        this.$message({
          message: '请修改考试开考时间！',
          type: 'error',
          offset: 70,
        });
        return true;
      } else {
        return false;
      }
    },
    // 分发试卷
    async HandOut() {
      if (this.timeDeprecatied()) {
        return;
      }
      try {
        const res = await this.$axios.post(
          `${this.HOST}/exam/distributeExamToStudent`,
          {
            co_id: this.coId,
            exam_id: this.examId,
          }
        );
        // console.log(res);
        if (res.data.code === 200) {
          this.$message({
            message: '分发中',
            type: 'success',
            offset: 70,
          });
          this.timer = setTimeout(() => {
            this.Refresh();
          }, 2000);
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
    // 查看成绩
    GetScore() {
      this.$store.dispatch('set_examId', this.examId);
      this.$router.push('/StuGradesCenter');
    },
    // 查看题目
    QuesView() {
      window.location.href = '/ExamDetail';
    },
    // 评卷
    JumpToScore() {
      window.location.href = '/ScoreCenter';
    },
    // 结束考试
    async ExamEnd() {
      this.$confirm('您是否要结束考试？', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          try {
            const res = await this.$axios.post(
              `${this.HOST}/exam/changeExamStatus`,
              {
                exam_id: this.examId,
                extend_time: 0,
              }
            );
            const info = res.data;
            if (info.code === 200) {
              this.$message({
                type: 'success',
                message: '提交成功',
                offset: 70,
              });
              this.Refresh();
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
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          });
        });
    },
    // 延长考试
    ExtendExam() {
      this.$prompt('请输入延长时间（单位：min）', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          this.extendTime = value;
          this.SubExtend();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
            offset: 70,
          });
        });
    },
    async SubExtend() {
      try {
        const res = await this.$axios.post(
          `${this.HOST}/exam/changeExamStatus`,
          {
            exam_id: this.examId,
            extend_time: this.extendTime,
          }
        );
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功',
            offset: 70,
          });
          this.Refresh();
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
    Refresh() {
      const NewPage = `${'_empty?time='}${new Date().getTime() / 500}`;
      this.$router.push(NewPage);
      this.$router.go(-1);
    },
    timestampToTime(cjsj) {
      const date = new Date(cjsj); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = `${date.getFullYear()}-`;
      const M = `${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-`;
      const D = `${date.getDate()} `;
      const h = `${date.getHours()}:`;
      const m = `${date.getMinutes()}:`;
      const s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    async ComfirmEditTime() {
      console.log(this.date);
      const date = new Date(this.date.replace(/-/g, '/'));
      const lastTime = parseInt(this.editExamTime, 10);
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/addExam`, {
          exam_id:this.examId,
          name: this.examTitle,
          co_id: this.coId,
          tea_id: this.uid,
          begin_time: date.valueOf(),
          last_time: lastTime,
        });
        const info = res.data;
        // console.log(info.data);
        if (info.code === 200) {
          this.$store.dispatch('set_examId', info.data);
          this.$message({
            message: '修改成功！',
            type: 'success',
            offset: 75,
          });
          window.location.href = '/ExamInfo';
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
    EditTime() {
      this.isEditTime = true;
    },
    CancleEditTime() {
      this.isEditTime = false;
    },
  },
};
</script>

<style lang="less" scoped>
#examManagement {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: url(../assets/index_background_tch.gif);
  .title {
    text-align: left;
    margin-left: 50px;
    h2 {
      margin-bottom: 0;
    }
  }
  b {
    color: red;
  }
  .list {
    display: flex;
    flex-direction: column;
    width: 80%;
    .list_row {
      text-align: left;
      margin-left: 20%;
      margin-top: 10px;
    }
    .button_row {
      margin-top: 20px;
      margin-left: 20%;
      text-align: left;
    }
    .exam_row {
      display: flex;
      flex-direction: row;
      margin: 10px 5px;
      font-weight: bold;
      label {
        width: 100px;
      }
      .iden {
        width: 500px;
      }
    }
    .date {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
    .con {
      display: flex;
      flex-direction: row;
    }
    .min {
      width: 50%;
      margin: 10px 5px 10px 30px;
      color: #5d6670;
    }
    .dan {
      margin: 10px;
      width: fit-content;
      min-width: 40px;
    }
  }
}
</style>
