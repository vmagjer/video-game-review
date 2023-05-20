import api from '@/api';
import type { Game, NewGame } from '@/api/game';
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  // LIST
  const games = ref<Game[]>([])

  async function fetchGames() {
    const response = await api.game.list()
    games.value = response
  }
  async function fetchByGenre(genreId: number) {
    const response = await api.game.listByGenre(genreId)
    games.value = response
  }
  async function fetchByPlatform(platformId: number) {
    const response = await api.game.listByPlatform(platformId)
    games.value = response
  }

  // SINGLE
  const game = ref<Game | null>(null)
  async function fetchGame(gameId: number) {
    game.value = await api.game.find(gameId)
  }
  async function updateGame({ changedGame }: { changedGame: Game }) {
    game.value = await api.game.update(changedGame)
  }
  async function createGame(newGame: NewGame) {
    return await api.game.create(newGame)
  }

  return {
    games,
    fetchGames,
    fetchByGenre,
    fetchByPlatform,
    game,
    fetchGame,
    updateGame,
    createGame,
  }
})
