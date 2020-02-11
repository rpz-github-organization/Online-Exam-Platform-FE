import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: '',
  },
  // 改变state里面的值得方法
  mutations: {
    set_uid(state, uid) {
      state.uid = uid;
    },
  },
  actions: {
    set_uid(set, uid) {
      set.commit('set_uid', uid);
    },
  },
  modules: {
  },
});
