import Vue from 'vue';
import VueRouter from 'vue-router';
import { getLocalStorage } from '../services/localStorage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
  {
    path: '/404',
    alias: '*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = !!getLocalStorage('accessToken');

  // redirect to login page if not logged in and trying to access a restricted page
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  // redirect to current path page if logged in and trying to access /login or /register
  if (!authRequired && loggedIn) {
    return next(from.path);
  }
  next();
});

export default router;
