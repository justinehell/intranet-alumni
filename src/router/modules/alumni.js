export default [
  {
    path: '/alumni',
    name: 'AlumniList',
    meta: { requiresAuth: true, layout: 'app' },
    component: () =>
      import(/* webpackChunkName: "AlumniList" */ '../../views/AlumniList.vue'),
  },
  {
    path: '/alumni/:id',
    name: 'AlumniDetail',
    meta: { requiresAuth: true, layout: 'app' },
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "AlumniDetail" */ '../../views/AlumniDetail.vue'
      ),
  },
];
