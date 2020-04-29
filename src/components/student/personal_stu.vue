<template>
  <div class="hello">
    <h1 class="title">个人资料</h1>
    <div class="card">
      <div class="right_info">
        <div class="row">
          <span class="ti">学号:</span>
          <span>{{this.uid}}</span>
        </div>
        <div class="row">
          <span class="ti">班级:</span>
          <span>{{this.class}}</span>
        </div>
        <div class="row">
          <span class="ti">专业:</span>
          <span>{{this.major}}</span>
        </div>
        <div class="row">
          <label for="name" class="ti">姓名:</label>
          <label v-if="Seen">{{this.name}}</label>
          <input v-model="name" type="text" name="name" placeholder="请输入名字" v-if="!Seen" />
        </div>
        <div class="row">
          <label for="sex" class="ti">性别:</label>
          <label v-if="Seen">{{this.sex}}</label>
          <select id="sex" name="sex" v-model="sex" v-if="!Seen">
            <option>女</option>
            <option>男</option>
          </select>
        </div>
        <div class="row">
          <label for="qq" class="ti">Q Q:</label>
          <label v-if="Seen">{{this.qq}}</label>
          <input v-model="qq" type="text" name="qq" placeholder="请输入QQ号" v-if="!Seen" />
        </div>
        <div class="row">
          <label for="wx" class="ti">微信:</label>
          <label v-if="Seen">{{this.wx}}</label>
          <input v-model="wx" type="text" name="wx" placeholder="请输入微信" v-if="!Seen" />
        </div>
        <div class="row">
          <label for="phone" class="ti">电话:</label>
          <label v-if="Seen">{{this.phone}}</label>
          <input v-model="phone" type="text" name="phone" placeholder="请输入电话" v-if="!Seen" />
        </div>
        <div class="row">
          <label for="email" class="ti">邮箱:</label>
          <label>{{this.email}}</label>
          <el-button
            class="change"
            type="text"
            @click="submitcheck();dialogFormmail=true"
            v-if="!Seen"
          >更改邮箱</el-button>
          <el-dialog title="更改邮箱" :visible.sync="dialogFormmail" class="dialog">
            <div class="form">
              <div class="hi" v-if="isShowmail">
                <label>已向你的邮箱发送验证码</label>
                <input v-model="mailNumber" type="text" name="one" placeholder="请输入验证码" />
                <button @click="checkEmailCode()">验证</button>
              </div>
              <div class="hi" v-if="isShowmail">
                <span v-if="this.tipMessage.length>0" class="tip">{{ tipMessage }}</span>
              </div>
              <div class="hi" v-if="!isShowmail">
                <label for="newEmail">请输入新邮箱</label>
                <input v-model="newEmail" type="text" name="newEmail" />
                <button @click="submitNewcheck()" :disabled="isok" v-if="showbtn">验证码</button>
                <button v-else>{{ message }}</button>
              </div>
              <div class="hi" v-if="!isShowmail">
                <label>请输入新邮箱验证码</label>
                <input v-model="newNumber" type="text" name="emailCode" />
              </div>
              <div class="hi" v-if="!isShowmail">
                <label v-if="this.tipMessage.length>0" class="tip">{{ tipMessage }}</label>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="isShowmail=true;dialogFormmail = false;clearEmail()">取 消</el-button>
              <el-button type="primary" @click="updataEmail()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="row" v-if="!Seen">
          <label>密码:</label>
          <label v-if="!Seen">{{this.pwd}}</label>
          <el-button class="change" type="text" @click="submitcheck();dialogFormVisible=true">重置密码</el-button>
          <el-dialog title="重置密码" :visible.sync="dialogFormVisible" class="dialog">
            <div class="form">
              <div class="hi" v-if="isShowpwd">
                <label for="e">已向你的邮箱发送验证码</label>
                <input v-model="pwdNumber" type="text" name="e" placeholder="请输入验证码" />
                <button @click="checkPwdCode()">验证</button>
              </div>
              <div class="hi" v-if="isShowpwd">
                <span v-if="this.tipMessage.length>0" class="tip">{{ tipMessage }}</span>
              </div>
              <div class="hi" v-if="!isShowpwd">
                <label for="newPwd">请输入新密码</label>
                <input v-model="newPwd" type="password" name="new" />
              </div>
              <div class="hi" v-if="!isShowpwd">
                <label for="reNewPwd">请再次输入新密码</label>
                <input v-model="renewPwd" type="password" name="reNew" />
              </div>
              <div class="hi" v-if="!isShowpwd">
                <span v-if="this.tipMessage.length>0" class="tip">{{ tipMessage }}</span>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="isShowpwd=true;dialogFormVisible = false;clearPwd()">取 消</el-button>
              <el-button type="primary" @click="upataPwd()
                    ">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="submit">
      <button @click="changeCard()" v-if="Seen">编辑</button>
      <button @click="editStudent();" v-if="!Seen">保存</button>
      <a href="personalStu" v-if="!Seen">取消</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalStu',
  mounted() {
    if (document.getElementById('nav')) {
      const p = document.getElementById('app');
      const c = document.getElementById('nav');
      p.removeChild(c);
    }
  },
  data() {
    return {
      Seen: true, // changcard
      isShowpwd: true, // pwdchange
      isShowmail: true, // emailchange
      uid: '',
      institute: '',
      class: '',
      sex: '',
      name: '',
      degree: '',
      major: '',
      phone: '',
      email: '',
      qq: '',
      wx: '',
      pwd: '',
      newEmail: '',
      newPwd: '',
      renewPwd: '',
      mailNumber: '', // 更改邮箱验证码
      pwdNumber: '', // 更改密码验证码
      newNumber: '', // 新邮箱验证码
      tipMessage: '',

      message: '验证码',
      isok: false,
      showbtn: true,
      sec: 60,

      dialogFormVisible: false,
      dialogFormmail: false,
    };
  },
  created() {
    this.submitupdata();
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
    async submitupdata() {
      // 获取登录学生的个人信息
      try {
        const res = await this.$axios.get(
          `${this.HOST}/PersonalData/getStudent`,
          {}
        );
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          const infodata = info.data;
          this.uid = infodata.stu_id;
          this.institute = infodata.institute_id;
          this.class = infodata.class_id;
          this.major = infodata.major_id;
          this.name = infodata.name;
          this.pwd = infodata.password;
          this.qq = infodata.qq;
          this.wx = infodata.weixin;
          this.email = infodata.email;
          this.phone = infodata.telephone;
          if (infodata.sex === 'female') {
            this.sex = '女';
          } else {
            this.sex = '男';
          }
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

    async editStudent() {
      // 修改基本信息
      try {
        let sex = '';
        if (this.sex === '女') {
          sex = 'female';
        } else {
          sex = 'male';
        }
        const res = await this.$axios.post(
          `${this.HOST}/PersonalData/editStudentBaseData`,
          {
            telephone: this.phone,
            name: this.name,
            sex,
            qq: this.qq,
            weixin: this.wx,
          }
        );
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
            offset: 70,
          });
          const infodata = info.data;
          this.name = infodata.name;
          this.qq = infodata.qq;
          this.wx = infodata.weixin;
          this.phone = infodata.telephone;
          if (infodata.sex === 'female') {
            this.sex = '女';
          } else {
            this.sex = '男';
          }
          this.Seen = true;
        } else {
          this.$message({
            message: info.data,
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

    async checkPwdCode() {
      // 验证邮箱是否经过验证(密码)
      try {
        const res = await this.$axios.post(
          `${this.HOST}/PersonalData/checkCode`,
          {
            email: this.email,
            code: this.pwdNumber,
          }
        );
        const info = res.data;
        // console.log(info);
        if (info.code === 200) {
          // console.log('操作成功');
          this.$message({
            message: '操作成功',
            type: 'success',
            offset: 70,
          });
          this.isShowpwd = false;
          this.tipMessage = '';
        } else {
          this.tipMessage = '邮箱验证失败';
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

    async checkEmailCode() {
      // 验证邮箱是否经过验证(邮箱)
      try {
        const res = await this.$axios.post(
          `${this.HOST}/PersonalData/checkCode`,
          {
            email: this.email,
            code: this.mailNumber,
          }
        );
        const info = res.data;
        if (info.code === 200) {
          // console.log('操作成功');
          this.$message({
            message: '操作成功',
            type: 'success',
            offset: 70,
          });
          this.isShowmail = false;
          this.tipMessage = '';
        } else {
          this.tipMessage = '邮箱验证失败';
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

    async updataEmail() {
      // 更新邮箱
      try {
        const res = await this.$axios.post(
          `${this.HOST}/PersonalData/updateStudentNewEmail`,
          {
            code: this.newNumber,
            newEmail: this.newEmail,
          }
        );
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
            offset: 70,
          });
          this.email = this.newEmail;
          this.dialogFormmail = false;
          this.isShowmail = true;
          this.tipMessage = '';
        } else {
          this.tipMessage = '操作失败';
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

    async upataPwd() {
      // 更新密码
      try {
        const res = await this.$axios.post(
          `${this.HOST}/PersonalData/updateStudentPassword`,
          {
            newPassword: this.newPwd,
          }
        );
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
            offset: 70,
          });
          this.dialogFormVisible = false;
          this.isShowpwd = true;
          this.tipMessage = '';
        } else {
          this.tipMessage = '操作失败';
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

    changeCard() {
      if (this.Seen) {
        this.Seen = false;
      } else {
        this.Seen = true;
      }
    },

    clearEmail() {
      this.tipMessage = '';
      this.mailNumber = '';
      this.newNumber = '';
      this.newEmail = '';
    },

    clearPwd() {
      this.tipMessage = '';
      this.pwdNumber = '';
      this.newPwd = '';
      this.renewPwd = '';
    },

    async submitcheck() {
      // 发送旧邮箱验证码
      try {
        if (this.email.search('@sicnu.edu.cn') === -1) {
          const res = await this.$axios.post(
            `${this.HOST}/PersonalData/checkStudentEmail `,
            {
              email: this.email,
            }
          );
          const info = res.data;
          if (info.code === 200) {
            this.$message({
              message: '发送成功',
              type: 'success',
              offset: 70,
            });
          } else {
            this.$message({
              message: info.data,
              type: 'error',
              offset: 70,
            });
          }
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
    async submitNewcheck() {
      // 发送新邮箱验证码
      try {
        if (this.email.search('@sicnu.edu.cn') === -1) {
          const res = await this.$axios.post(
            `${this.HOST}/PersonalData/checkStudentEmail `,
            {
              email: this.newEmail,
            }
          );
          const info = res.data;
          if (info.code === 200) {
            this.$message({
              message: '发送成功',
              type: 'success',
              offset: 70,
            });
            const timer = setInterval(() => {
              this.sec = this.sec - 1;
              this.code = `${this.sec}S`;
              this.showbtn = false;
              if (this.sec === 0) {
                clearInterval(timer);
                this.sec = 60;
                this.code = `${this.sec}S`;
                this.showbtn = true;
              }
            }, 1000);
            this.tipMessage = '';
          } else {
            this.tipMessage = '出现错误，发送失败！';
          }
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
.hello {
  width: 100%;
  height: 100%;
  background: url(../../assets/personal_background_stu.gif);

  h1 {
    font-size: 26px;
    color: #3d3d3d;
    height: 90px;
    line-height: 150px;
    text-align: center;
    margin: 5px 10%;
  }

  .submit {
    button {
      margin-top: 20px;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 20px;
      padding: 5px 10px;
      width: 80px;
      font-size: 15px;
      background-color: #5379a5c4;
      cursor: pointer;
      outline: none;
      transition: all 0.3s ease;
    }
    button:hover {
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
  }

  a {
    text-decoration: none;
    font-size: 14px;
    margin: 0 15px;
    color: dimgray;
  }

  .card {
    width: 40vw;
    margin: 5px auto;
    padding: 10px 20px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    display: flex;
    justify-content: center;
    margin-top: 25px;
    background-color: rgba(255, 251, 251, 0.87);

    .right_info {
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .line {
        height: 1px;
        background: #302c2c;
        margin: 10px 0;
      }

      .row {
        height: 25px;
        line-height: 20px;
        overflow: hidden;
        display: flex;
        margin: 10px 5px;
        justify-content: flex-start;

        .ti {
          font-weight: bold;
        }
        span {
          font-size: 16px;
          color: #999;
          margin-top: 3px;
          padding-right: 10px;
        }

        label {
          font-size: 16px;
          color: #4d4d4d;
          padding-right: 10px;
        }

        .dialog {
          .form {
            display: flex;
            flex-wrap: wrap;

            .hi {
              display: flex;
              margin: 10px 0px;
              width: 100%;

              label {
                font-size: 16px;
                color: #4d4d4d;
                margin-top: 5px;
                text-align: left;
                width: 150px;
              }
              button {
                padding: 5px 10px;
                background: #909399;
                color: white;
                border-radius: 4px;
                margin: 0 10px;
                border: none;
                cursor: pointer;
              }
            }
            .tip {
              width: 100%;
              display: flex;
              justify-content: center;
              color: #b14149;
            }
          }
        }
        .change {
          font-size: 10px;
          padding: 1px 1px;
          border-radius: 4px;
          background: #8dafd2;
          color: #3d3d3d;
          margin: 0 5px;
        }
      }
      input[name='name'],
      input[name='qq'],
      input[name='sex'],
      input[name='wx'],
      input[name='phone'],
      input[name='mail'] {
        width: 55%;
        margin: 0px 0;
        border: 1px solid #ccc;
        line-height: 25px;
        outline: none;
        transition: all 0.5s ease;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 1px 2px;
      }
      input[name='name'],
      input[name='qq'],
      input[name='sex'],
      input[name='wx'],
      input[name='phone'],
      input[name='mail'] {
        font-size: 16px;
        float: left;
      }
      input[name='sex'],
      select {
        width: 55%;
        margin: 0px 0;
        border: 1px solid #ccc;
        line-height: 25px;
        outline: none;
        transition: all 0.5s ease;
        box-sizing: border-box;
        border-radius: 4px;
      }
      input[name='one'],
      input[name='newEmail'],
      input[name='e'],
      input[name='new'],
      input[name='reNew'] {
        width: 300px;
        margin: 0px 0;
        border: 1px solid #ccc;
        line-height: 30px;
        outline: none;
        transition: all 0.5s ease;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 1px 2px;
      }
      input[name='emailCode'] {
        width: 150px;
        margin: 0px 0;
        border: 1px solid #ccc;
        line-height: 30px;
        outline: none;
        transition: all 0.5s ease;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 1px 2px;
      }
    }
  }
}
</style>
