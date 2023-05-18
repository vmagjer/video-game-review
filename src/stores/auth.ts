import api from '@/api';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', ()=>{
  const token = ref<string | null>(localStorage.getItem('token') ?? null)
  const isLoggedIn = computed(() => !!token.value)
  async function login({ email, password }: { email: string; password: string}) {
    const response = await api.auth.login( email, password )
    token.value = response.token
  }

  async function logout() {
    await api.auth.logout()
  }

  async function register({ email, password }: { email: string; password: string }) {
    await api.auth.register( email, password )
  }

  return {
    isLoggedIn,
    login,
    logout,
    register,
  }
})
