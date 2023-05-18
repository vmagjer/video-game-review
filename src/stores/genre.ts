import api from '@/api';
import type { Genre } from '@/api/genre';
import { defineStore } from 'pinia'

export const useGenreStore = defineStore('genre', ()=>{
  const genres = ref<Genre[]>([])
  async function fetchGenres() {
    genres.value = await api.genre.list()
  }

  return {
    genres,
    fetchGenres,
  }
})
