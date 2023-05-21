import api from '@/api';
import type { Game, GameDetails, NewGame } from '@/api/game';
import { defineStore } from 'pinia'
import { useReviewStore } from './review';
import type { Review } from '@/api/review';

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
  const game = ref<GameDetails | null>(null)
  const gameReviewScore = computed(() => {
    if (!game.value) return 0
    const { reviews } = game.value
    if (!reviews.length) return 0
    const total = reviews.reduce((acc, review) => acc + review.rating, 0)
    return total / reviews.length
  })
  async function fetchGame(gameId: number) {
    game.value = await api.game.find(gameId)
  }
  async function updateGame({ changedGame }: { changedGame: Game }) {
    await api.game.update(changedGame)
  }
  const reviewStore = useReviewStore()
  async function createGame(newGame: NewGame, reviews?: Omit<Review, 'id' | 'gameId' | 'user'>[]) {
    const game = await api.game.create(newGame)
    if (reviews) {
      await Promise.all(reviews.map(review => reviewStore.createReview({
        ...review,
        gameId: game.id,
      })))
    }
    return game
  }

  return {
    games,
    fetchGames,
    fetchByGenre,
    fetchByPlatform,
    game,
    gameReviewScore,
    fetchGame,
    updateGame,
    createGame,
  }
})
