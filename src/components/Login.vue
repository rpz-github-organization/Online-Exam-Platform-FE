<template>
  <div class="hello">
    <h4>{{ new Date().toLocaleString() }} - 欢迎来到 "教你写登录注册" 教程</h4>
    <div class="card login-container">
      <div class="title">登录 · Login</div>
      <div class="form">
        <div class="row">
          <label for="uid">学号/工号</label>
          <input type="text" name="uid" placeholder="请输入你的学号或工号" />
        </div>
        <div class="row">
          <label for="password">密码</label>
          <input type="password" name="password" placeholder="请输入密码" />
        </div>

        <button class="submit">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  .card {
    width: 60vw;
    margin: 0 auto;
    padding: 20px 0;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.20);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);

    .title {
      margin: 20px 0;
      font-size: 20px;
      font-weight: bold;
    }

    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .row {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        label {
          width: 100px;
          text-align: left;
          font-weight: bold;
        }

        input[name='uid'],
        input[name='password'],
        input[name='uid']:focus,
        input[name='password']:focus {
          border: none;
          outline: none;
          width: 35%;
          line-height: 25px;
          margin: 15px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.27);
          transition: all 0.5s ease;
        }

        input[name='uid']:focus,
        input[name='password']:focus {
          font-size: 16px;
        }
      }

      .submit {
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
