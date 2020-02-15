<template>
  <div class="tch">
    <div class="title">
      <img src="../assets/title_tch.png" class="word" />
    </div>
    <div class="main">
      <div class="middle">
        <ul v-for="(course, index) in courses" :key="index" class="course">
          <li class="cour">
            <div class="name" @click.stop="toDetail(course.co_id)">
              <img src="../assets/course.png" />
              {{ course.name }}
            </div>
            <div class="details">
              学分：{{ course.credit }}
              <br />
              学时：{{ course.school_hour }}
              <br />
              考试分数：{{ course.exam_score }}
              <br />
              平均分：{{ course.common_score }}
              <br />
              卷面分占比：{{ course.exam_proportion }}
            </div>
          </li>
        </ul>
      </div>
      <div class="right">
        <img v-if="male" src="../assets/head_tch_male.png" />
        <img v-if="!male" src="../assets/head_tch_female.png" />
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
      male: true,
      greeting: '',
      courses: '',
    };
  },

  methods: {
    async getTchNameAndSex() {
      try {
        const res = await this.$axios.get(
          `${this.HOST}/PersonalData/getTeacher`,
        );
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          const teaInfo = info.data;
          this.name = teaInfo.name;
          if (teaInfo.sex === 'female') this.male = false;
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCourseInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/homePage/tea/id`, {
          // tea_id: this.uid,
          tea_id: '2018110257',
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          const courseInfo = info.data;
          console.log(courseInfo);
          this.courses = courseInfo;
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
    toDetail(coId) {
      this.$store.dispatch('set_coId', coId);
      window.location.href = '/TeaCourseDetail';
    },
  },

  created() {
    const d = new Date();
    if (d.getHours() < 12) this.greeting = '上午好！';
    else if (d.getHours() >= 12 && d.getHours() < 18) {
      this.greeting = '下午好！';
    } else this.greeting = '晚上好！';
  },

  mounted() {
    this.getTchNameAndSex();
    this.getCourseInfo();
  },
};
</script>

<style scopd lang="less">
.tch {
  height: 100%;
  width: 100%;
  margin-top: 47px;
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
    height: auto;
    width: 100%;
    background: url(../assets/index_background_tch.gif);

    .right {
      // margin-left: 25px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      font-size: 16px;
      margin-top: 15px;
      margin-right: 50px;
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
      height: auto;
      width: 100%;
      margin-right: 15px;
      margin-left: 50px;
      justify-content: flex-start;
      align-content: flex-start;

      .course {
        display: flex;
        justify-content: space-between;
        margin-left: 4%;
        width: 25%;
        height: auto;
        padding-top: 10px;
        padding-left: 10px;
        background-color: #fff;
        border-radius: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);

        .cour {
          display: flex;
          padding-left: 5px;
          justify-content: flex-start;
          flex-direction: column;

          .name {
            display: flex;
            padding-left: 5px;
            justify-content: flex-start;
            flex-wrap: nowrap;
            font-size: 20px;
            font-weight: bold;
            margin-left: 5px;

            img {
              width: 25px;
              height: 25px;
              margin-right: 5px;
            }
          }

          .name:hover {
            font-size: 22px;
            transition: all 0.5s ease;
          }

          .details {
            margin-left: 15px;
            margin-bottom: 10px;
            margin-top: 5px;
            text-align: start;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
