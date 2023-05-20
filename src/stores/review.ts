import api from '@/api';
import type { NewReview, Review } from '@/api/review';
import { defineStore } from 'pinia'

export const useReviewStore = defineStore('review', () => {
  // LIST
  const reviews = ref<Review[]>([])

  async function fetchReviews({ gameId }: { gameId: number }) {
    const response = await api.review.list(gameId)
    reviews.value = response
  }

  // SINGLE
  const review = ref<Review | null>(null)
  async function fetchReview(reviewId: number) {
    review.value = await api.review.get(reviewId)
  }
  async function updateReview({ changedReview }: { changedReview: Review }) {
    review.value = await api.review.update(changedReview)
  }
  async function createReview(newReview: NewReview) {
    await api.review.create(newReview)
  }

  return {
    reviews,
    fetchReviews,
    review,
    fetchReview,
    updateReview,
    createReview,
  }
})
