<template>
  <div>
    <ul v-for="(exam,index) in exams" :key="'a'+index" id="listcontent" class="middle">
      <li id="exam">
        <div class="one">
          <div class="name">
            <img src="../assets/exam.png" alt="exam" />
            {{ exam.name }}
          </div>
          <div class="time">{{ exam.begin_time }}</div>
        </div>
        <div class="two">
          考试时长：{{exam.last_time}}分钟</div>
      </li>
    </ul>
  </div>
</template>


<script>

import { mapState } from 'vuex';

export default {
  name: 'onExam',


  computed: {
    ...mapState(['uid']),
  },


  data() {
    return {
      // exams: [
      //   {
      //     name: 'The first exam of c',
      //     begin_time: '2019-01-01',
      //     last_time: '2',
      //   },
      //   {
      //     name: 'I don`t knowwww',
      //     begin_time: '2019-12-01',
      //     last_time: '1.5',
      //   },
      // ],
      exams: '',
    };
  },

  methods: {
    async getStuOnExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/homePage/stu/id`, {
          stu_id: this.uid,
          status: 0,
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          const onExamInfo = info.data;
          console.log(onExamInfo);
          this.exams = onExamInfo;
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  beforeMount() {
    this.getStuOnExamInfo();
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
    }
  }
}
</style>
