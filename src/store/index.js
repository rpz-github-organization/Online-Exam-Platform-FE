import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stu_uids: null,
  },
  // 改变state里面的值得方法
  mutations: {
    stu_uid(state, data) {
      state.stu_uids = data;
    },
  },
  actions: {
  },
  modules: {
  },
});
