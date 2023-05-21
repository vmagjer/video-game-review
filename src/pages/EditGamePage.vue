<script setup lang="ts">
import GameReview from '@/components/GameReview.vue'
import { useGameStore } from '@/stores/game'
import { useHead } from '@vueuse/head'
import ReviewForm from '@/components/ReviewForm.vue'
import type { Review } from '@/api/review'
import GameForm from '@/components/GameForm.vue'
import type { Genre } from '@/api/genre'
import type { Platform } from '@/api/platform'
import { useReviewStore } from '@/stores/review'

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
const gameForm = ref<typeof GameForm | null>(null)
async function loadGame() {
  loading.value = true
  try {
    await gameStore.fetchGame(gameId.value)
    gameForm.value?.setValues(gameStore.game)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const reviewStore = useReviewStore()

const loadingReviews = ref(false)
async function loadReviews() {
  loadingReviews.value = true
  try {
    await reviewStore.fetchReviews({ gameId: gameId.value })
  } catch (error) {
    console.error(error)
  } finally {
    loadingReviews.value = false
  }
}

// manipulation
const loadingEditGame = ref(false)
async function submit({
  name,
  creatorStudio,
  publishedDate,
  description,
  genres,
  platforms,
}: {
  name: string
  creatorStudio: string
  description: string
  publishedDate: string
  genres: Genre[]
  platforms: Platform[]
}) {
  loadingEditGame.value = true
  try {
    await gameStore.updateGame({
      id: gameId.value,
      name,
      creatorStudio,
      description,
      publishedDate,
      genres,
      platforms,
    })
  } catch (error) {
    console.error(error)
  } finally {
    loadingEditGame.value = false
  }
}

async function addReview(newReview: Omit<Review, 'id' | 'gameId' | 'user'>) {
  await reviewStore.createReview({
    ...newReview,
    gameId: gameId.value,
  })
}

async function deleteReview(reviewId: number) {
  await reviewStore.deleteReview(reviewId)
}

async function updateReview(changedReview: Review) {
  await reviewStore.updateReview(changedReview)
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
        <GameForm ref="gameForm" @submit="submit" />
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
          <div v-if="reviewStore.reviews.length === 0" class="px-4 py-2">
            <p class="text-sm text-neutral-500">No reviews yet.</p>
          </div>
          <GameReview
            v-for="item in reviewStore.reviews"
            :key="`rev-${item.id}`"
            :rating="item.rating"
            :body="item.review"
            user-name="You"
            :created-at="new Date().toISOString()"
            :updated-at="new Date().toISOString()"
            @edit-review="
              (changedRev) =>
                updateReview({
                  rating: changedRev.rating,
                  review: changedRev.body,
                  id: item.id,
                  gameId: item.gameId,
                  user: item.user,
                })
            "
            @delete-review="deleteReview(item.id)"
          />
        </div>
        <ReviewForm
          @create-review="
            (newReview) =>
              addReview({
                rating: newReview.rating,
                review: newReview.body,
              })
          "
        />
      </div>
    </div>
  </div>
</template>
