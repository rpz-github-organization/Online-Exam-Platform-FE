exports.install = function (Vue) {
    Vue.prototype.sessionJudge = function (){
        localStorage.setItem('Login', 'false');
        this.$message({
            message: '登录过期，请重新登录',
            type: 'error',
            offset: 70,
        });
        this.$router.push('/');
    }
    Vue.prototype.interval = function(){
        const timer = setInterval(() => { // 发送验证码后等待60秒的循环执行更改秒数
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
    Vue.prototype.changeTime = function(){
        const date = new Date(); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = `${date.getFullYear()}/`;
        const M = `${
          date.getMonth() + 1 < 10
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
    }
 };