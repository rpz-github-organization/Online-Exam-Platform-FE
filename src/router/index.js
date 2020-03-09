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
    path: '/stuExamDetail',
    name: 'stuExamDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/StuExamDetail.vue'),
  },
  {
    path: '/stuExamGrades',
    name: 'stuExamGrades',
    component: () => import(/* webpackChunkName: "about" */ '../views/StuExamGrades.vue'),
  },
  {
    path: '/GradesCenter_tch',
    name: 'GradesCenter_tch',
    component: () => import(/* webpackChunkName: "about" */ '../views/GradesCenter_tch.vue'),
  },
  {
    path: '/GradesCenter_Stu',
    name: 'GradesCenter_Stu',
    component: () => import(/* webpackChunkName: "about" */ '../views/GradesCenter_Stu.vue'),
  },
  {
    path: '/StuGradesCenter',
    name: 'StuGradesCenter',
    component: () => import(/* webpackChunkName: "about" */ '../views/StuGradesCenter.vue'),
  },
  {
    path: '/teaCourseDetail',
    name: 'teaCourseDetail',
    component: () => import('../views/TeaCourseDetail.vue'),
  },
  {
    path: '/indexTch',
    name: 'indexTch',
    component: () => import(/* webpackChunkName: "about" */'../views/Index_tch.vue'),

  },
  {
    path: '/personalStu',
    name: 'personalStu',
    component: () => import('../components/personal_stu.vue'),
  },
  {
    path: '/personalTch',
    name: 'personalTch',
    component: () => import('../components/personal_tch.vue'),
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
  {
    path: '/ScoreCenter',
    name: 'ScoreCenter',
    component: () => import('../views/ScoreCenter'),
  },
  {
    path: '/ExamInfo',
    name: 'ExamInfo',
    component: () => import('../components/ExamInfo'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
