import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authLevel: 0,
    uid: '',
  },
  getters: {
  },
  mutations: {
    set_uid(state, uid) {
      state.uid = uid;
    },
    set_authLevel(state, authLevel) {
      state.authLevel = authLevel;
    },
  },
  actions: {
    set_uid(set, uid) {
      set.commit('set_uid', uid);
    },
    set_authLevel(set, authLevel) {
      set.commit('set_authLevel', authLevel);
    },
  },
  modules: {
  },
});
