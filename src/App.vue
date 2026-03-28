<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { useCounterStore } from './stores/modules/counter'
const router = useRouter()

const goList = () => {
  router.push('/list')
}

const userStore = useUserStore()
const countStore = useCounterStore()
</script>

<template>
  <div>
    <hr />
    <router-view></router-view>
    <hr />
    <hr />

    我是App
    <test-demo></test-demo>
    <el-button @click="$router.push('/home')">跳首页</el-button>
    <el-button @click="goList">跳列表页</el-button>

    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('Bearer sidfhieufh heiwhuvyweqrjh')">
      登录
    </el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>

    <hr />
    <p>{{ countStore.count }}</p>
    <el-button @click="countStore.add(2)"> 加法 </el-button>
  </div>
</template>
