export default [
  {
    path: '/profile',
    name: 'Profile',
    meta: { requiresAuth: true, layout: 'app' },
    component: () =>
      import(/* webpackChunkName: "Profile" */ '../../views/Profile.vue'),
  },
];
