<template>
  <div class="stu">
    <div class="title">
      <img src="../assets/title_stu.png" class="word" />
    </div>
    <div class="main">
      <div class="left">
        <button class="onExam" @click="ChangeToOn"
        :class="{ notactive: !isActive }">正在进行的考试</button>
        <button class="passExam" @click="ChangeToPass"
        :class="{ notactive: isActive }">已经完成的考试</button>
      </div>
      <div class="middle">
        <OnExam v-if="Seen" />
        <PassExam v-if="!Seen" />
      </div>
      <div class="right">
        <img v-if="male" src="../assets/head_stu_male.png" />
        <img v-if="!male" src="../assets/head_stu_female.png" />
        <div class="hello">
          {{ name }}同学
          <br />
          <br />现在是
          <br />
          {{ new Date().toLocaleString("chinese", { hour12: false })
          .substring(0,new Date().toLocaleString("chinese", { hour12: false }).length-3) }}
          <br />
          <br />
          {{ greeting }}
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OnExam from './OnExam.vue';
import PassExam from './PassExam.vue';

export default {
  name: 'indexStu',

  components: {
    OnExam,
    PassExam,
  },

  data() {
    return {
      timestamp: '',
      name: '川师',
      greeting: '你好！',
      Seen: true,
      isActive: true,
      male: true,
    };
  },

  methods: {
    ChangeToOn() {
      this.Seen = true;
      this.isActive = true;
    },

    ChangeToPass() {
      this.Seen = false;
      this.isActive = false;
    },
    getTime() {
      const timestamp = new Date().getTime();
      this.timestamp = timestamp;
    },
    async getStuNameAndSex() {
      try {
        const res = await this.$axios.post('api/PersonalData/getStudent', {
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          const stuInfoJson = info.data;
          const stuInfo = JSON.stringify(stuInfoJson);
          this.name = stuInfo.stu_name;
          if (stuInfo.sex === 'female') this.male = false;
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  beforeMount() {
    this.getStuNameAndSex();
  },

  created() {
    const d = new Date();
    if (d.getHours() < 12) this.greeting = '上午好！';
    else if (d.getHours() >= 12 && d.getHours() < 18) this.greeting = '下午好！';
    else this.greeting = '晚上好！';
  },
  // 删除 Home|About
  mounted() {
    const parent = document.getElementById('app');
    const child = document.getElementById('nav');
    parent.removeChild(child);

    this.getTime();
  },
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped lang="less">
.stu {
  height: 100%;
  width: 100%;
  border: 1px solid green;
  position: fixed;
  background: url(../assets/index_background_stu.gif);

  .title {
    display: flex;
    flex-direction: row;
    height: 80px;
    margin: 0px auto;
    background-color: #276e51;

    .word {
      height: 60px;
      margin-top: 10px;
    }
  }

  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: auto;
    width: 90%;
    margin: auto;
    // background-color: rgba(219, 215, 208, 0.177);

    .right {
      margin-left: 25px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      font-size: 16px;
      margin-top: 15px;
      margin-right: 5px;
      width: 170px;
      height: 230px;
      padding-top: 20px;
      flex-shrink: 0;
      background-color: rgba(255, 251, 251, 0.87);

      img {
        width: 60px;
      }
    }

    .middle {
      width: 100%;
      flex-shrink: 1;
    }

    .left {
      display: flex;
      margin-top: 10px;
      margin-right: 15px;
      flex-direction: column;
      justify-content: flex-start;
      width: 150px;
      height: 100%;
      flex-shrink: 0;

      .onExam,
      .passExam {
        margin-top: 10px;
        color: black;
        // font-weight: bold;
        border: none;
        border-radius: 20px;
        padding: 5px 10px;
        width: 150px;
        height: 30px;
        font-size: 15px;
        line-height: 15px;
        background-color: #5379a563;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
      }

      .notactive {
        background: #5379a5c4;
        color: white;
        font-weight: bold;
        box-shadow: none;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      }
    }
  }
}
</style>
