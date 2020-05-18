<template>
  <div class="tch">
    <div class="page-title page-title-tchr flex as-center">Online · Exam 在线考试系统</div>
    <div class="main">
      <div class="middle">
        <ul v-for="(course, index) in courses" :key="index" class="course">
          <li class="cour">
            <div class="name" @click.stop="toDetail(course.co_id)">
              <img src="../../assets/course.png" />
              {{ course.name }}
            </div>
            <div class="details">
              学分：{{ course.credit }}
              <br />
              学时：{{ course.school_hour }}
              <br />
            </div>
          </li>
        </ul>
        <ul class="course">
          <li class="cour">
            <div class="name" @click.stop="changeVisible()">+ 点击添加课程</div>
            <el-alert title="点击此处选择您要添加的课程" type="info" :closable="false" show-icon></el-alert>
          </li>
        </ul>
      </div>
      <div class="right">
        <img v-if="male" src="../../assets/head_tch_male.png" />
        <img v-if="!male" src="../../assets/head_tch_female.png" />
        <div class="hello">
          {{ name }}老师
          <br />
          <br />现在是
          <br />
          {{ this.nowTime}}
          <br />
          <br />
          {{ greeting }}
          <br />
        </div>
      </div>
    </div>
    <el-dialog title="添加课程" :visible.sync="dialogFormVisible">
      <div class="form_row">
        <span>请选择添加课程：</span>
        <el-select v-model="newCoures">
          <el-option
            v-for="item in courseList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <div v-if="newCoures.length>0">
        <div class="form_row">该课程信息:</div>
        <div class="form_row">名称：{{ this.coName }}</div>
        <div class="form_row">课程id：{{ this.coId }}</div>
        <div class="form_row">专业：{{ this.coMayjor }}</div>
        <div class="form_row">学分：{{ this.coCredit }}</div>
        <div class="form_row">学时：{{ this.coHour }}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCoures()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'indexStu',

  computed: {
    ...mapState(['uid']),
  },
  mounted() {
    // 刷新时间
    this.timer = setInterval(() => {
      this.nowTime = this.changeTime();
    }, 1000);
  },

  data() {
    return {
      nowTime: new Date().toLocaleString('chinese', { hour12: false }),
      name: '川师',
      male: true,
      greeting: '',
      courses: '',
      dialogFormVisible: false,
      courseList: [],
      newCoures: '',
      coName: '',
      coId: '',
      coMayjor: [],
      coHour: '',
      coCredit: '',
      timer: '',
    };
  },
  watch: {
    newCoures(val) {
      if (val.length > 0) {
        this.courseList.forEach(element => {
          if (element.name === val) {
            this.coName = element.name;
            this.coId = element.coId;
            this.coMayjor = element.mayjor;
            this.coHour = element.hour;
            this.coCredit = element.credit;
          }
        });
      }
    },
  },

  methods: {
    sessionJudge() {
      localStorage.setItem('Login', 'false');
      this.$message({
        message: '登录过期，请重新登录',
        type: 'error',
        offset: 70,
      });
      this.$router.push('/');
    },
    async changeVisible() {
      try {
        const res = await this.$axios.post(
          `${this.HOST}/course/getCourseNotTea`,
          {
            tea_id: this.uid,
          }
        );
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          this.dialogFormVisible = true;
          if (info.data.length > 0) {
            info.data.forEach(element => {
              this.courseList.push({
                name: element.name,
                coId: element.co_id,
                mayjor: element.mayjor,
                credit: element.credit,
                hour: element.school_hour,
              });
              // console.log(element.mayjor);
            });
          }
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
      } catch (err) {
        if (err === 401) {
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
    async addCoures() {
      try {
        const res = await this.$axios.post(`${this.HOST}/course/add`, {
          tea_id: this.uid,
          co_id: this.coId,
        });
        const info = res.data;
        // console.log(info);
        if (info.code === 200) {
          this.dialogFormVisible = false;
          this.Refresh();
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
      } catch (err) {
        if (err === 401) {
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
    async getTchNameAndSex() {
      try {
        const res = await this.$axios.get(
          `${this.HOST}/PersonalData/getTeacher`
        );
        const info = res.data;
        // console.log(info);
        if (info.code === 200) {
          const teaInfo = info.data;
          this.name = teaInfo.name;
          if (teaInfo.sex === 'female') this.male = false;
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
    async getCourseInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/homePage/tea/id`, {
          tea_id: this.uid,
        });
        const info = res.data;
        // console.log(info);
        if (info.code === 200) {
          const courseInfo = info.data;
          // console.log(courseInfo);
          this.courses = courseInfo;
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
    toDetail(coId) {
      this.$store.dispatch('set_coId', coId);
      window.location.href = '/TeaCourseDetail';
    },
    Refresh() {
      const NewPage = `${'_empty?time='}${new Date().getTime() / 500}`;
      this.$router.push(NewPage);
      this.$router.go(-1);
    },
    changeTime() {
      const date = new Date(); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = `${date.getFullYear()}/`;
      const M = `${
        date.getMonth() + 1 < 12
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }/`;
      const D = `${
        date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate()
      } `;
      const h = `${
        date.getHours() + 1 < 10 ? `0${date.getHours()}` : date.getHours()
      }:`;
      const m = `${
        date.getMinutes() + 1 < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      }:`;
      const s = `${
        date.getSeconds() + 1 < 10 ? `0${date.getSeconds()}` : date.getSeconds()
      }`;
      return Y + M + D + h + m + s;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },

  created() {
    const d = new Date();
    if (d.getHours() < 12) this.greeting = '上午好！';
    else if (d.getHours() >= 12 && d.getHours() < 18) {
      this.greeting = '下午好！';
    } else this.greeting = '晚上好！';
    console.log(new Date().toLocaleString());
    this.timer = setInterval(() => {
      this.nowTime = this.changeTime();
    }, 1000);
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
  background: url(../../assets/index_background_tch.gif);

  .form_row {
    text-align: left;
    font-weight: bold;
    margin-left: 50px;
    margin-bottom: 20px;
  }

  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: auto;
    width: 100%;
    background: url(../../assets/index_background_tch.gif);

    .right {
      // margin-left: 25px;
      height: 100%;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      font-size: 16px;
      margin-top: 15px;
      margin-right: 50px;
      width: 170px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      flex-shrink: 0;
      background-color: rgba(255, 251, 251, 0.87);

      img {
        width: 120px;
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
        width: 14%;
        height: auto;
        padding: 10px;
        background-color: #fff;
        border-radius: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
        min-width: max-content;

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
            cursor: pointer;
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
