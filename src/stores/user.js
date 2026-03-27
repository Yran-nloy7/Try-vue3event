import { defineStore } from 'pinia'
// vue3:token setToken removeToken
export const useUserStore = defineStore('big-user', () => {
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }
  return {
    token,
    setToken,
    removeToken,
  }
})
