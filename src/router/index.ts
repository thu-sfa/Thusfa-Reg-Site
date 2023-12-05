import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('../views/RegView.vue'),
      props: (route) => ({ 
        step: Number.parseInt(route.query.step as string) || 1,
        existed: route.query.existed === 'true' || false,
       })
    },
    {
      path: '/oauth/redirect',
      name: 'oauth',
      component: () => import('../views/RedirectView.vue'),
      props: (route) => ({ code: route.query.code })
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/ErrorView.vue'),
      props: (route) => ({
        code: Number.parseInt(route.query.code as string) || 500,
        msg: route.query.msg
      })
    },
    {
      path: '/admin/redirect',
      name: 'admin_redirect',
      component: () => import('../views/AdminRedirectView.vue'),
      props: (route) => ({ code: route.query.code })
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
  ]
})

export default router
