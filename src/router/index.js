import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

console.log(import.meta.env.DEV)
// 路由懒加载import.meta.env.BASE_URL就是vite.config.js中base的值

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截（正确写法）
router.beforeEach((to) => {
  // 只创建一次 store，放在守卫外面也可以
  const userStore = useUserStore()
  // 未登录 且 访问的不是登录页 → 拦截
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
  return true
})

export default router
