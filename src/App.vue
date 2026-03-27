<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()

// 跳转到列表页的方法
const goList = () => {
  router.push('/list')
}
const userStore = useUserStore()
</script>

<template>
  <div>
    我是App
    <test-demo></test-demo>
    <el-button @click="$router.push('/home')">跳首页</el-button>
    <el-button @click="goList">跳列表页</el-button>

    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('Bearer sidfhieufh heiwhuvyweqrjh')">登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
  </div>
</template>
