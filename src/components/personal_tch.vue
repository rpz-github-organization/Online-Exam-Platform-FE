<template>
    <div class="hello">
      <h1 class="title">个人资料</h1><hr>
        <div class="card">
          <div class="right_info">
            <div class="row">
              <span>编号:</span>
              <span>{{this.uid}}</span>
            </div>
            <div class="row">
              <span>学院:</span>
              <span>{{this.institute}}</span>
            </div>
            <div class="line"></div>
            <div class="row">
              <label for="name">姓名:</label>
              <label v-if="Seen">{{this.name}}</label>
              <input v-model="name" type="text" name="name" placeholder="请输入名字" v-if="!Seen"/>
            </div>
            <div class="row">
              <label for="sex" >性别:</label>
              <label v-if="Seen">{{this.sex}}</label>
              <select id="sex" name="sex" v-model="sex" v-if="!Seen">
                <option >女</option>
                <option >男</option>
              </select>
            </div>
            <div class="row">
              <label for="qq">Q  Q:</label>
              <label v-if="Seen">{{this.qq}}</label>
              <input v-model="qq" type="text" name="qq" placeholder="请输入QQ号" v-if="!Seen"/>
            </div>
            <div class="row">
              <label for="wx">微信:</label>
              <label v-if="Seen">{{this.wx}}</label>
              <input v-model="wx" type="text" name="wx" placeholder="请输入微信" v-if="!Seen"/>
            </div>
            <div class="row">
              <label for="phone">电话:</label>
              <label v-if="Seen">{{this.phone}}</label>
              <input v-model="phone" type="text" name="phone" placeholder="请输入电话" v-if="!Seen"/>
            </div>
            <div class="line"></div>
            <div class="row">
              <label for="email">邮箱:</label>
              <label>{{this.email}}</label>
              <el-button class="change"
                type="text"
                @click="submitcheck();dialogFormmail=true"
                v-if="!Seen">
                更改邮箱</el-button>
              <el-dialog title="更改邮箱" :visible.sync="dialogFormmail" class="dialog">
                <div class="form">
                  <div class="hi" v-if="isShowmail">
                    <label>已向你的邮箱发送验证码</label>
                    <input v-model="mailNumber" type="text" name="one" placeholder="请输入验证码">
                    <button @click="checkEmailCode()">验证</button>
                  </div>
                  <div class="hi" v-if="isShowmail">
                    <span v-if="this.tipMessage.length>0" class="tip">{{ tipMessage }}</span>
                  </div>
                  <div class="hi" v-if="!isShowmail">
                    <label for="newEmail">请输入新邮箱</label>
                    <input v-model="newEmail" type="text" name="newEmail">
                    <button  @click="submitNewcheck()" :disabled="isok" v-if="showbtn">验证码</button>
                    <button v-else>{{ message }}</button>
                  </div>
                  <div class="hi" v-if="!isShowmail">
                    <label>请输入新邮箱验证码</label>
                    <input v-model="newNumber" type="text" name="emailCode">
                  </div>
                  <div class="hi" v-if="!isShowmail">
                    <label v-if="this.tipMessage.length>0" class="tip">{{ tipMessage }}</label>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="isShowmail=true;dialogFormmail = false;clearEmail()">
                    取 消</el-button>
                  <el-button type="primary" @click="updataEmail()">
                    确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="row" v-if="!Seen">
              <label >密码:</label>
              <label v-if="!Seen">{{this.pwd}}</label>
              <el-button class="change" type="text" @click="submitcheck();dialogFormVisible=true">
                重置密码</el-button>
              <el-dialog title="重置密码" :visible.sync="dialogFormVisible" class="dialog">
                <div class="form">
                  <div class="hi" v-if="isShowpwd">
                    <label for="e">已向你的邮箱发送验证码</label>
                    <input v-model="pwdNumber" type="text" name="e" placeholder="请输入验证码">
                    <button @click="checkPwdCode()">验证</button>
                  </div>
                  <div class="hi" v-if="isShowpwd">
                    <span v-if="this.tipMessage.length>0" class="tip">{{ tipMessage }}</span>
                  </div>
                  <div class="hi" v-if="!isShowpwd">
                    <label for="newPwd">请输入新密码</label>
                    <input v-model="newPwd" type="password" name="new">
                  </div>
                  <div class="hi" v-if="!isShowpwd">
                    <label for="reNewPwd">请再次输入新密码</label>
                    <input v-model="renewPwd" type="password" name="reNew">
                  </div>
                  <div class="hi" v-if="!isShowpwd">
                    <span v-if="this.tipMessage.length>0" class="tip">{{ tipMessage }}</span>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="isShowpwd=true;dialogFormVisible = false;clearPwd()">
                    取 消</el-button>
                  <el-button type="primary" @click="upataPwd()
                    ">
                    确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
        <div class="submit">
          <button @click="changeCard()" v-if="Seen">编辑</button>
          <button @click="editStudent();" v-if="!Seen">保存</button>
          <a href="personalTch" v-if="!Seen">取消</a>
        </div>
    </div>
</template>

<script>

