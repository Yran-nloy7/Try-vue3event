import { defineStore } from 'pinia'
import { ref } from 'vue'
// vue3:token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService() //請求獲取數據
      user.value = res.data.data
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
    }
  },
  {
    persist: true,
  },
)
