<template>
  <div class="hello">
    <h4>{{ new Date().toLocaleString() }} - 欢迎来到 "教你写登录注册" 教程</h4>
    <div class="card login-container">
      <div class="title">登录 · Login</div>
      <div class="form">
        <div class="row">
          <label for="uid">学号/工号</label>
          <input v-model="uid" type="text" name="uid" placeholder="请输入你的学号或工号" />
        </div>
        <div class="row">
          <label for="password">密码</label>
          <input v-model="password" type="password" name="password" placeholder="请输入密码" />
        </div>
        <br />
        <div v-show="tipMessage.length > 0" class="row">
          <p class="tip">{{ tipMessage }}</p>
        </div>
        <div class="row">
          <button @click="submitLogin" class="submit">登录</button>
          <a href="/">忘记密码</a>
          <a href="/register">立即注册</a>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      uid: '1234567891',
      password: '',
      tipMessage: '',
    };
  },
  methods: {
    validate() {
      let res = true;
      if (this.uid.length === 0) {
        this.tipMessage = '还没有填写 学号/工号！';
        res = false;
      } else if (this.password.length === 0) {
        this.tipMessage = '还没有填写 密码！';
        res = false;
      }
      this.tipMessage = '';
      return res;
    },
    // async submitLogin() {
    //   if (this.validate()) {
    //     try {
    //       const res = await this.$axios.post('http://localhost:8080/login', {
    //         uid: this.uid,
    //         password: this.password,
    //       });
    //       console.log(res);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // },
    submitLogin() {
      this.$store.dispatch('set_uid', this.uid);
      window.location.href = '/index_stu';
      // window.location.href = '/index_tch';
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
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);

    .title {
      margin: 5px 0;
      font-size: 20px;
      font-weight: bold;
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

        input[name="uid"],
        input[name="password"],
        input[name="uid"]:focus,
        input[name="password"]:focus {
          border: none;
          outline: none;
          width: 55%;
          line-height: 25px;
          margin: 15px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.27);
          transition: all 0.5s ease;
        }

        input[name="uid"]:focus,
        input[name="password"]:focus,
        input[name="uid"]:hover,
        input[name="password"]:hover {
          font-size: 16px;
        }

        button {
          margin: 0;
          width: 80px;
        }

        a,
        a:hover,
        a:focus,
        a:visited,
        a:link {
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
  }
}
</style>
