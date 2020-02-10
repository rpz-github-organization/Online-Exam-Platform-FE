import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: '',
    examInfo: '',
  },
  // 改变state里面的值得方法
  mutations: {
    set_uid(state, uid) {
      state.uid = uid;
    },
    set_onExamInfo(state, onExamInfo) {
      state.onExamInfo = onExamInfo;
    },
  },
  actions: {
    set_uid(set, uid) {
      set.commit('set_uid', uid);
    },
    set_onExamInfo(set, onExamInfo) {
      set.commit('set_onExamInfo', onExamInfo);
    },
  },
  modules: {
  },
});
