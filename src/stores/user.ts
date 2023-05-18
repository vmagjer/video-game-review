import api from '@/api';
import type { User } from '@/api/user';
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', ()=>{
  const me = ref<User | null>(null)
  async function fetchMe() {
    me.value = await api.user.getUser()
  }

  async function updateMe(userId: number, user: Partial<User>) {
    me.value = await api.user.updateUser(userId, user)
  }

  return {
    me,
    fetchMe,
    updateMe,
  }
})
