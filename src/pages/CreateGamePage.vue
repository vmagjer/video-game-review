<script setup lang="ts">
import GameReview from '@/components/GameReview.vue'
import { useGameStore } from '@/stores/game'
import { useHead } from '@vueuse/head'
import ReviewForm from '@/components/ReviewForm.vue'
import type { Review } from '@/api/review'
import GameForm from '@/components/GameForm.vue'
import type { Genre } from '@/api/genre'
import type { Platform } from '@/api/platform'

// useRoute, useHead, and HelloWorld are automatically imported. See vite.config.ts for details.
const route = useRoute()

useHead({
  title: route.meta.title,
  meta: [
    {
      property: 'og:title',
      content: route.meta.title,
    },
    {
      name: 'twitter:title',
      content: route.meta.title,
    },
  ],
})

const gameStore = useGameStore()

// manipulation
const loadingCreateGame = ref(false)
async function submit({
  name,
  creatorStudio,
  description,
  genres,
  platforms,
}: {
  name: string
  creatorStudio: string
  description: string
  genres: Genre[]
  platforms: Platform[]
}) {
  loadingCreateGame.value = true
  try {
    await gameStore.createGame(
      {
        name,
        creatorStudio,
        description,
        genres,
        platforms,
      },
      reviewsToAdd.value.map((rev) => rev.review)
    )    
  } catch (error) {
    console.error(error)    
  } finally {
    loadingCreateGame.value = false
  }
}

type ReviewToAdd = {
  tempId: number
  review: Omit<Review, 'id' | 'gameId' | 'user'>
}
const reviewsToAdd = ref<ReviewToAdd[]>([])

type ReviewForm = {
  rating: number
  body: string
}

function addReview({ rating, body }: ReviewForm) {
  reviewsToAdd.value.push({
    tempId: Date.now(),
    review: {
      rating,
      review: body,
    },
  })
}

function removeReview(review: ReviewToAdd) {
  const index = reviewsToAdd.value.findIndex(
    (rev) => rev.tempId === review.tempId
  )
  if (index === -1) {
    return
  }
  reviewsToAdd.value.splice(index, 1)
}

function editReview(review: ReviewToAdd) {
  const revToUpdate = reviewsToAdd.value.find(
    (rev) => rev.tempId === review.tempId
  )
  if (!revToUpdate) {
    return
  }
  // update the review
  revToUpdate.review.rating = review.review.rating
  revToUpdate.review.review = review.review.review
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-4"></div>
    <div class="col-span-5 space-y-4">
      <div
        class="container relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 py-6 px-4"
      >
        <h2>
          <span class="prose">Game Info</span>
        </h2>
        <GameForm @submit="submit" />
      </div>
      <!-- ################## Reviews ################## -->
      <div
        id="reviews"
        class="container relative mx-auto bg-slate-300 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
      >
        <div class="px-4 pt-2 pb-2 flex justify-between">
          <h2>
            <span class="prose">Reviews</span>
          </h2>
        </div>
        <div class="w-full space-y-4 mb-4">
          <div v-if="reviewsToAdd.length === 0" class="px-4 py-2">
            <p class="text-sm text-neutral-500">No reviews yet.</p>
          </div>
          <GameReview
            v-for="item in reviewsToAdd"
            :key="`rev-${item.tempId}`"
            :rating="item.review.rating"
            :body="item.review.review"
            user-name="You"
            :created-at="new Date().toISOString()"
            :updated-at="new Date().toISOString()"
            @edit-review="
              (changedRev) =>
                editReview({
                  tempId: item.tempId,
                  review: {
                    rating: changedRev.rating,
                    review: changedRev.body,
                  },
                })
            "
            @delete-review="removeReview(item)"
          />
        </div>
        <ReviewForm @create-review="addReview" />
      </div>
    </div>
  </div>
</template>
