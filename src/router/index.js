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
    path: '/setPassword',
    name: 'setPassword',
    component: () => import('../components/SetPassword.vue'),
  },
  {
    path: '/indexStu',
    name: 'indexStu',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/students/Index_stu.vue'),
  },
  {
    path: '/stuExamDetail',
    name: 'stuExamDetail',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/students/StuExamDetail.vue'),
  },
  {
    path: '/stuExamGrades',
    name: 'stuExamGrades',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/students/StuExamGrades.vue'),
  },
  {
    path: '/GradesCenter_tch',
    name: 'GradesCenter_tch',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/teacher/GradesCenter_tch.vue'),
  },
  {
    path: '/GradesCenter_Stu',
    name: 'GradesCenter_Stu',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/students/GradesCenter_Stu.vue'),
  },
  {
    path: '/StuGradesCenter',
    name: 'StuGradesCenter',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/teacher/StuGradesCenter.vue'),
  },
  {
    path: '/teaCourseDetail',
    name: 'teaCourseDetail',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/teacher/TeaCourseDetail.vue'),
  },
  {
    path: '/indexTch',
    name: 'indexTch',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "about" */'../views/teacher/Index_tch.vue'),
  },
  {
    path: '/personalStu',
    name: 'personalStu',
    meta: { requireAuth: true },
    component: () => import('../components/student/personal_stu.vue'),
  },
  {
    path: '/personalTch',
    name: 'personalTch',
    meta: { requireAuth: true },
    component: () => import('../components/teacher/personal_tch.vue'),
  },
  {
    path: '/SelectCourse',
    name: 'SelectCourse',
    meta: { requireAuth: true },
    component: () => import('../views/students/SelectCourse'),
  },
  {
    path: '/AddExam',
    name: 'AddExam',
    meta: { requireAuth: true },
    component: () => import('../views/teacher/AddExam'),
  },
  {
    path: '/AddQuestion',
    name: 'AddQuestion',
    meta: { requireAuth: true },
    component: () => import('../views/teacher/AddQuestion'),
  },
  {
    path: '/StuQuestion',
    name: 'StuStudent',
    meta: { requireAuth: true },
    component: () => import('../views/students/StuQuestion'),
  },
  {
    path: '/ScoreCenter',
    name: 'ScoreCenter',
    meta: { requireAuth: true },
    component: () => import('../views/teacher/ScoreCenter'),
  },
  {
    path: '/ExamInfo',
    name: 'ExamInfo',
    meta: { requireAuth: true },
    component: () => import('../components/ExamInfo'),
  },
  {
    path: '/ExamDetail',
    name: 'ExamDetail',
    meta: { requireAuth: true },
    component: () => import('../views/teacher/ExamDetail.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('Login') === 'true') {
      next();
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});
