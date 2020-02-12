<template>
  <div>
    <ul v-for="(exam,index) in exams" :key="'a'+index" id="all" class="middle">
      <li id="exam">
        <div class="one">
          <div class="name">
            <img src="../assets/exam.png" alt="exam" />
            {{ exam.name }}
          </div>
          <div class="time">{{ exam.begin_time }}</div>
        </div>
        <div class="two">考试时长：{{exam.last_time}}分钟</div>
      </li>
    </ul>
    <div class="page">
      <div id="page"></div>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>
<script>
import { mapState } from 'vuex';

export default {
  name: 'onExam',

  computed: {
    ...mapState(['uid']),
  },

  data() {
    return {
      // exams: '',
      exams: [
        {
          name: 'Idsa dont know',
          begin_time: '2019-12-01',
          last_time: '1.5',
        },
        {
          name: 'Thdsae first exam of c',
          begin_time: '2019-01-01',
          last_time: '2',
        },
        {
          name: 'Thdsae first exam of c',
          begin_time: '2019-01-01',
          last_time: '2',
        },
        {
          name: 'Thdsae first exam of c',
          begin_time: '2019-01-01',
          last_time: '2',
        }, {
          name: 'Thdsae first exam of c',
          begin_time: '2019-01-01',
          last_time: '2',
        }, {
          name: 'Thdsae first exam of c',
          begin_time: '2019-01-01',
          last_time: '2',
        }, {
          name: 'Thdsae first exam of c',
          begin_time: '2019-01-01',
          last_time: '2',
        }, {
          name: 'Thdsae first exam of c',
          begin_time: '2019-01-01',
          last_time: '2',
        }
      ],
    };
  },

  methods: {
    getzz() {
      var a = $('ul#all li');
      var zz = new Array(a.length);
      for (var i = 0; i < a.length; i++) {
        zz[i] = a[i].innerHTML;
      } //div的字符串数组付给zz
      return zz;
    },
    change(e) {
      pageno = e;
      if (e < 1) {
        e = 1;
        pageno = 1; //就等于第1页 ， 当前页为1
      }
      if (e > pageall) {
        //如果输入页大于最大页
        e = pageall;
        pageno = pageall; //输入页和当前页都=最大页
      }
      $('#all').html(''); //全部清空
      var html = '';
      for (var i = 0; i < pagesize; i++) {
        html += '<li>' + zz[(e - 1) * pagesize + i] + '</li>'; //创建一页的li列表
        if (zz[(e - 1) * pagesize + i + 1] == null) break; //超出最后的范围跳出
      }
      $('ul#all').html(html); //给ul列表写入html
      var ye = '';
      for (var j = 1; j <= pageall; j++) {
        if (e == j) {
          ye =
            ye +
            "<span><a href='#' onClick='change(" +
            j +
            ")' style='color:#FF0000'>" +
            j +
            '</a></span> ';
        } else {
          ye = ye + "<a href='#' onClick='change(" + j + ")'>" + j + '</a> ';
        }
      }
      var pageContent = '';
      pageContent += '第<span id="a2">' + pageno + '</span>/';
      pageContent += '<span id="a1">' + pageall + '</span>页';
      pageContent += '<span id="a3">' + ye + '</span>';
      pageContent += '<a href="#" onClick="change(--pageno)">上一页</a>';
      pageContent += '<a href="#" onClick="change(++pageno)">下一页</a>';
      $('#page').html(pageContent);
    },
    async getStuOnExamInfo() {
      try {
        const res = await this.$axios.post(`${this.HOST}/homePage/stu/id`, {
          stu_id: this.uid,
          status: 0,
        });
        const info = res.data;
        console.log(info);
        if (info.code === 200) {
          const onExamInfo = info.data;
          console.log(onExamInfo);
          this.exams = onExamInfo;
        } else {
          console.log('请求失败');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  // beforeMount() {
  //   this.getStuOnExamInfo();
  // },
  mounted() {
    var zz = getzz();
    var pageno = 1; //当前页
    var pagesize = 5; //每页多少条信息
    if (zz.length % pagesize == 0) {
      var pageall = zz.length / pagesize;
    } else {
      var pageall = parseInt(zz.length / pagesize) + 1;
    } //一共多少页
    this.change(1);
  },
};
</script>

<style lang="less" scoped>
.middle {
  margin: 15px 1px;
  width: auto;
  padding-left: 5px;
  flex-direction: column;

  #exam {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin: 10px auto;
    padding: 10px 3px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.17);

    .one {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: baseline;
      height: auto;
      line-height: 30px;
      padding-top: 10px;

      img {
        width: 15px;
      }

      .name {
        font-weight: bold;
        margin-left: 5px;
      }
      .name:hover {
        font-size: 18px;
        transition: all 0.5s ease;
      }

      .time {
        font-size: 13px;
        margin-left: 15px;
      }
    }

    .two {
      font-size: 14px;
      text-align: left;
      margin-left: 5px;
      margin-top: 5px;
      margin-bottom: 0px;
    }
  }
}
</style>
