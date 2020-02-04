<template>
  <div id="middle">
    <!-- <button @click="copyExam">复制</button> -->
    <div id="exam">
      <div class="one">
        <div class="name">
          <img src="../assets/exam.png" alt="exam" />
          {{ name }}
        </div>
        <div class="time">{{ time }}</div>
      </div>
      <div class="two">{{ detail }}</div>
    </div>
        <div id="exam">
      <div class="one">
        <div class="name">
          <img src="../assets/exam.png" alt="exam" />
          {{name}}
        </div>
        <div class="time">{{ time }}</div>
      </div>
      <div class="two">{{ detail }}</div>
    </div>
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
    };
  },
  // 尝试复制exam节点
  methods: {
    copyExam() {
      const middle = document.getElementById('middle');
      const oldExam = document.getElementById('exam');
      const newExam = oldExam.cloneNode(true);
      middle.appendChild(newExam);
    },
    // 从后台拉数据 data
    // async getInfo() {
    //   try {
    //     const res = await this.$axios.post(`${this.HOST}/getstu_infor`, {
    //       uid: this.uid,
    //     });
    //     const info = res.data;
    //     console.log(info);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
#middle {
  margin: 15px 1px;
  width: 100%;
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
