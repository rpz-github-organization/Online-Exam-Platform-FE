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
                    <div class="exam_row">
                        <label class="iden">实际考生：{{ this.stuNum }}</label>
                    </div>
                    <div class="exam_row">
                        <label>题目查看：</label>
                        <el-button size="mini">查看题目</el-button>
                    </div>
                    <div class="exam_row">
                        <label>终止考试</label>
                        <el-button size="mini">终止考试</el-button>
                    </div>
                    <div class="exam_row">
                        <label>评卷：</label>
                        <el-button size="mini" @click="JumpToScore()">点击评卷</el-button>
                    </div>
                    <div class="exam_row">
                        <label>成绩中心：</label>
                        <el-button size="mini">成绩中心</el-button>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'examManagement',
  data() {
    return {
      examName: '体育',
      stuNum: 79,
      stuN: 79,
      examTime: '120min',
      startTime: '2020-02-02',
    };
  },
  created() {
    this.GetList();
  },
  methods: {
    async GetList() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/getExamInfo`, {
          exam_id: 66,
        });
        const info = res.data.data;
        console.log(info);
        this.examName = info.exam_name;
        this.stuNum = info.stu_number;
        this.StuN = info.actual_number;
        this.examTime = info.last_time;
        const time = this.timestampToTime(info.begin_time);
        this.startTime = time;
      } catch (err) {
        console.log(err);
      }
    },
    JumpToScore() {
      window.location.href = '/ScoreCenter';
    },
    timestampToTime(cjsj) {
      const date = new Date(cjsj); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = `${date.getFullYear()}-`;
      const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
      const D = `${date.getDate()} `;
      const h = `${date.getHours()}:`;
      const m = `${date.getMinutes()}:`;
      const s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
};
</script>

<style lang="less" scoped>
#examManagement{
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title{
        text-align: left;
        margin-left: 50px;
        h2{
            margin-bottom: 0;
        }
    }
    .list{
        display: flex;
        flex-direction: column;
        width: 80%;
        .list_row{
            text-align: left;
            margin-left: 20%;
            margin-top: 10px;
        }
        .exam_row{
            display: flex;
            flex-direction: row;
            margin: 10px 5px;
            font-weight: bold;
            label{
                width: 100px;
            }
            .iden{
                width: 500px;
            }
        }
    }
}
</style>
