import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/addon/hint/show-hint.css';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

import './common.less';

Vue.use(codemirror);

Vue.use(ElementUI, { zIndex: 1000 });
Vue.prototype.$axios = axios;
Vue.prototype.HOST = 'api';
axios.defaults.headers.post['Content-Type'] = 'Content-Type:application/x-www-form-urlencoded; charset=UTF-8';


Vue.config.productionTip = false;

Vue.prototype.HOST = 'api';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
