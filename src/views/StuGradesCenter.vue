<template>
    <div id="GradesCenter">
        <div class="middle">
            <el-card>
                <div class="title">{{ this.ExamName }}</div>
                <div class="table">
                    <el-table
                    :data="grades"
                    stripe
                    style="width: 100%">
                        <el-table-column
                        prop="id"
                        label="学号"
                        width="200px">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="200px">
                        </el-table-column>
                        <el-table-column
                        prop="score"
                        label="成绩"
                        width="200px">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
            <el-button class="return" @click="GoBack()">返回</el-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GradesCenter',
  computed: {
    ...mapState(['examId']),
    ...mapState(['uid']),
  },
  data() {
    return {
      ExamName: 'naame',
      grades: [],
    };
  },
  created() {
    this.getScore();
  },
  methods: {
    async getScore() {
      try {
        const res = await this.$axios.post(`${this.HOST}/course/getStuExam`, {
          exam_id: this.examId,
        });
        const info = res.data.data;
        console.log(info);
        this.ExamName = info.exam_name;
        info.data.forEach((element) => {
          this.grades.push({
            id: element.stu_id,
            name: element.stu_name,
            score: element.score,
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
    GoBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
#GradesCenter{
  height: 100%;
  width: 100%;
  background: url(../assets/index_background_tch.gif);
  display: flex;
  justify-content: center;

  .middle{
      margin-top: 40px;
      width: auto;
  }
  .title{
      text-align: left;
      font-weight: bold;
      margin-left: 20px;
      font-size: 26px;
      margin-bottom: 30px;
  }
  .table{
      margin: 10px 40px;
  }
  .return{
    margin-top: 20px;
  }
}
</style>
