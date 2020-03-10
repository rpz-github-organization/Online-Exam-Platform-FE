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
    component: () => import(/* webpackChunkName: "about" */ '../views/students/Index_stu.vue'),
  },
  {
    path: '/stuExamDetail',
    name: 'stuExamDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/students/StuExamDetail.vue'),
  },
  {
    path: '/stuExamGrades',
    name: 'stuExamGrades',
    component: () => import(/* webpackChunkName: "about" */ '../views/students/StuExamGrades.vue'),
  },
  {
    path: '/GradesCenter_tch',
    name: 'GradesCenter_tch',
    component: () => import(/* webpackChunkName: "about" */ '../views/teacher/GradesCenter_tch.vue'),
  },
  {
    path: '/GradesCenter_Stu',
    name: 'GradesCenter_Stu',
    component: () => import(/* webpackChunkName: "about" */ '../views/students/GradesCenter_Stu.vue'),
  },
  {
    path: '/StuGradesCenter',
    name: 'StuGradesCenter',
    component: () => import(/* webpackChunkName: "about" */ '../views/teacher/StuGradesCenter.vue'),
  },
  {
    path: '/teaCourseDetail',
    name: 'teaCourseDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/teacher/TeaCourseDetail.vue'),
  },
  {
    path: '/indexTch',
    name: 'indexTch',
    component: () => import(/* webpackChunkName: "about" */'../views/teacher/Index_tch.vue'),

  },
  {
    path: '/personalStu',
    name: 'personalStu',
    component: () => import('../components/student/personal_stu.vue'),
  },
  {
    path: '/personalTch',
    name: 'personalTch',
    component: () => import('../components/teacher/personal_tch.vue'),
  },
  {
    path: '/SelectCourse',
    name: 'SelectCourse',
    component: () => import('../views/students/SelectCourse'),
  },
  {
    path: '/AddExam',
    name: 'AddExam',
    component: () => import('../views/teacher/AddExam'),
  },
  {
    path: '/AddQuestion',
    name: 'AddQuestion',
    component: () => import('../views/teacher/AddQuestion'),
  },
  {
    path: '/StuQuestion',
    name: 'StuStudent',
    component: () => import('../views/students/StuQuestion'),
  },
  {
    path: '/ScoreCenter',
    name: 'ScoreCenter',
    component: () => import('../views/teacher/ScoreCenter'),
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
