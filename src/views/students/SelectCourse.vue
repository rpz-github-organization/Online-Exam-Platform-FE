<template>
    <div id="selectCourse">
        <div class="row">
          <div class="left">
            <button @click="UnderSelect()" :class="{ button_active: isSelect==0 }">可选课程</button>
            <button @click="Selected()" :class="{ button_active: isSelect==1 }">已选课程</button>
          </div>
          <div class="right">
            <el-card v-if="isSelect == -1">
              <div class="tip" style="text-align: center;font-weight: bold">
                欢迎进入选课中心
              </div>
              <div class="tip">
                1.选课时，相同课程只能选择一位老师。
              </div>
              <div class="tip">
                2.退课时，只能对一门课程进行操作，若是想退多门所选课程，请重复操作。
              </div>
              <div class="tip" style="font-weight: bold">
                祝您选课愉快！
              </div>
            </el-card>
            <el-card v-if="isSelect !== -1 && status === 'yixuan'">
              <el-checkbox-group v-model="deleteList" :max="1">
                <el-card
                class="Course"
                v-for="(course, index) in coursePass"
                :key="index">
                  <div class="Cardrow">
                    <label class="title">{{ course.courseName }}</label>
                    <label class="time">
                      {{ course.courseTimeon }}---{{ course.courseTimeend }}
                    </label>
                  </div>
                  <div class="Cardrow">
                    <div class="teacher">{{ course.courseTeacher }}</div>
                    <el-checkbox :label="index">{{ }}</el-checkbox>
                  </div>
                </el-card>
              </el-checkbox-group>
            </el-card>
            <el-card v-if="isSelect !== -1 && status === 'kexuan'">
              <el-checkbox-group v-model="addList">
                <el-card
                class="Course"
                v-for="(course, index) in courseOn"
                :key="index">
                  <div class="Cardrow">
                    <label class="title">{{ course.courseName }}</label>
                    <label class="time">
                      {{ course.courseTimeon }}---{{ course.courseTimeend }}
                    </label>
                  </div>
                  <div class="Cardrow">
                    <div class="teacher">{{ course.courseTeacher }}</div>
                    <el-checkbox :label="index">{{ }}</el-checkbox>
                  </div>
                </el-card>
              </el-checkbox-group>
            </el-card>
            <div class="button_row">
              <el-button
              class="submit"
              @click="SubmitAdd()"
              v-show="isSelect !== -1&& status === 'kexuan'">提交选课</el-button>
              <el-button
              class="submit"
              @click="SubmitDelete()"
              v-show="isSelect !== -1&& status === 'yixuan'">退课</el-button>
            </div>
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
      addList: [],
      deleteList: [],
      status: '',
      coursePass: [], // 已选课程
      courseOn: [], // 可选课程
    };
  },
  methods: {
    sessionJudge() {
      localStorage.setItem('Login', 'false');
      this.$message({
        message: '登录过期，请重新登录',
        type: 'error',
        offset: 70,
      });
      window.location.href('/');
    },
    // 提交选课
    async SubmitAdd() {
      console.log(this.addList);
      try {
        const data = [];
        this.addList.forEach((item) => {
          data.push({
            co_id: this.courseOn[item].co_id,
            tea_id: this.courseOn[item].tea_id,
          });
        });
        // console.log(data);
        const res = await this.$axios.post(`${this.HOST}/course/saveToStuCo`, {
          data,
          stu_id: this.uid,
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: 70,
          });
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
        this.isSelect = -1;
      } catch (err) {
        if (err.response.status === 401) {
          this.sessionJudge();
        } else {
          this.$message({
            message: '系统异常',
            type: 'error',
            offset: 70,
          });
        }
      }
    },
    // 退课提交
    async SubmitDelete() {
      try {
        const index = this.deleteList[0];
        const res = await this.$axios.post(`${this.HOST}/course/deleteCourse`, {
          co_id: this.coursePass[index].co_id,
          tea_id: this.coursePass[index].tea_id,
          stu_id: this.uid,
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            message: '提交成功',
            type: 'success',
            offset: 70,
          });
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
        this.isSelect = -1;
      } catch (err) {
        if (err.response.status === 401) {
          this.sessionJudge();
        } else {
          this.$message({
            message: '系统异常',
            type: 'error',
            offset: 70,
          });
        }
      }
    },
    async UnderSelect() {
      this.status = 'kexuan';
      this.courseOn = [];
      this.addList = [];
      this.deleteList = [];
      if (this.isSelect !== 0) {
        this.isSelect = 0;
      } else {
        this.isSelect = -1;
      }
      try {
        const res = await this.$axios.post(`${this.HOST}/course/getByStu`, {
          stu_id: this.uid,
          option: 0,
        });
        const info = res.data.data;
        // console.log(info);
        if (res.data.code === 200) {
          info.forEach((item) => {
            this.courseOn.push({
              courseName: item.co_name,
              courseTeacher: item.tea_name,
              courseTimeon: item.begin_time,
              courseTimeend: item.end_time,
              co_id: item.co_id,
              tea_id: item.tea_id,
            });
          });
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
        // console.log(this.courseOn);
      } catch (err) {
        if (err.response.status === 401) {
          this.sessionJudge();
        } else {
          this.$message({
            message: '系统异常',
            type: 'error',
            offset: 70,
          });
        }
      }
    },
    async Selected() {
      this.coursePass = [];
      this.addList = [];
      this.deleteList = [];
      this.status = 'yixuan';
      if (this.isSelect !== 1) {
        this.isSelect = 1;
      } else {
        this.isSelect = -1;
      }
      try {
        const res = await this.$axios.post(`${this.HOST}/course/getByStu`, {
          stu_id: this.uid,
          option: 1,
        });
        const info = res.data.data;
        if (res.data.code === 200) {
          info.forEach((item) => {
            this.coursePass.push({
              courseName: item.co_name,
              courseTeacher: item.tea_name,
              courseTimeon: item.begin_time,
              courseTimeend: item.end_time,
              co_id: item.co_id,
              tea_id: item.tea_id,
            });
          });
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
      } catch (err) {
        if (err.response.status === 401) {
          this.sessionJudge();
        } else {
          this.$message({
            message: '系统异常',
            type: 'error',
            offset: 70,
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#selectCourse{
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  .row{
    width: 80%;
    margin-top: 50px;
    display: flex;
    flex-direction: row;
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
      display: flex;
      flex-direction: column;
      width: 60%;
      padding: 10px;
      .tip{
        text-align: left;
        margin: 10px 5px;
      }
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
      .button_row{
        margin: 20px 0;
        display: flex;
        justify-content: center;
      }
      .submit{
        width: 100px;
      }
    }
  }
}
</style>
