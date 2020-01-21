import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import IndexStu from '../components/Index_stu.vue'

Vue.use(Router)

Vue.prototype.$ajax = axios

const routes = [
  {
    path: '/',
    name: 'IndexStu',
    component: IndexStu
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
