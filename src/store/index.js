import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authLevel: 0,
    uid: '',
    examId: 0,
    coId: 0,
  },
  getters: {
  },
  // 改变state里面的值得方法
  mutations: {
    setId(state, uid) {
      state.uid = uid;
    },
    setAuthLevel(state, authLevel) {
      state.authLevel = authLevel;
    },
    setExamId(state, examId) {
      state.examId = examId;
    },
    setCoId(state, coId) {
      state.coId = coId;
    },
  },
  actions: {
    set_uid(set, uid) {
      set.commit('setId', uid);
    },
    set_authLevel(set, authLevel) {
      set.commit('setAuthLevel', authLevel);
    },
    set_examId(set, examId) {
      set.commit('setExamId', examId);
    },
    set_coId(set, coId) {
      set.commit('setCoId', coId);
    },
  },
  modules: {
  },
});
