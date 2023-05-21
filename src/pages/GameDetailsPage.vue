<script setup lang="ts">
import GameReview from '@/components/GameReview.vue'
import { useGameStore } from '@/stores/game'
import { useReviewStore } from '@/stores/review'
import { useHead } from '@vueuse/head'
import ReviewForm from '@/components/ReviewForm.vue'
import type { NewReview } from '@/api/review'

// useRoute, useHead, and HelloWorld are automatically imported. See vite.config.ts for details.
const route = useRoute()
const gameId = computed(() => parseInt(route.params.gameId as string))

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

onMounted(async () => {
  await Promise.all([loadGame(), loadReviews()])
})

const gameStore = useGameStore()
const loading = ref(false)
async function loadGame() {
  loading.value = true
  await gameStore.fetchGame(gameId.value)
  loading.value = false
}

const reviewStore = useReviewStore()
const loadingReviews = ref(false)
async function loadReviews() {
  loadingReviews.value = true
  await reviewStore.fetchReviews({ gameId: gameId.value })
  loadingReviews.value = false
}

function scrollToReviews() {
  const reviews = document.getElementById('reviews')
  if (reviews) {
    reviews.scrollIntoView({ behavior: 'smooth' })
  }
}
function scrollToAddReview() {
  const addReview = document.getElementById('add-review')
  if (addReview) {
    addReview.scrollIntoView({ behavior: 'smooth' })
  }
  const firstInput = document.querySelector('input')
  if (firstInput) {
    firstInput.focus()
  }
}

async function addReview(newReview: Omit<NewReview, 'id' | 'gameId' | 'user'>) {
  await reviewStore.createReview({
    ...newReview,
    id: 0,
    gameId: gameId.value,
    user: {
      id: 0,
      username: 'Anonymous',
      firstName: 'Anonymous',
      email: 'anon@email.com',
    },
  })
}

async function deleteReview(reviewId: number) {
  await reviewStore.deleteReview(reviewId)
}

async function updateReview(
  reviewId: number,
  newReview: Omit<NewReview, 'id' | 'gameId' | 'user'>
) {
  await reviewStore.updateReview({
    ...newReview,
    id: reviewId,
    gameId: gameId.value,
    user: {
      id: 0,
      username: 'Anonymous',
      firstName: 'Anonymous',
      email: 'anon@d.d',
    },
  })
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-4"></div>
    <div class="col-span-5 space-y-4">
      <div
        class="container relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 pb-6"
      >
        <div class="pb-2">
          <img
            src="http://unsplash.it/g/250/100?random&gravity=south"
            alt="placeholder banner"
            class="w-full"
          />
        </div>
        <div class="px-4">
          <h2 class="prose-lg font-bold">
            {{ gameStore.game?.name }}
          </h2>
        </div>
        <div class="px-4 mb-2 hover:cursor-pointer" @click="scrollToReviews">
          <p class="">
            <span class="prose-xl font-bold mr-2">
              {{ gameStore.gameReviewScore }} / 10
            </span>
            <span class="prose-sm font-normal text-neutral-500">
              {{ gameStore.game?.reviews.length }} reviews
            </span>
          </p>
        </div>
        <div class="px-4 mb-3">
          <div class="flex gap-1 flex-wrap">
            <div
              v-for="genre in gameStore.game?.genres"
              :key="genre.id"
              class="bg-neutral-200 p-1 px-2 rounded-sm text-sm"
            >
              {{ genre.name }}
            </div>
          </div>
        </div>
        <div class="px-4">
          <p class="prose">
            {{ gameStore.game?.description }}
          </p>
        </div>
      </div>
      <div
        id="reviews"
        class="container relative mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
      >
        <div class="px-4 pt-2 pb-2 flex justify-between">
          <h2 class="text-sm text-neutral-500">
            Reviews <span v-show="loading">Loading...</span>
          </h2>
          <button
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm dark:bg-blue-800 dark:text-white dark:border-blue-600"
            @click="scrollToAddReview"
          >
            Add Review
          </button>
        </div>
        <div class="w-full space-y-4">
          <GameReview
            v-for="review in reviewStore.reviews"
            :id="review.id"
            :key="`rev-${review.id}`"
            :rating="review.rating"
            :body="review.review"
            :user-name="review.user.username"
            @edit-review="
              (changes) =>
                updateReview(review.id, {
                  rating: changes.rating,
                  review: changes.body,
                })
            "
            @delete-review="() => deleteReview(review.id)"
          />
        </div>
        <ReviewForm @create-review="addReview" />
      </div>
    </div>
  </div>
</template>
