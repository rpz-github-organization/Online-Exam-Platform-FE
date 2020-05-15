<template>
  <div class="body">
    <div class="main">
      <div class="name">{{ exam.name }}</div>
      <div class="row">
        <div>考生：{{ exam.stu_name }}</div>
        <div>课程：{{exam.co_name}}</div>
        <div>任课老师：{{ exam.tea_name }}</div>
        <div>考试时间：{{ exam.begin_time }}</div>
        <div style="fontWeight:bold">考试总成绩：{{ exam.grade }} 分</div>
        <div class="detail" v-for="(bigQues,index_1) in this.Ques" :key="index_1">
          <div class="title">{{ bigQues.type}}</div>
          <div class="eachs">
            <div
              class="each"
              v-for="(each,index_2) in bigQues.detail"
              :key="index_2"
              :class="{ wrong: !each.status, part_right:each.status==2,
              chosen: index_2 == index_02 && index_1==index_01}"
              @click.stop="getQuesDetail( each.num,each.question_id,index_1,index_2 )"
            >{{ each.num }}</div>
          </div>
          <div class="ques_card" v-if="index_1 == index_01">
            <div class="quesTitle">第{{ num }}题. {{ question.question}}</div>
            <div id="single" v-if="question.type == 'Single'" style="margin:0px;">
              <div class="options">
                <div
                  class="opt"
                  :class="{answer:question.answer=='A',wrong:question.stu_answer=='A'}"
                >A. {{question.options[0]}}</div>
                <div
                  class="opt"
                  :class="{answer:question.answer=='B',wrong:question.stu_answer=='B'}"
                >B. {{question.options[1]}}</div>
                <div
                  class="opt"
                  :class="{answer:question.answer=='C',wrong:question.stu_answer=='C'}"
                >C. {{question.options[2]}}</div>
                <div
                  class="opt"
                  :class="{answer:question.answer=='D',wrong:question.stu_answer=='D'}"
                >D. {{question.options[3]}}</div>
              </div>
            </div>
            <div id="judge" v-if="question.type == 'Judge'" style="margin:0px;">
              <div class="options judge">
                <div
                  class="opt"
                  style="fontSize:20px;"
                  :class="{answer:question.answer=='√',wrong:question.stu_answer=='√'}"
                >⊙√</div>
                <div
                  class="opt"
                  style="fontSize:20px;"
                  :class="{answer:question.answer=='×',wrong:question.stu_answer=='x'}"
                >⊙×.</div>
              </div>
            </div>
            <div
              id="program"
              v-if="question.type=='Normal_Program'||question.type=='Special_Program'"
              style="margin:5px;"
            >
              <div class="put" style="margin:5px;fontSize:16px;fontWeight:bold;color:grey">
                输入：{{question.input}}
                <br />
                输出：{{question.output}}
              </div>
            </div>
            <div class="info">
              <div
                :class="{green:question.getScore == question.score,
                yellow:question.getScore != question.score,red:question.getScore==0}"
                style="marginBottom:5px;"
                v-if="question.type == 'Single'||question.type == 'Judge'"
              >
                你选择的答案是“{{ question.stu_answer }}”,
                本题参考答案是“{{ question.answer}}”。
              </div>
              <div
                style="margin:5px 0px;lineHeight:30px;"
                v-if="question.type=='Normal_Program'||question.type=='Special_Program'
                || question.type == 'Discussion'"
              >
                你的答案是：
                <br />
                <textarea
                  class="pre.text"
                  cols="70"
                  rows="10"
                  wrap="hard"
                  readonly
                  v-model="question.stu_answer"
                ></textarea>
              </div>
              <div
                :class="{green:question.getScore == question.score,
                yellow:question.getScore != question.score,red:question.getScore==0}"
              >该小题得分 {{question.getScore}} 分 / 本小题总分 {{ question.score }} 分</div>
            </div>
          </div>
          <div class="total">该题得分：{{ bigQues.get }}分 / 该题总分 {{ bigQues.total }}分</div>
        </div>
      </div>
    </div>
    <div>
      <button class="back" @click="back">返回</button>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['examId']),
    ...mapState(['uid']),
  },

  data() {
    return {
      index_01: -1,
      index_02: -1,
      num: -1,
      exam: [],
      Ques: [],
      question: '',
      stu_id: '',
    };
  },
  beforeMount() {
    const url = document.referrer;
    console.log(url);
    if (url.search('/StuGradesCenter') !== -1 || url.search('GradesCenter_tch') !== -1 || url.search('TeaCourseDetail') !== -1) {
      this.stu_id = this.$route.query.id;
    } else {
      this.stu_id = this.uid;
    }
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
    back() {
      this.$router.back(-1);
    },
    async getStuExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/getStuExamInfo`, {
          exam_id: this.examId,
          stu_id: this.stu_id,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('data', info.data);
          this.exam = info.data;
          this.exam.Ques.forEach((item) => {
            if (item.type !==null) {
              this.Ques.push(item);
            }
          })
          this.timestampToDate();
          this.toChinese();
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
    async getQuesDetail(num, question_id, index_1, index_2) {
      this.index_01 = index_1;
      this.index_02 = index_2;
      this.num = num;
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/getQuestionTea`, {
          exam_id: this.examId,
          stu_id: this.stu_id,
          question_id: question_id,
        });
        const info = res.data;
        if (info.code === 200) {
          // console.log('question:', info.data);
          this.question = info.data;
          this.splitOptions();
          this.changeJudge();
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
    // 转换时间戳
    timestampToDate() {
      let timestamp = this.exam.begin_time;
      let newDate = new Date();
      newDate.setTime(timestamp);
      this.exam.begin_time = newDate.toLocaleString();
    },
    // 转换 Single 为中文
    toChinese() {
      let Ques = this.exam.Ques;
      // console.log('Ques:', Ques);
      Ques.forEach(item => {
        if (item.type == 'Single') {
          item.type = '选择题';
        } else if (item.type == 'Judge') {
          item.type = '判断题';
        } else if (item.type == 'Discussion') {
          item.type = '讨论题';
        } else if (
          item.type == 'Normal_Program' ||
          item.type == 'Special_Program'
        ) {
          item.type = '编程题';
        }
      });
    },
    splitOptions() {
      if (this.question.type != 'Single') {
        return;
      }
      this.question.options = this.question.options.split(';');
      // console.log('question:', this.question);
    },
    changeJudge() {
      if (this.question.type != 'Judge') {
        return;
      }
      if (this.question.answer == 'true') {
        this.question.answer = '√';
      } else {
        this.question.answer = '×';
      }
      // console.log('answer', this.question.answer);
      if (this.question.stu_answer == 'true') {
        this.question.stu_answer = '√';
      } else {
        this.question.stu_answer = '×';
      }
    },
  },
  mounted() {
    this.getStuExamInfo();
  },
};
</script>

