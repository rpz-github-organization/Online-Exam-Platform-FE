<template>
    <div id="SelectCourse">
        <div class="title">
          <label>选课中心</label>
        </div>
        <div class="row">
          <div class="left">
            <button @click="UnderSelect()" :class="{ button_active: isSelect==0 }">可选课程</button>
            <button @click="Selected()" :class="{ button_active: isSelect==1 }">已选课程</button>
          </div>
          <div class="right">
            <el-card v-if="isSelect == -1">
              欢迎进入选课中心
            </el-card>
            <el-card v-if="isSelect !== -1">
              <el-card class="Course" v-for="course in courses" :key="course">
                <div class="Cardrow">
                  <label class="title">{{ course.courseName }}</label>
                  <label class="time">{{ course.courseTimeon }}-{{ course.courseTimeend }}</label>
                </div>
                <div class="teacher">{{ course.courseTeacher }}</div>
              </el-card>
            </el-card>
          </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SelectCourse',
  computed: {
    ...mapState(['uid']),
  },
  data() {
    return {
      isSelect: -1,
      courses: [
        {
          courseName: 'C语言程序设计', courseTeacher: 'xxx', courseTimeon: '2020年1月', courseTimeend: '2020年6月',
        }, {
          courseName: 'C语言程序设计', courseTeacher: 'xxx', courseTimeon: '2020年1月', courseTimeend: '2020年6月',
        }],
    };
  },

  methods: {
    async UnderSelect() {
      if (this.isSelect !== 0) {
        this.isSelect = 0;
      } else {
        this.isSelect = -1;
      }
      // try {
      //   const res = await this.$axios.post(`${this.HOST}/`, {
      //     uid: this.uid,
      //     option: this.isSelect,
      //   });
      //   console.log(res);
      // } catch (err) {
      //   console.log(err);
      // }
    },
    async Selected() {
      if (this.isSelect !== 1) {
        this.isSelect = 1;
      } else {
        this.isSelect = -1;
      }
      // try {
      //   const res = await this.$axios.post(`${this.HOST}/`, {
      //     uid: this.uid,
      //     option: this.isSelect,
      //   });
      //   console.log(res);
      // } catch (err) {
      //   console.log(err);
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.row{
  display: flex;
  width: 90%;
  justify-content: center;
  margin-top: 50px;
  .left{
    display: flex;
    flex-direction: column;
    margin-right: 5%;
    button{
        color: white;
        margin-bottom: 20px;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        padding: 5px 10px;
        width: 100px;
        font-size: 15px;
        background-color: #5379a5c4;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
        cursor: pointer;
        outline: none;
    }
    .button_active{
      background-color: #5379a563;
      box-shadow: none;
      font-weight: normal;
    }
  }
  .right{
    width: 60%;
    .Course{
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      .Cardrow{
        margin: 0 auto;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 5px;

        .title{
          font-size: 19px;
        }
        .time{
          font-size: 15px;
        }
      }
      .teacher{
        font-size: 15px;
        display: flex;
        padding: 5px;
      }
    }
  }
}
</style>
