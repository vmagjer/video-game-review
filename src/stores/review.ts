import api from '@/api';
import type { Review } from '@/api/review';
import { defineStore } from 'pinia'

const ITEMS_PER_PAGE = 10

export const useReviewStore = defineStore('review', () => {
  // MASTER
  const _reviews = ref<Review[]>([])
  const _page = ref<number>(1)
  const _totalReviews = ref<number>(0)
  const _maxPage = computed(() => Math.ceil(_totalReviews.value / ITEMS_PER_PAGE))

  async function fetchReviews({ gameId }: { gameId: number }) {
    const response = await api.review.list(gameId, _page.value, ITEMS_PER_PAGE)
    _reviews.value = response.data
    _totalReviews.value = response.total
  }
  async function nextPage({ gameId }: { gameId: number }) {
    if (_page.value >= _maxPage.value) throw new Error('Page does not exist')
    _page.value++
    await fetchReviews({ gameId })
  }
  async function previousPage({ gameId }: { gameId: number }) {
    if (_page.value <= 1) throw new Error('Page does not exist')
    _page.value--
    await fetchReviews({ gameId })
  }

  // DETAIL
  const _review = ref<Review | null>(null)
  async function fetchReview(reviewId: number) {
    _review.value = await api.review.get(reviewId)
  }
  async function updateReview({ reviewId, review }: { reviewId: number, review: Partial<Review> }) {
    _review.value = await api.review.update(reviewId, review)
  }
  async function createReview(review: Review) {
    await api.review.create(review)
  }

  return {
    review: computed(() => _review.value),
    fetchReview,
    updateReview,
    createReview,
    reviews: computed(() => _reviews.value),
    page: computed(() => _page.value),
    totalReviews: computed(() => _totalReviews.value),
    maxPage: computed(() => _maxPage.value),
    fetchReviews,
    nextPage,
    previousPage,
  }
})
