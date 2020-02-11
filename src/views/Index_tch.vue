<template>
  <div class="tch">
    <div class="title">
      <img src="../assets/title_tch.png" class="word" />
    </div>
    <div class="main">
      <div class="middle">
        <ul v-for="(course,index) in course" :key="index" class="course">
          <li class="name">
            <div class="name"><img src="../assets/course.png" />{{ course.name }}</div>
            <div class="details">
              学分：{{ course.credit }} <br/>
              学时：{{ course.school_hour }} <br/>
              考试分数：{{ course.exam_score }} <be/>
              平均分：{{ course.common_score }} <br/>
              卷面分占比：{{ course.exam_proportion }}
            </div>
          </li>
        </ul>
      </div>
      <div class="right">
        <img src="../assets/head_tch.png" alt="defaul" />
        <div class="hello">
          {{ name }}老师
          <br />
          <br />现在是
          <br />
          {{ new Date().toLocaleString("chinese", { hour12: false }).substring(0, 15) }}
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
export default {
  name: 'indexStu',

  data() {
    return {
      name: '川师',
      greeting: '',
      course: [{
        name: 'English',
        credit: 14,
        school_hour: 36,
        exam_score: 100,
        common_socre: 87,
        exam_proportion: '60%,',
      }],
    };
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

<style scopd lang="less">
.tch {
  height: 100%;
  width: 100%;
  border: 1px solid green;
  position: fixed;
  background: url(../assets/index_background_tch.gif);
  .title {
    display: flex;
    flex-direction: row;
    height: 80px;
    margin: 0px auto;
    background-color: #2850a7;

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
    height: 100%;
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
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-right: 15px;
      justify-content: flex-start;
      align-content: flex-start;

      .course {
        display: flex;
        justify-content: space-between;
        margin-left: 4%;
        width: 25%;
        height: 50px;
        padding-top: 10px;
        padding-left: 10px;
        background-color: #fff;
        border-radius: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);

        .name {
          display: flex;
          padding-left: 5px;
          justify-content: flex-start;
          flex-wrap: nowrap;
          font-size: 18px;
          font-weight: bold;
          margin-left: 5px;
        }

        img {
          width: 25px;
          height: 25px;
          margin-right: 5px;
        }

        .name:hover {
          font-size: 20px;
          transition: all 0.5s ease;
        }
      }
    }
  }
}
</style>
