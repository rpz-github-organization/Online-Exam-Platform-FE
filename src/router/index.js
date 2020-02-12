import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';


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
    path: '/register',
    name: 'register',
    component: () => import('../components/register.vue'),
  },
  {
    path: '/indexStu',
    name: 'indexStu',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index_stu.vue'),
  },
  {
    path: '/indexTch',
    name: 'indexTch',
    component: () => import(/* webpackChunkName: "about" */'../views/Index_tch.vue'),

  },
  {
    path: '/personal_center',
    name: 'personal_center',
    component: () => import('../components/personal_center.vue'),
  },
  {
    path: '/SelectCourse',
    name: 'SelectCourse',
    component: () => import('../views/SelectCourse'),
  },
  {
    path: '/AddExam',
    name: 'AddExam',
    component: () => import('../views/AddExam'),
  },
  {
    path: '/AddQuestion',
    name: 'AddQuestion',
    component: () => import('../views/AddQuestion'),
  },
  {
    path: '/StuQuestion',
    name: 'StuStudent',
    component: () => import('../views/StuQuestion'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
