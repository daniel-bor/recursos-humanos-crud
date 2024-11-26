import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../modules/auth/views/LoginView.vue';
import NotFound404 from '../modules/common/pages/NotFound404.vue';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import isNotAuthenticatedGuard from '@/modules/auth/guards/is-not-authenticated.guard';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      beforeEnter: [isNotAuthenticatedGuard],
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // beforeEnter: [isAuthenticatedGuard],
      redirect: { name: 'empresas' },
      component: () => import('../modules/dashboard/layouts/DashboardLayout.vue'),
      children: [
        {
          path: 'paises',
          name: 'paises',
          component: () => import('../modules/paises/views/HomeView.vue'),
        },
        {
          path: 'departamentos',
          name: 'departamentos',
          component: () => import('../modules/departamentos/views/HomeView.vue'),
        },
        {
          path: 'municipios',
          name: 'municipios',
          component: () => import('../modules/municipios/views/HomeView.vue'),
        },
        {
          path: 'empresas',
          name: 'empresas',
          component: () => import('../modules/empresas/views/HomeView.vue'),
        },
        {
          path: 'colaboradores',
          name: 'colaboradores',
          component: () => import('../modules/colaboradores/views/HomeView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound404,
    },
  ],
});

export default router;
