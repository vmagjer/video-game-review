import api from '@/api';
import type { Review } from '@/api/review';
import { defineStore } from 'pinia'

export const useReviewStore = defineStore('review', () => {
  // LIST
  const reviews = ref<Review[]>([])

  async function fetchReviews() {
    const response = await api.review.list()
    reviews.value = response
  }

  // SINGLE
  const review = ref<Review | null>(null)
  async function fetchReview(reviewId: number) {
    review.value = await api.review.get(reviewId)
  }
  async function updateReview(changedReview: Review) {
    review.value = await api.review.update(changedReview)
  }
  async function createReview(newReview: Omit<Review, 'user' | 'id'>) {
    await api.review.create({
      ...newReview,
      id: reviews.value.length + 1,
      user: {
        id: 0,
        username: 'Anonymous',
        firstName: 'Anonymous',
        email: 'anon@d.d',
      },
    })
  }
  async function deleteReview(reviewId: number) {
    await api.review.remove(reviewId)
  }

  return {
    reviews,
    fetchReviews,
    review,
    fetchReview,
    updateReview,
    createReview,
    deleteReview,
  }
})
