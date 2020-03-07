<template>
  <div class="body">
    <div class="main">
      <div class="name">{{ exam.name }}</div>
      <div class="row">
        <div>考生：{{ exam.stu_name }}</div>
        <div>任课老师：{{ exam.tea_name }}</div>
        <div>考试时间：{{ exam.begin_time }}</div>
        <div class="detail" v-for="(bigQues,index_1) in exam.Ques" :key="index_1">
          <div class="title">{{ bigQues.type}}</div>
          <div class="eachs">
            <div
              class="each"
              v-for="(each,index_2) in bigQues.detail"
              :key="index_2"
              :class="{ correct: each.status, chosen: index_2 == index_02 && index_1==index_01}"
              @click.stop="getQuesDetail( each.num,index_1,index_2 )"
            >{{ each.num }}</div>
          </div>
          <div class="ques_card" v-if="index_1 == index_01">
            <div class="quesTitle">第{{ num }}题. {{ question.question}}</div>
            <div id="judge" v-if="question.type == 'Single'" style="margin:0px;">
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
            <div id="judge" v-if="question.type == 'Judge'"></div>
            <!-- <div id="discussion" v-if="question.type == 'Discussion'"></div> -->
            <!-- <div id="program" v-if="question.type == 'Program'"></div> -->
            <div class="info">
              <div
                :class="{green:question.getScore == question.score,
                red:question.getScore != question.score}"
                style="marginBottom:5px;"
                v-if="question.type == 'Single'||question.type == 'Judge'"
              >
                你的答案是“{{ question.stu_answer }}”,
                本题参考答案是“{{ question.answer}}”。
              </div>
              <div
                style="margin:5px 0px;lineHeight:30px;"
                :class="{green:question.getScore == question.score,
                yellow:question.getScore != question.score,red:question.getScore==0}"
                v-if="question.type == 'Discussion'||question.type == 'Program'"
              >
                你的答案是“{{ question.stu_answer }}”,
                <br />
                本题参考答案是“{{ question.answer}}”。
              </div>
              <div
                style="marginBottom:5px;"
              >该小题得分 {{question.getScore}} 分 / 本小题总分 {{ question.score }} 分</div>
            </div>
          </div>
          <div class="total">该题得分：{{ bigQues.get }}分 / 该题总分 {{ bigQues.total }}分</div>
        </div>
        <div style="fontWeight:bold">考试总成绩：{{ exam.grade }} 分</div>
      </div>
    </div>
    <div>
      <button class="back" @click="back">返回学生首页</button>
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
      exam: {
        name: 'First C examination',
        stu_name: 'Xiao Ming',
        tea_name: 'Mr.Lee',
        begin_time: '1234567890000',
        Ques: [
          {
            // num: '一',
            type: 'Single',
            detail: [
              {
                num: 1,
                status: 1,
              },
              {
                num: 2,
                status: 0,
              },
              {
                num: 3,
                status: 1,
              },
              {
                num: 4,
                status: 1,
              },
              {
                num: 5,
                status: 1,
              },
              {
                num: 6,
                status: 1,
              },
              {
                num: 7,
                status: 0,
              },
              {
                num: 8,
                status: 1,
              },
              {
                num: 9,
                status: 0,
              },
              {
                num: 10,
                status: 1,
              },
              {
                num: 11,
                status: 1,
              },
              {
                num: 12,
                status: 0,
              },
              {
                num: 13,
                status: 1,
              },
              {
                num: 14,
                status: 0,
              },
              {
                num: 15,
                status: 1,
              },
              {
                num: 16,
                status: 1,
              },
              {
                num: 17,
                status: 0,
              },
              {
                num: 18,
                status: 1,
              },
              {
                num: 19,
                status: 1,
              },
            ],
            get: 27,
            total: 30,
          },
          {
            type: 'Judge',
            detail: [
              {
                num: 1,
                status: 1,
              },
              {
                num: 2,
                status: 0,
              },
            ],
          },
        ],
        grade: 82,
      },
      question: {
        type: 'Single',
        // type: 'Discussion',
        // question:
        //   'What should u do?dsads fddf  dsfe dsf ewfds fdsfefds  e ef sdfs?',
        options: '1323;243232;3432;44324',
        answer: 'A',
        // answer: 'This is the correct answer',
        stu_answer: 'D',
        // stu_answer: 'this is the student`s answer',
        score: '10',
        getScore: '0',
      },
    };
  },
  methods: {
    back() {
      window.location.href = '/IndexStu';
    },
    async getStuExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/---`, {
          exam_id: this.examId,
          stu_id: this.uid,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('data', info.data);
          this.exam = info.data;
          this.timestampToDate();
          this.toChinese();
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
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
      console.log('Ques:', Ques);
      Ques.forEach(item => {
        if (item.type == 'Single') {
          item.type = '选择题';
        } else if (item.type == 'Judge') {
          item.type = '判断题';
        } else if (item.type == 'Discussion') {
          item.type = '讨论题';
        } else if (item.type == 'Program') {
          item.type = '编程题';
        }
      });
    },
    async getQuesDetail(num, index_1, index_2) {
      this.index_01 = index_1;
      this.index_02 = index_2;
      this.num = num;
      try {
        const res = await this.$axios.post(`${this.HOST}/-----`, {
          exam_id: this.examId,
          stu_id: this.uid,
          question_id: num,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('question:', info.data);
          this.question = info.data;
          this.splitOptions();
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
    splitOptions() {
      if (this.question.option) {
        this.question.options = this.question.options.split(';');
        // console.log('question:', this.question);
      }
    },
  },
  mounted() {
    // this.getStuExamInfo();
    this.timestampToDate();
    this.splitOptions();
    this.toChinese();
  },
};
</script>

<style scoped lang="less">
.body {
  // height: 100%;
  padding-top: 20px;
  background: url('../assets/index_background_stu.gif');

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
          .correct {
            background-color: rgba(113, 209, 113, 0.671);
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
              font-weight: bold;
              font-size: 20px;
            }
            .answer {
              font-weight: bold;
              color: rgb(38, 228, 38);
              font-size: 20px;
            }
          }
          .info {
            font-size: 16px;
            margin-bottom: 5px;

            .green {
              color: rgba(113, 209, 113, 0.671);
            }
            .yellow {
              color: rgb(233, 148, 36);
            }
            .red {
              color: rgb(226, 83, 83);
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
