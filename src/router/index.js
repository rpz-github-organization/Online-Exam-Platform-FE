import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import IndexStu from '../views/Index_stu.vue';
import IndexTch from '../views/Index_tch.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/index_stu',
    name: 'IndexStu',
    component: IndexStu,
  },
  {
    path: '/index_tch',
    name: 'IndexTch',
    component: IndexTch,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
