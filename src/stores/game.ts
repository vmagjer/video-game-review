import api from '@/api';
import type { Game, NewGame } from '@/api/game';
import { defineStore } from 'pinia'

const ITEMS_PER_PAGE = 10

type SearchParams = Partial<{ query: string, genres: string[] }>

export const useGameStore = defineStore('game', () => {
  // MASTER
  const games = ref<Game[]>([])
  const page = ref<number>(1)
  const totalGames = ref<number>(0)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalGames.value / ITEMS_PER_PAGE)))

  async function fetchGames({ searchParams }: { searchParams: SearchParams }) {
    page.value = 1
    const response = await api.game.list(page.value, ITEMS_PER_PAGE, { query: searchParams.query, genres: searchParams.genres?.map(Number) })
    games.value = response.data
    totalGames.value = response.total
  }
  async function nextPage({ searchParams }: { searchParams: SearchParams }) {
    if (page.value >= totalPages.value) throw new Error('No more pages')
    page.value++
    await fetchGames({ searchParams })
  }
  async function previousPage({ searchParams }: { searchParams: SearchParams }) {
    if (page.value <= 1) throw new Error('No more pages')
    page.value--
    await fetchGames({ searchParams })
  }

  // DETAIL
  const game = ref<Game | null>(null)
  async function fetchGame(gameId: string) {
    game.value = await api.game.find(parseInt(gameId))
  }
  async function updateGame({ gameId, changedGame }: { gameId: number, changedGame: Partial<Game> }) {
    game.value = await api.game.update(gameId, changedGame)
  }
  async function createGame(newGame: NewGame) {
    return await api.game.create(newGame)
  }

  return {
    games,
    page,
    totalGames,
    totalPages,
    fetchGames,
    nextPage,
    previousPage,
    game,
    fetchGame,
    updateGame,
    createGame,
  }
})