export default {
  name: 'PersonalTch',
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
      sex: '',
      name: '',
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
    async submitupdata() { // 获取登录教师的个人信息
      try {
        const res = await this.$axios.get(`${this.HOST}/PersonalData/getTeacher`, {
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('操作成功');
          const infodata = info.data;
          this.uid = infodata.tea_uid;
          this.institute = infodata.institute_id;
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
          console.log('操作失败');
        }
      } catch (err) {
        console.log(err);
      }
    },

    async editStudent() { // 修改基本信息
      try {
        let sex = '';
        if (this.sex === '女') {
          sex = 'female';
        } else {
          sex = 'male';
        }
        const res = await this.$axios.post(`${this.HOST}/PersonalData/editTeacherBaseData`, {
          telephone: this.phone,
          name: this.name,
          sex,
          qq: this.qq,
          weixin: this.wx,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('操作成功');
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
          console.log('操作失败');
        }
      } catch (err) {
        console.log(err);
      }
    },

    async checkPwdCode() { // 验证邮箱是否经过验证(密码)
      try {
        const res = await this.$axios.post(`${this.HOST}/PersonalData/checkCode`, {
          email: this.email,
          code: this.pwdNumber,
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          console.log('操作成功');
          this.isShowpwd = false;
          this.tipMessage = '';
        } else {
          this.tipMessage = '邮箱验证失败';
        }
      } catch (err) {
        console.log(err);
      }
    },

    async checkEmailCode() { // 验证邮箱是否经过验证(邮箱)
      try {
        const res = await this.$axios.post(`${this.HOST}/PersonalData/checkCode`, {
          email: this.email,
          code: this.mailNumber,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('操作成功');
          this.isShowmail = false;
          this.tipMessage = '';
        } else {
          this.tipMessage = '邮箱验证失败';
        }
      } catch (err) {
        console.log(err);
      }
    },

    async updataEmail() { // 更新邮箱
      try {
        const res = await this.$axios.post(`${this.HOST}/PersonalData/updateTeacherNewEmail`, {
          code: this.newNumber,
          newEmail: this.newEmail,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('操作成功');
          this.email = this.newEmail;
          this.dialogFormmail = false;
          this.isShowmail = true;
          this.tipMessage = '';
        } else {
          this.tipMessage = '操作失败';
        }
      } catch (err) {
        console.log(err);
      }
    },

    async upataPwd() { // 更新密码
      try {
        const res = await this.$axios.post(`${this.HOST}/PersonalData/updateTeacherPassword`, {
          newPassword: this.newPwd,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('操作成功');
          this.dialogFormVisible = false;
          this.isShowpwd = true;
          this.tipMessage = '';
        } else {
          this.tipMessage = '操作失败';
        }
      } catch (err) {
        console.log(err);
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

    async submitcheck() { // 发送旧邮箱验证码
      try {
        const res = await this.$axios.post(`${this.HOST}/PersonalData/checkTeacherEmail `, {
          email: this.email,
        });
        const info = res.data;
        if (info.code === 200) {
          console.log('发送成功');
        } else {
          console.log('出现错误，发送失败！');
        }
      } catch (err) {
        console.log(err);
      }
    },
    async submitNewcheck() { // 发送新邮箱验证码
      try {
        if (this.email.search('@sicnu.edu.cn') === -1) {
          const res = await this.$axios.post(`${this.HOST}/PersonalData/checkTeacherEmail`, {
            email: this.newEmail,
          });
          const info = res.data;
          if (info.code === 200) {
            console.log('发送成功');
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
        console.log(err);
      }
    },
  },
};
</script>


<style lang="less" scoped>
.hello{
  padding-bottom: 200px;
  background: url(../assets/personal_background_tch.gif);

  h1{
  font-size: 20px;
  color: #3d3d3d;
  height: 90px;
  line-height: 150px;
  text-align:left;
  margin: 5px 10%;
  }

  .submit{
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
    button:hover{
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
  }

  a{
    text-decoration: none;
    font-size: 14px;
    margin: 0 15px;
    color: dimgray;
  }

  .card{
    width: 40vw;
    margin: 5px auto;
    padding: 10px 20px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    display: flex;
    justify-content:center;
    margin-top: 25px;
    background-color: rgba(255, 251, 251, 0.87);

    .right_info{
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
        .line{
          height: 1px;
          background: #302c2c;
          margin-bottom:5px;
          margin-top: 5px;
        }

        .row{
          height: 25px;
          line-height: 20px;
          overflow:hidden;
          display: flex;
          margin: 3px 5px;
          justify-content: flex-start;

          span{
            font-size: 16px;
            color: #999;
            margin-top: 3px;
            padding-right: 10px;
          }

          label{
            font-size: 16px;
            color: #4d4d4d;
            padding-right: 10px;
          }

          .dialog{
            .form{
              display: flex;
              flex-wrap:wrap;

              .hi{
                display: flex;
                margin: 10px 0px;
                width: 100%;

                label{
                  font-size: 16px;
                  color: #4d4d4d;
                  margin-top: 5px;
                  text-align: left;
                  width: 150px;
                }
                button{
                  padding: 5px 10px;
                  background:#909399;
                  color:white;
                  border-radius: 4px;
                  margin: 0 10px;
                  border: none;
                  cursor: pointer;
                }
              }
              .tip{
                width: 100%;
                display: flex;
                justify-content: center;
                color: #B14149;
              }
            }
          }
          .change{
            font-size: 10px;
            padding: 1px 1px;
            border-radius: 4px;
            background:#8DAFD2;
            color: #3d3d3d;
            margin: 0 5px;
          }
        }
        input[name='name'],
        input[name='qq'],
        input[name='sex'],
        input[name='wx'],
        input[name='phone'],
        input[name='mail']{
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
        input[name='mail']{
          font-size: 16px;
          float: left;
        }
        input[name='sex'],select{
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
        input[name='reNew']{
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
        input[name='emailCode']{
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
