import api from '@/api';
import type { Platform } from '@/api/platform';
import { defineStore } from 'pinia'

export const usePlatformStore = defineStore('platform', ()=>{
  const platforms = ref<Platform[]>([])
  async function fetchPlatforms() {
    platforms.value = await api.platform.list()
  }

  return {
    platforms,
    fetchPlatforms,
  }
})
