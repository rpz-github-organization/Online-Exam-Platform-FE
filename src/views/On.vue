<template>
  <div class="body">
    <!-- <div/> class="top">考试安排表</div> -->
    <button @click="copy" >复制</button>
    <div class="exam" id="exam">
      <div class="one">
        <div class="name">
          <img src="../assets/exam.png" alt="exam" />
          {{name}}
        </div>
        <div class="time">{{time}}</div>
      </div>
      <div class="two">{{detail}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'On',
  data() {
    return {
      jock: '笑话',
      name: '考试名字',
      time: '考试时间',
      detail: '考试信息',
    };
  },
  // 尝试复制exam节点
  // methods: {
  //   copy() {
  //     const exam = document.getElementById('exam');
  //     const newExam = exam.cloneNode(true);
  //     newExam.appendChild(exam);
  //   },
  // },
};
</script>

<style lang="less" scoped>
.body {
  margin: 15px 1px;
  width: 100%;
  flex-direction: column;
  //   .top {
  //     font-size: 15px;
  //     font-weight: bold;
  //     height: 40px;
  //     line-height: 40px;
  //   }
  .exam {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: white;
    border-style: outset;
    margin: 5px auto;

    .one {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: baseline;
      height: auto;
      line-height: 50px;
      padding-top: 15px;
      color: rgb(27, 165, 230);

      img {
        width: 15px;
      }

      .name {
        font-size: 18px;
        margin-left: 5px;
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
      margin-bottom: 5px;
    }
  }
}
</style>
