<template>
    <div id="stuQuestion">
      <label class="res_time">距离考试结束还剩-min</label>
      <div class="paper">
          <div class="menu">
            <el-card>
              <label class="selectType">选择题</label>
              <div class="question_list">
              <div class="question_item" v-for="(item,index) in counterS" :key="index">
                <label class="question_item">
                <span @click="JumpTo(index+1, 'counterS')">{{ index+1 }}</span>
                </label>
              </div>
              </div>
              <label class="selectType">判断题</label>
              <div class="question_list">
              <div class="question_item" v-for="(item,index) in counterJ" :key="index">
                <label class="question_item">
                <span @click="JumpTo(index+1, 'counterJ')">{{ index+1 }}</span>
                </label>
              </div>
              </div>
              <label class="selectType">问答题</label>
              <div class="question_list">
              <div class="question_item" v-for="(item,index) in counterD" :key="index">
                <label class="question_item">
                <span @click="JumpTo(index+1, 'counterD')">{{ index+1 }}</span>
                </label>
              </div>
              </div>
              <label class="selectType">编程题</label>
              <div class="question_list">
              <div class="question_item" v-for="(item,index) in counterP" :key="index">
                <label class="question_item">
                <span @click="JumpTo(index+1, 'counterP')">{{ index+1 }}</span>
                </label>
              </div>
              </div>
            </el-card>
          </div>
          <div class="ques">
            <el-card class="ques_card">
              <div v-for="(item,index) in counterS" :key="index" v-bind:id="('counterS'+(index+1))">
                <label>选择题-{{ index+1 }}</label>
                <singleQues :index="index"></singleQues>
              </div>
            </el-card>
            <el-card class="ques_card">
              <div v-for="(item,index) in counterJ" :key="index" v-bind:id="('counterJ'+(index+1))">
                <label>判断题-{{ index+1 }}</label>
                <judgeQues ref="judge" :index="index"/>
              </div>
            </el-card>
            <el-card class="ques_card">
              <div v-for="(item,index) in counterD" :key="index" v-bind:id="('counterD'+(index+1))">
                <label>讨论题-{{ index+1 }}</label>
                <discussionQues :index="index"/>
              </div>
            </el-card>
            <el-card class="ques_card">
              <div v-for="(item,index) in counterP" :key="index" v-bind:id="('counterP'+(index+1))">
                <label>编程题-{{ index+1 }}</label>
                <programQues :index="index"/>
              </div>
            </el-card>
          </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import singleQues from '@/components/student/SingleQues.vue';
import judgeQues from '@/components/student/JudgeQues.vue';
import discussionQues from '@/components/student/DiscussionQues.vue';
import programQues from '@/components/student/ProgramQues.vue';

export default {
  name: 'stuQuestion',
  components: {
    singleQues,
    judgeQues,
    discussionQues,
    programQues,
  },
  mounted() {
    if (document.getElementById('nav')) {
      const p = document.getElementById('app');
      const c = document.getElementById('nav');
      p.removeChild(c);
    }
  },
  computed: {
    ...mapState(['uid']),
  },
  data() {
    return {
      counterS: ['', ''],
      counterJ: ['', ''],
      counterD: ['', ''],
      counterP: ['', ''],
    };
  },
  created() {
    this.Begin();
  },
  methods: {
    JumpTo(key, counterW) {
      const PageId = document.querySelector(`#${counterW}${key}`);
      // console.log(PageId.offsetTop);
      window.scroll({
        top: PageId.offsetTop,
        behavior: 'smooth',
      });
    },
    async Begin() {
      console.log('a');
      try {
        const res = await this.$axios.post(`${this.HOST}/exam/getStuExam`, {
          exam_id: 1,
          stu_id: 2018110214,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#stuQuestion{
  margin-top: 100px;
  display: flex;
  flex-direction: column;

  .res_time{
    display: flex;
    justify-content: flex-start;
    margin-left: 5%;
    font-weight: bold;
    position: fixed;
  }
  .paper{
    display: flex;
    flex-direction: row;
    margin-top: 50px;
  }
  .menu{
    width: 12%;
    height: 100%;
    margin-left: 5%;
    position: fixed;

    .selectType{
      background-color: #7CC68C;
      padding: 5px 10px;
      margin-bottom: 30%;
      border-radius: 4px
    }
    .question_list{
      margin: 10% 0 30% 0;
      flex-wrap: wrap;
      display: flex;
    }

    .question_item{
      margin: 4px;
      align-items: center;
      justify-content: center;
      height: 24px;
      width: 24px;
      min-width: 24px;
      text-align: center;
      line-height: 24px;
      border-radius: 2px;
      background: #f0f0f0;
    }
    .active_item{
    box-shadow: 0 0 0 2px #695de0;
    }
  }
  .ques{
    margin-left: 25%;
    width: 60%;

    .ques_card{
      display: flex;
      flex-direction: column;
      margin-bottom: 5%;
    }
  }
}
</style>
