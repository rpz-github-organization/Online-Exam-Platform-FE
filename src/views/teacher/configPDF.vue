<template>
  <div id="configPDF" class="page-config-pdf">
    <h3>根据 PDF 配置答题卡</h3>
    <div class="left-view flex flex-col jy-start as-center">
      <h4>
        <el-button
          style="color: black; font-size: 18px;"
          type="text"
          @click="() => (partSwitch = true)"
        >客观题部分：</el-button>
      </h4>
      <h4>选择题：</h4>
      <div class="select">
        <div @click="newSelect" class="q-block">+</div>
        <div v-for="(e, i) in objectivePart.select" :key="i" class="q-block">{{ i+1 }}</div>
      </div>
      <h4>判断题：</h4>
      <div class="judge">
        <div @click="newJudge" class="q-block">+</div>
        <div v-for="(e, i) in objectivePart.judge" :key="i" class="q-block">{{ i+1 }}</div>
      </div>
      <div class="line"></div>
      <h4>
        <el-button
          style="color: black; font-size: 18px;"
          type="text"
          @click="() => (partSwitch = false)"
        >主观题部分：</el-button>
      </h4>
    </div>
    <div class="right-view flex flex-col jy-start as-center">
      <div v-show="partSwitch" class="objective-part">
        <div class="select-part flex flex-col as-center jy-start">
          <h3>选择题部分：</h3>
          <div
            v-for="(e, i) in objectivePart.select"
            :key="i"
            class="answers flex jy-start as-center"
          >
            <label>选择题 ({{ i+1 }})</label>
            <el-radio-group class="answer-radio-group" v-model="objectivePart.select[i].answer">
              <el-radio label="A">A</el-radio>
              <el-radio label="B">B</el-radio>
              <el-radio label="C">C</el-radio>
              <el-radio label="D">D</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="judge-part flex flex-col as-center jy-start">
          <h3>判断题部分：</h3>
          <div
            v-for="(e, i) in objectivePart.judge"
            :key="i"
            class="answers flex jy-start as-center"
          >
            <label>判断题 ({{ i+1 }})</label>
            <el-radio-group class="answer-radio-group" v-model="objectivePart.judge[i].answer">
              <el-radio label="A">
                <i class="el-icon-check"></i>
              </el-radio>
              <el-radio label="B">
                <i class="el-icon-close"></i>
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div v-show="!partSwitch" class="subjective-part">sub</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['uid']),
    ...mapState(['examId']),
  },
  data() {
    return {
      partSwitch: true,

      objectivePart: {
        select: [],
        judge: [],
      },
      subjectivePart: {
        filling: [],
        program: [],
      },
    };
  },
  methods: {
    newSelect() {
      this.objectivePart.select.push({
        index: this.objectivePart.select.length + 1,
        answer: '',
      });
    },
    newJudge() {
      this.objectivePart.judge.push({
        index: this.objectivePart.judge.length + 1,
        answer: '',
      });
    },
  },
};
</script>

<style lang="less" scoped>
h3,
h4 {
  width: 100%;
  padding: 0 30px;
  margin: 5px 0;
  text-align: left;
}

#configPDF {
  background: url(../../assets/index_background_tch.gif);
  width: 100%;
  min-height: 100vh;
  padding: 20px 50px;

  .left-view,
  .right-view {
    background-color: #fff;
    margin: 0 24px;
    border: 1px solid rgba(0, 0, 1, 0.1);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);

    .line {
      width: 80%;
      height: 1px;
      margin: 20px auto;
      padding: 0 20px;
      height: 1px;
      border: 1px solid rgba(0, 0, 1, 0.1);
    }
  }

  .left-view {
    position: fixed;
    top: 140px;
    left: 20px;
    min-width: 400px;
    max-width: 400px;
    min-height: 200px;

    .q-block {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      font-size: 18px;
      width: 30px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.15);
      cursor: pointer;
    }

    .select,
    .judge {
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;

      * {
        margin: 5px;
      }
    }
  }

  .right-view {
    margin-left: auto;
    width: 72%;
    min-width: 800px;
    min-height: 100px;
    box-sizing: border-box;

    .objective-part,
    .subjective-part {
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: flex-start;
    }

    .objective-part {
      .select-part,
      .judge-part {
        width: 50%;
        padding: 10px 0 30px 0;
        margin: 0 auto;

        label {
          min-width: 80px;
          max-width: 80px;
        }

        .answers {
          width: 90%;
          margin: 0 auto;
          text-align: left;
          padding: 10px 0;
        }
        .answer-radio-group {
          margin-left: 20px;
        }
      }
    }
    .subjective-part {
    }
  }
}
</style>
