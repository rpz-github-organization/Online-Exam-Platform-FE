<template>
  <div id="AddQuestion">
    <div class="left">
      <el-card>
        <label class="selectType">选择题</label>
        <div class="question_list">
          <div class="question_item" v-for="(item,index) in counterS" :key="index">
            <label class="question_item">
              <span @click="JumpTo(index+1, 'counterS')">{{ index+1 }}</span>
            </label>
          </div>
          <label class="question_item" @click="AddCount(counterS)">
            <span>+</span>
          </label>
        </div>
        <label class="selectType">判断题</label>
        <div class="question_list">
          <div class="question_item" v-for="(item,index) in counterJ" :key="index">
            <label class="question_item">
              <span @click="JumpTo(index+1, 'counterJ')">{{ index+1 }}</span>
            </label>
          </div>
          <label class="question_item" @click="AddCount(counterJ)">
            <span>+</span>
          </label>
        </div>
        <label class="selectType">问答题</label>
        <div class="question_list">
          <div class="question_item" v-for="(item,index) in counterD" :key="index">
            <label class="question_item">
              <span @click="JumpTo(index+1, 'counterD')">{{ index+1 }}</span>
            </label>
          </div>
          <label class="question_item" @click="AddCount(counterD)">
            <span>+</span>
          </label>
        </div>
        <label class="selectType">编程题</label>
        <div class="question_list">
          <div class="question_item" v-for="(item,index) in counterP" :key="index">
            <label class="question_item">
              <span @click="JumpTo(index+1, 'counterP')">{{ index+1 }}</span>
            </label>
          </div>
          <label class="question_item" @click="AddCount(counterP)">
            <span>+</span>
          </label>
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card class="ques_card">
        <div class="type_score">
          <label class="type_title">小题分值</label>
          <el-input v-model="scoreS" clearable></el-input>
        </div>
        <div v-for="(item,index) in counterS" :key="index" v-bind:id="('counterS'+(index+1))">
          <label>选择题-{{ index+1 }}</label>
          <single :index="index"  :score="scoreS"></single>
        </div>
      </el-card>
      <el-card class="ques_card">
        <div class="type_score">
          <label class="type_title">小题分值</label>
          <el-input v-model="scoreJ" clearable></el-input>
        </div>
        <div v-for="(item,index) in counterJ" :key="index" v-bind:id="('counterJ'+(index+1))">
          <label>判断题-{{ index+1 }}</label>
          <judge ref="judge" :index="index" :score="scoreJ"/>
        </div>
      </el-card>
      <el-card class="ques_card">
        <div v-for="(item,index) in counterD" :key="index" v-bind:id="('counterD'+(index+1))">
          <label>讨论题-{{ index+1 }}</label>
          <discussion :index="index"/>
        </div>
      </el-card>
      <el-card class="ques_card">
        <div v-for="(item,index) in counterP" :key="index" v-bind:id="('counterP'+(index+1))">
          <label>编程题-{{ index+1 }}</label>
          <program :index="index"/>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import single from '../components/teacher/Single.vue';
import judge from '../components/teacher/Judge.vue';
import discussion from '../components/teacher/Discussion.vue';
import program from '../components/teacher/Program.vue';

export default {
  name: 'AddQuestion',
  components: {
    single,
    judge,
    discussion,
    program,
  },
  computed: {
    ...mapState(['uid']),
  },
  data() {
    return {
      options: [{
        value: 'single',
        label: '选择题',
      }, {
        value: 'judge',
        label: '判断题',
      }, {
        value: 'discussion',
        label: '简答题',
      }, {
        value: 'program',
        label: '编程题',
      }],
      type: '',
      counterS: [''],
      counterJ: [''],
      counterD: [''],
      counterP: [''],
      scoreS: '',
      scoreJ: '',
    };
  },

  methods: {
    AddCount(counter) {
      counter.push('');
    },
    JumpTo(key, counterW) {
      const PageId = document.querySelector(`#${counterW}${key}`);
      // console.log(PageId.offsetTop);
      window.scroll({
        top: PageId.offsetTop,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="less" scoped>
#AddQuestion{
    display: flex;
    .left{
      width: 12%;
      height: 100%;
      margin-left: 5%;
      position: fixed;

      .selectType{
        background-color: #5379a563;
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
    .right{
      width: 60%;
      height: 100%;
      margin-left: 25%;

      .ques_card{
        display: flex;
        flex-direction: column;
        margin-bottom: 5%;

        .type_score{
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          width: 20%;
        }
        .type_title{
          width: 80%;
          text-align: left;
          margin: 5% 5px;
        }
        label{
          color: #8590a6;
        }
      }
    }
}
</style>
