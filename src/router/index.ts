import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'newgame',
    component: () =>
      import(/* webpackChunkName: "newgame" */ '../pages/index.vue'),
  },
  {
    path: '/logs',
    name: 'logs',

    component: () => import(/* webpackChunkName: "logs" */ '../pages/logs.vue'),
  },
  {
    path: '/market',
    name: 'market',

    component: () =>
      import(/* webpackChunkName: "market" */ '../pages/market.vue'),
  },
  {
    path: '/mint',
    name: 'mint',

    component: () => import(/* webpackChunkName: "mint" */ '../pages/mint.vue'),
  },
  {
    path: '/about',
    name: 'About',

    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/about.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
