import api from '@/api';
import type { Review } from '@/api/review';
import { defineStore } from 'pinia'

const ITEMS_PER_PAGE = 10

export const useReviewStore = defineStore('review', () => {
  // MASTER
  const reviews = ref<Review[]>([])
  const page = ref<number>(1)
  const totalReviews = ref<number>(0)
  const totalPages = computed(() => Math.ceil(totalReviews.value / ITEMS_PER_PAGE))

  async function fetchReviews({ gameId }: { gameId: string }) {
    const response = await api.review.list(parseInt(gameId), page.value, ITEMS_PER_PAGE)
    reviews.value = response.data
    totalReviews.value = response.total
  }
  async function nextPage({ gameId }: { gameId: string }) {
    if (page.value >= totalPages.value) throw new Error('Page does not exist')
    page.value++
    await fetchReviews({ gameId })
  }
  async function previousPage({ gameId }: { gameId: string }) {
    if (page.value <= 1) throw new Error('Page does not exist')
    page.value--
    await fetchReviews({ gameId })
  }

  // DETAIL
  const review = ref<Review | null>(null)
  async function fetchReview(reviewId: string) {
    review.value = await api.review.get(parseInt(reviewId))
  }
  async function updateReview({ reviewId, changedReview }: { reviewId: number, changedReview: Partial<Review> }) {
    review.value = await api.review.update(reviewId, changedReview)
  }
  async function createReview(newReview: Review) {
    await api.review.create(newReview)
  }

  return {
    review,
    fetchReview,
    updateReview,
    createReview,
    reviews,
    page,
    totalReviews,
    totalPages,
    fetchReviews,
    nextPage,
    previousPage,
  }
})
