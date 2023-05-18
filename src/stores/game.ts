import api from '@/api';
import type { Game } from '@/api/game';
import { defineStore } from 'pinia'

const ITEMS_PER_PAGE = 10

type SearchParams = Partial<{ query: string, genres: number[] }>

export const useGameStore = defineStore('game', () => {
  // MASTER
  const _games = ref<Game[]>([])
  const _page = ref<number>(1)
  const _totalGames = ref<number>(0)
  const _maxPage = computed(() => Math.ceil(_totalGames.value / ITEMS_PER_PAGE))

  async function fetchGames({ searchParams }: { searchParams: SearchParams}) {
    const response = await api.game.list(_page.value, ITEMS_PER_PAGE, { query: searchParams.query, genres: searchParams.genres })
    _games.value = response.data
    _totalGames.value = response.total
  }
  async function nextPage({searchParams}: { searchParams: SearchParams}) {
    if (_page.value >= _maxPage.value) throw new Error('No more pages')
    _page.value++
    await fetchGames({ searchParams })
  }
  async function previousPage({searchParams}: { searchParams: SearchParams}) {
    if (_page.value <= 1) throw new Error('No more pages')
    _page.value--
    await fetchGames({ searchParams })
  }

  // DETAIL
  const _game = ref<Game | null>(null)
  async function fetchGame(gameId: number) {
    _game.value = await api.game.find(gameId)    
  }
  async function updateGame({ gameId, game }: { gameId: number, game: Partial<Game> }) {
    _game.value = await api.game.update(gameId, game)
  }
  async function createGame(game: Game) {
    await api.game.create(game)
  }

  return {
    game: computed(() => _game.value),
    fetchGame,
    updateGame,
    createGame,
    games: computed(() => _games.value),
    page: computed(() => _page.value),
    totalGames: computed(() => _totalGames.value),
    maxPage: computed(() => _maxPage.value),
    fetchGames,
    nextPage,
    previousPage,
  }
})
