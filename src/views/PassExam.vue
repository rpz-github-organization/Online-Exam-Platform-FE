<template>
  <div>
    <ul v-for="(exam,index) in noExams" :key=" 'you' + index" id="middle">
      <li id="exam">
        <div class="one">
          <div class="name name_no">
            <img src="../assets/exam.png" alt="exam" />
            {{ exam.exam_name }}
            <img id="check" src="../assets/exam_no.png" />
          </div>
          <div class="time">{{ exam.begin_time }}</div>
        </div>
        <div class="two">
考试时长：{{ exam.last_time }}小时</div>
      </li>
    </ul>

    <ul v-for="(exam,index) in yesExams" :key=" 'me' + index" id="middle">
      <li id="exam">
        <div class="one">
          <div class="name name_yes">
            <img src="../assets/exam.png" alt="exam" />
            {{ exam.exam_name }}
            <img id="check" src="../assets/exam_yes.png" />
          </div>
          <div class="time">{{ exam.begin_time }}</div>
        </div>
        <div class="two">
考试时长：{{ exam.last_time }}小时</div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'passExam',

  data() {
    return {
      // noExams: [
      //   {
      //     exam_name: 'I dont know',
      //     begin_time: '2019-12-01',
      //     last_time: '1.5',
      //   }, {
      //     exam_name: 'The first exam of c',
      //     begin_time: '2019-01-01',
      //     last_time: '2',
      //   }],

      // yesExams: [
      //   {
      //     exam_name: 'Idsa dont know',
      //     begin_time: '2019-12-01',
      //     last_time: '1.5',
      //   }, {
      //     exam_name: 'Thdsae first exam of c',
      //     begin_time: '2019-01-01',
      //     last_time: '2',
      //   }],

      yesExams: '',
      noExams: '',
    };
  },
  methods: {
    async getStuNoExamInfo() {
      try {
        const res = await this.$axios.post('api/homePage/stu/id', {
          stu_id: this.uid,
          status: 1,
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          const noExam = info.data;
          const noExamInfo = JSON.stringify(noExam);
          // 给noExams赋值
          this.noExams = noExamInfo;
          console.log(noExamInfo);
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getStuYesExamInfo() {
      try {
        const res = await this.$axios.post('api/homePage/stu/id', {
          stu_id: this.uid,
          status: 2,
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          const yesExam = info.data;
          const yesExamInfo = JSON.stringify(yesExam);
          // 给yesExam 赋值
          this.yesExams = yesExamInfo;
          console.log(yesExamInfo);
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  beforeMount() {
    this.getStuNoExamInfo();
    this.getStuYesExamInfo();
  },

};
</script>

<style lang="less" scoped>
#middle {
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
      // line-height: 30px;
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
        transition: all 0.8s ease;
      }
      .name_no{
        color: red;
      }
      .name_yes{
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
    }
  }
}
</style>
