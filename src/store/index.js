import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authLevel: 0,
    uid: '',
    examId: '2',
  },
  getters: {
  },
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
  },
  modules: {
  },
});