<style scoped lang="less">
.body {
  // height: 100%;
  padding-top: 20px;
  background: url('../../assets/index_background_stu.gif');

  .main {
    background-color: #fff;
    margin: 0px auto;
    // height: 60%;
    width: 50%;
    padding-left: 80px;
    padding-right: 80px;
    padding-top: 60px;
    padding-bottom: 30px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .name {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .row {
      font-size: 18px;
      display: flex;
      flex-direction: column;
      text-align: start;
      div {
        margin-bottom: 25px;
      }
      .detail {
        border-radius: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
        padding: 10px 20px;
        padding-bottom: 0px;

        .title,
        .total {
          font-weight: bold;
        }
        .eachs {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 15px;

          .each {
            margin: 5px 5px;
            text-align: center;
            line-height: 30px;
            height: 30px;
            width: 30px;
            border-radius: 15px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
            cursor: pointer;
          }
          .wrong {
            background-color: rgba(241, 107, 107, 0.932);
            font-weight: bold;
          }
          .part_right {
            background-color: orange;
            font-weight: bold;
          }
          .chosen {
            font-size: 25px;
            line-height: 40px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
        }
        .ques_card {
          margin: 10px 10px;
          padding: 5px 30px;
          border-radius: 3px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
          display: flex;
          flex-direction: column;

          .quesTitle {
            font-size: 18px;
            text-align: start;
            margin-bottom: 0px;
          }
          .options {
            margin-top: 5px;
            margin-bottom: 0px;
            .opt {
              margin: 5px;
              padding: 2px 5%;
              font-size: 17px;
            }
            .wrong {
              color: rgb(226, 83, 83);
              // font-weight: bold;
              font-size: 20px;
            }
            .answer {
              font-weight: bold;
              color: rgb(38, 228, 38);
              font-size: 20px;
            }
          }
          .judge {
            display: flex;
            flex-direction: row;
          }
          .info {
            font-size: 16px;
            margin-bottom: 5px;

            .green {
              color: rgb(78, 201, 78);
            }
            .yellow {
              color: rgb(233, 148, 36);
            }
            .red {
              color: rgb(226, 83, 83);
            }
            textarea {
              outline: 0 none;
              width: auto;
              height: auto;
              border-radius: 3px;
              border: 1px solid rgba(0, 0, 0, 0.2);
              box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
            }
            .pre-text {
              white-space: pre-wrap;
              word-wrap: break-word;
              word-break: break-all;
            }
          }
        }
      }
    }
  }

  .back {
    color: white;
    font-weight: bold;
    border: none;
    padding: 5px 30px;
    border-radius: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    width: auto;
    height: 40px;
    font-size: 18px;
    background-color: #5379a5c4;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
  }
  .back:hover {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.17);
  }
}
</style>
