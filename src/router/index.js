import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
console.log(import.meta.env.DEV)
// 路由懒加载import.meta.env.BASE_URL就是vite.config.js中base的值
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/login',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue'),
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue'),
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue'),
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue'),
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue'),
        },
      ],
    },
  ],
})

//登錄訪問攔截
router.beforeEach((to) => {
  // 如果访问的路径是登录页，直接放行
  //undefined == null  // true 直接放行。反之false 需要登录后才能访问，會攔截
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router
