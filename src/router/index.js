import { createRouter, createWebHashHistory } from 'vue-router'
console.log(import.meta.env.DEV)
// 路由懒加载import.meta.env.BASE_URL就是vite.config.js中base的值
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [],
})

export default router
