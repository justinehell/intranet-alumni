import Vue from 'vue';
import VueRouter from 'vue-router';
import { getLocalStorage } from '../services/localStorage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
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
  const requiredAuthPath = to.matched.some(
    (record) => record.meta.requiresAuth
  );
  const isLogged = !!getLocalStorage('accessToken');
  if (to.meta.requiresAuth || requiredAuthPath) {
    // when user is not logged in
    if (!isLogged) {
      next({ name: 'Login' });
    }
    // when user is logged in
    else {
      next();
    }
  }
  // to pubic page (no credentials required)
  else if (isLogged) {
    next({ name: 'Home' });
  }
});

export default router;
