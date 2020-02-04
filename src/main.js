import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.prototype.HOST = 'api';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
