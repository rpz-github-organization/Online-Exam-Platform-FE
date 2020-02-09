<template>
<div>
  <ul v-for="(exam,index) in exams" :key="index" id="middle">
    <!-- <button @click="copyExam">复制</button> -->
    <li id="exam">
      <div class="one">
        <div class="name">
          <img src="../assets/exam.png" alt="exam" />
          {{ exam.exam_name }}
          <img id="check" src="../assets/yes.png" alt />
        </div>
        <div class="time">
          {{ exam.begin_time }}
        </div>
      </div>
      <div class="two">{{ exam.exam_detail }}</div>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'On',

  data() {
    return {
      name: '考试名字',
      time: '考试时间',
      detail: '考试信息',
      exams: [
        {
          exam_name: 'the first exam of c',
          begin_time: '2019-01-01',
          exam_detail: 'nothing',
        }, {
          exam_name: 'I dont know',
          begin_time: '2019-12-01',
          exam_detail: 'nothingnothingnothing',
        }],
    };
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
      line-height: 30px;
      padding-top: 10px;
      // color: rgb(27, 165, 230);

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
