<template >
  <div class="stu">
    <div class="title">
      <img src="../assets/sicnu.png" class="sicnu" />
      <img src="../assets/title.png" class="word" />
      <!-- <div class="word">Online-Exam-Platform</div> -->
    </div>
    <div class="navigate">
      这里是导航栏
      <br />高度暂定为50px，后面有内容再撑起来
    </div>
    <div class="main">
      <div class="left">
        <button class="on" @click="ChangeToOn" :class="{active:isActive}">正在进行的考试</button>
        <button class="pass" @click="ChangeToPass" :class="{active:!isActive}">已经完成的考试</button>
      </div>
      <div class="middle">
        <On v-if="Seen" />
        <Pass v-if="!Seen" />
      </div>
      <div class="right">
        <img src="../assets/head.png" alt="defaul" />
        <div class="hello">
          {{ name }}同学
          <br />
          <br />现在是
          <br />
          {{ new Date().toLocaleString('chinese', { hour12: false }).substring( 0, 15 ) }}
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
import On from '../views/On.vue';
import Pass from '../views/Pass.vue';

export default {
  name: 'IndexStu',

  components: {
    On,
    Pass,
  },

  data() {
    return {
      name: '某某',
      greeting: '',
      Seen: true,
      isActive: true,
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
  },

  beforeCreate() {
    // 设置网页背景色
    document
      .querySelector('body')
      .setAttribute('style', 'background-color: rgba(255, 251, 251, 0.87)');
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
    // const Body = document.getElementsByTagName('body');
    // Body.style.margin = '0px';
  },
};
</script>

<style scoped lang="less">
.stu {
  // margin: 0px;
  .title {
    display: flex;
    flex-direction: row;
    height: 100px;
    margin: 0px auto;
    background-color: #276e51;

    .sicnu {
      height: 90px;
      margin-top: 5px;
      margin-left: 5px;
    }

      .word {
        height: 60px;
        margin-top: 33px;
      }
  }
  .navigate {
    font-size: 14px;
    font-weight: bold;
    height: 50px;
    line-height: 25px;
    background-color: rgb(120, 233, 125);
    align-self: center;
    margin: auto;
    margin-top: 5px;
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
      height: 230px;;
      padding-top: 20px;
      flex-shrink: 0;

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
      font-size: 16px;
      margin-top: 15px;
      margin-right: 15px;
      flex-direction: column;
      justify-content: flex-start;
      width: 150px;
      height: 100%;
      flex-shrink: 0;

      .on,
      .pass {
        line-height: 30px;
        margin: 5px;
        border: 1px solid #96c2f1;
        cursor: pointer;
        background: #eff7ff;
        border-radius: 10px;
        outline: 0px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      }

      .active {
        background: #9ab4ce59;
        box-shadow: none;
      }
    }
  }
}
</style>
