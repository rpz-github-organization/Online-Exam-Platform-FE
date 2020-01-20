<template>
  <div class="hello">
    <div class="card login-container">
      <div class="title">注册 · Register</div>
      <div class="form">
          <div class="row">
            <label for="uid">学号/工号</label>
            <input v-model="uid" type="text" name="uid" placeholder="请输入你的学号或工号" />
          </div>
          <div class="row">
            <label for="uid">姓名</label>
            <input v-model="name" type="text" name="name" placeholder="请输入你的姓名" />
          </div>
          <div class="row">
            <label for="phone">电话</label>
            <input v-model="phone" type="text" name="phone" placeholder="请输入你的电话">
          </div>
          <div class="row">
            <label for="password">密码</label>
            <input v-model="password" type="password" name="password" placeholder="请输入密码" />
          </div>
          <div class="row">
            <label for="password_1">确认密码</label>
            <input v-model="password_1" type="password" name="password_1" placeholder="再次输入密码...">
          </div>
          <div class="row">
            <label for="email">邮箱</label>
            <input v-model="email" type="text" name="email" placeholder="请输入你的邮箱">
            <button @click="submitcheck" class="clicka">点击验证</button>
          </div>
          <div class="row">
            <label>验证码</label>
            <input v-model="checkemail" type="text" name="checkemail" placeholder="请输入邮箱验证码">
          </div>
        <br>
        <div v-show="this.tipMessage.length > 0" class="row">
          <p class="tip">{{ this.tipMessage }}</p>
        </div>
        <div class="row">
          <button @click="submitregister" class="submit">注册</button>
          <a href="/">返回登录</a>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      uid: '',
      name: '',
      password: '',
      email: '',
      phone: '',
      password_1: '',
      checkemail: '',
      identity: 0,

      tipMessage: '',
    };
  },
  methods: {
    validate() { // 表单验证
      let res = true;
      if (this.uid.length === 0) {
        this.tipMessage = '还没有填写 学号/工号！';
        console.log(this.tipMessage);
        res = false;
      } else if (this.uid.length !== 10) {
        this.tipMessage = '学号/工号 格式错误！';
        res = false;
      } else if (this.name.length === 0) {
        this.tipMessage = '还没有填写 姓名';
        res = false;
      } else if (this.email.length === 0) {
        this.tipMessage = '还没有填写 邮箱！';
        res = false;
      } else if (this.phone.length === 0) {
        this.tipMessage = '没有填写 电话！';
        res = false;
      } else if (this.phone.length !== 11) {
        this.tipMessage = '电话格式错误！';
        res = false;
      } else if (this.password.length === 0) {
        this.tipMessage = '还没有填写 密码！';
        res = false;
      } else if (this.password.length < 8) {
        this.tipMessage = '密码长度不得小于8位';
        res = false;
      } else if (this.password_1.length === 0) {
        this.tipMessage = '没有填写 确认密码！';
        res = false;
      } else if (this.checkemail.length === 0) {
        this.tipMessage = '没有填写 验证码！';
        res = false;
      } else if (this.password !== this.password_1) {
        this.tipMessage = '两次密码输入不一致！';
        res = false;
      }
      console.log(this.tipMessage);
      return res;
    },
    async submitcheck() {
      try {
        if (this.email.search('@sicnu.edu.cn') === -1) { // 学生注册
          const res = await this.$axios.post('/email/student', {
            name: this.name,
          });
          const info = JSON.stringify(res);
          const infoObject = JSON.parse(info);
          if (infoObject.code === '400') {
            console.log('发送成功');
          } else {
            console.log('出现错误，发送失败！');
          }
          console.log(infoObject);
        } else { // 老师注册
          const res = await this.$axios.post('/email/teacher', {
            email: this.email,
          });
          const info = JSON.stringify(res);
          const infoObject = JSON.parse(info);
          if (infoObject.code === '400') {
            console.log('发送成功');
          } else {
            console.log('出现错误，发送失败！');
          }
          console.log(infoObject);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async submitregister() {
      if (this.validate()) {
        try {
          if (this.email.search('@sicnu.edu.cn') === -1) { // 学生注册
            const res = await this.$axios.post('/register/student', {
              uid: this.uid,
              name: this.name,
              email: this.email,
              phone: this.phone,
              password: this.password,
            });
            const info = JSON.stringify(res);
            const infoObject = JSON.parse(info);
            if (infoObject.code === '400') {
              console.log('注册成功');
            } else {
              console.log('出现错误，注册失败！');
            }
          } else { // 老师注册
            const res = await this.$axios.post('/register/teacher', {
              uid: this.uid,
              name: this.name,
              email: this.email,
              phone: this.phone,
              password: this.password,
            });
            const info = JSON.stringify(res);
            const infoObject = JSON.parse(info);
            if (infoObject.code === '400') {
              console.log('注册成功');
            } else {
              console.log('出现错误，注册失败！');
            }
            console.log(infoObject);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  .card {
    width: 45vw;
    margin: 5px auto;
    padding: 10px 0;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);

    .title {
      margin: 5px 0;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }

    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .row {
        width: 80%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        label {
          width: 100px;
          text-align: left;
          font-weight: bold;
        }

        .clicka{
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 20px;
          width: 100px;
          font-size: 15px;
          background-color: #5379a5c4;
          cursor: pointer;
          outline: none;
          transition: all 0.3s ease;
        }

        .clicka:hover{
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
        }

        input[name='uid'],
        input[name='name'],
        input[name='password'],
        input[name='uid']:focus,
        input[name='password_1'],
        input[name='phone'],
        input[name='checkemail'],
        input[name='password']:focus {
          border: none;
          outline: none;
          width: 55%;
          line-height: 25px;
          margin: 15px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.27);
          transition: all 0.5s ease;
        }
        input[name='email']{
          border: none;
          outline: none;
          width: 37%;
          line-height: 25px;
          margin: 15px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.27);
          transition: all 0.5s ease;
        }

        input[name='uid']:focus,
        input[name='name']:focus,
        input[name='password']:focus,
        input[name='uid']:hover,
        input[name='email']:hover,
        input[name='password_1']:hover,
        input[name='phone']:hover,
        input[name='checkemail']:hover,
        input[name='password']:hover {
          font-size: 16px;
        }

        button {
          margin: 0;
          width: 80px;
        }

        a, a:hover, a:focus, a:visited, a:link {
          text-decoration: none;
          font-size: 14px;
          margin: 0 15px;
          color: dimgray;
        }
      }

      .submit {
        margin-top: 20px;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 20px;
        padding: 5px 10px;
        width: 100px;
        font-size: 15px;
        background-color: #5379a5c4;
        cursor: pointer;
        outline: none;
        transition: all 0.3s ease;
      }
      .submit:hover {
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);
      }
    }
    .tip{
      color: brown;
      text-align: center;
      margin-top: -2%;
    }
  }
}
</style>
