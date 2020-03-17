<template>
    <div id="setPassword">
        <el-card class="card">
            <span class="title">密码找回</span>
            <div class="row" v-if="!this.isCheck">
                <span class="la">请输入绑定邮箱</span>
                <el-input size="medium" v-model="email"></el-input>
            </div>
            <div class="row" v-if="!this.isCheck">
                <span class="la">邮箱验证码</span>
                <el-input size="medium" v-model="checkCode"></el-input>
                <button
                @click="submitcheck()"
                :disabled="isok"
                class="submit"
                v-if="showbtn">
                    点击验证
                </button>
                <button class="submit" v-else>{{ code }}</button>
            </div>
            <div class="row" v-if="this.isCheck">
                <span class="la">输入新密码</span>
                <el-input size="medium" v-model="pwd" show-password></el-input>
            </div>
            <div class="row" v-if="this.isCheck">
                <span class="la">再次输入</span>
                <el-input size="medium" v-model="pwdR" show-password></el-input>
            </div>
            <div class="button_row">
                <el-button @click="submitCode()" v-if="!this.isCheck">提交</el-button>
                <el-button v-else @click="submitPwd()">提交a</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'setPassword',
  data() {
    return {
      code: '再次验证',
      showbtn: true,
      isok: false,
      sec: 60,
      isCheck: false,
      tip: '',
      checkCode: '',
      pwd: '',
      pwdR: '',
      email: '',
    };
  },
  methods: {
    async submitcheck() {
      try {
        const res = await this.$axios.post(`${this.HOST}/lostPassword/sendEmail`, {
          email: this.email,
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            message: '发送成功',
            type: 'success',
            offset: 70,
          });
          this.isok = true;
          const timer = setInterval(() => {
            this.sec = this.sec - 1;
            this.code = `${this.sec}S`;
            this.showbtn = false;
            if (this.sec === 0) {
              clearInterval(timer);
              this.sec = 60;
              this.code = `${this.sec}S`;
              this.showbtn = true;
              this.isok = false;
            }
          }, 1000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async submitCode() {
      try {
        const res = await this.$axios.post(`${this.HOST}/lostPassword/checkCode`, {
          email: this.email,
          code: this.checkCode,
        });
        const info = res.data;
        if (info.code === 200) {
          this.$message({
            message: '发送成功',
            type: 'success',
            offset: 70,
          });
          this.isCheck = true;
        } else {
          this.$message({
            message: info.message,
            type: 'error',
            offset: 70,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async submitPwd() {
      try {
        if (this.pwd === this.pwdR) {
          if (this.pwd.length >= 8) {
            const res = await this.$axios.post(`${this.HOST}/lostPassword/resetPassword`, {
              email: this.email,
              password: this.pwd,
            });
            const info = res.data;
            // console.log(info);
            if (info.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success',
                offset: 70,
              });
              this.$router.push('/');
            } else {
              this.$message({
                message: info.message,
                type: 'error',
                offset: 70,
              });
            }
          } else {
            this.$message({
              message: '密码长度不得小于8位，请重新输入！',
              type: 'error',
              offset: 70,
            });
          }
        } else {
          this.$message({
            message: '两次密码输入不一致，请重新输入！',
            type: 'error',
            offset: 70,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#setPassword{
    display: flex;
    justify-content: center;
    .card{
        display: flex;
        flex-direction: column;
        margin-top: 50px;
        width: 50%;

        span.title{
            font-weight: bold;
            font-size: larger;
        }
        .row{
            display: flex;
            flex-direction: row;
            text-align: left;
            margin: 20px 5px;
            .la{
                margin: 10px;
                width: 150px;
            }
        }
        .button_row{
            display: flex;
            justify-content: center;
        }
    }
    .submit {
        margin-left: 20px;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        width: 150px;
        height: 37px;
        font-size: 15px;
        background-color: #9BADC1;
        cursor: pointer;
        outline: none;
    }
    .submit:hover {
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
    }
        }
</style>
