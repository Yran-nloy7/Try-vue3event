<script setup>
import { userRegisterService } from '@/api/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
const isRegister = ref(false)
const form = ref(null)

// 整个的用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
  rePassword: ''
})
// 校验规则对象
// blur和change分别表示失去焦点和内容改变时触发校验
// min和max分别表示最小长度和最大长度，pattern表示正则表达式，message表示校验失败时的提示信息
// \s表示非空字符
// 自定义规则自己写函数：二次验证密码对不对，年龄验证
// validator函数接收三个参数：rule表示当前的校验规则对象，value表示当前表单元素的值，callback是一个回调函数，校验成功时调用callback()，校验失败时调用callback(new Error('错误信息'))
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 20, message: '长度必须在 5 - 20', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^.{6,15}$/,
      message: '密码长度必须在 6-15 位的非空字符',
      trigger: 'blur'
    }
  ],
  rePassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^.{6,15}$/,
      message: '密码长度必须在 6-15 位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const register = async () => {
  // 进行表单校验，校验成功后才会执行注册请求，校验失败时会在表单项下方显示错误信息
  await form.value.validate()
  await userRegisterService(formModel.value)
  alert('注册成功')
  isRegister.value = false
}
</script>

<template>
  <!-- 1.静态表达
       el-row表示一行，一行分成24行
       el-col表示列
       span=12，表示一行占据12份，50%。所以span=6就是6份，25%
       offset表示列的偏移量，offset=3表示左侧空出3份，25%
       el-form 表示表单组件
       el-form-item 表示表单项组件
       el-input 表示输入框组件
       2. 校验响应式
       el-form-> :model="ruleForm" 属性指定校验对象数据
       el-form-item-> :rules="rules" 属性指定校验规则
       表单元素-> v-model="ruleForm.username" 属性指定表单元素绑定的数据
       prop属性指定校验字段
       3. 登录注册切换
       -->

  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册相关 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="formModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="formModel.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="formModel.rePassword"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录相关 -->
      <el-form ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
