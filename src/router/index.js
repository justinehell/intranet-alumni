import Vue from 'vue';
import VueRouter from 'vue-router';
import { getLocalStorageItem } from '../services/localStorage';

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
    path: '/me',
    name: 'Profile',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "Profile" */ '../views/Profile.vue'),
  },
  {
    path: '/alumni',
    name: 'Alumni',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "Alumni" */ '../views/AlumniList.vue'),
  },
  {
    path: '/alumni/:id',
    name: 'AlumniDetail',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "Alumni" */ '../views/AlumniDetail.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'public' },
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'public' },
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
  {
    path: '/password/forgotten',
    name: 'PasswordForgotten',
    props: true,
    meta: { layout: 'public' },
    component: () =>
      import(
        /* webpackChunkName: "PasswordForgotten" */ '../views/PasswordForgotten.vue'
      ),
  },
  {
    path: '/password/reset',
    name: 'ResetPassword',
    props: true,
    meta: { layout: 'public' },
    component: () =>
      import(
        /* webpackChunkName: "ResetPassword" */ '../views/ResetPassword.vue'
      ),
  },
  {
    path: '/account/password/new/:uid/:token',
    name: 'ResetPasswordConfirmation',
    props: true,
    meta: { layout: 'public' },
    component: () =>
      import(
        /* webpackChunkName: "ResetPasswordConfirmation" */ '../views/ResetPasswordConfirmation.vue'
      ),
  },
  {
    path: '/account/activate',
    name: 'AccountRegisterConfirmation',
    props: true,
    meta: { layout: 'public' },
    component: () =>
      import(
        /* webpackChunkName: "AccountRegisterConfirmation" */ '../views/AccountRegisterConfirmation.vue'
      ),
  },
  {
    path: '/account/activate/:uid/:token',
    name: 'AccountActivation',
    props: true,
    meta: { layout: 'public' },
    component: () =>
      import(
        /* webpackChunkName: "AccountActivation" */ '../views/AccountActivation.vue'
      ),
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
  const isLogged = !!getLocalStorageItem('accessToken');
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
  next();
});

export default router;
