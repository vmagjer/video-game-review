<script setup lang="ts">
import GameReview from '@/components/GameReview.vue'
import PaginatedContainer from '@/components/PaginatedContainer.vue'
import { useGameStore } from '@/stores/game'
import { useReviewStore } from '@/stores/review'
import { useHead } from '@vueuse/head'

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

onMounted(async () => {
  await Promise.all([loadGame(), loadReviews()])
})

const gameStore = useGameStore()
const loading = ref(false)
async function loadGame() {
  loading.value = true
  await gameStore.fetchGame(route.params.gameId as string)
  loading.value = false
}

const reviewStore = useReviewStore()
const loadingReviews = ref(false)
async function loadReviews() {
  loadingReviews.value = true
  await reviewStore.fetchReviews({ gameId: route.params.gameId as string })
  loadingReviews.value = false
}

async function nextPage() {
  loadingReviews.value = true
  try {
    await reviewStore.nextPage({ gameId: route.params.gameId as string })
  } catch (error) {
    alert(error)
  } finally {
    loadingReviews.value = false
  }
}

async function previousPage() {
  loadingReviews.value = true
  try {
    await reviewStore.previousPage({ gameId: route.params.gameId as string })
  } catch (error) {
    alert(error)
  } finally {
    loadingReviews.value = false
  }
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

function addReview() {}
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"
    ></div>
    <div class="min-h-screen">
      <!-- Nav -->
      <div class="h-10 grid grid-cols-12 gap-6 mb-12">
        <div class="col-span-4"></div>
        <div class="col-span-5">
          <div
            class="container px-4 h-full relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
          >
            <h2 class="prose font-bold">VideoGameReview</h2>
          </div>
        </div>
        <div class="col-span-"></div>
      </div>
      <!-- Main -->
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-4"></div>
        <div class="col-span-5 space-y-4">
          <div
            class="container relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 pb-6"
          >
            <div class="pb-2">
              <img :src="gameStore.game?.image" alt="" class="w-full" />
            </div>
            <div class="px-4">
              <h2 class="prose-lg font-bold">
                {{ gameStore.game?.name }}
              </h2>
            </div>
            <div
              class="px-4 mb-2 hover:cursor-pointer"
              @click="scrollToReviews"
            >
              <p class="">
                <span class="prose-xl font-bold mr-2">
                  {{ gameStore.game?.rating }} / 10
                </span>
                <span class="prose-sm font-normal text-neutral-500">
                  {{ gameStore.game?.numReviews }} reviews
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
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                @click="scrollToAddReview"
              >
                Add Review
              </button>
            </div>
            <PaginatedContainer
              :page="reviewStore.page"
              :total-pages="reviewStore.totalPages"
              @next-page="nextPage"
              @previous-page="previousPage"
              class="mb-4"
            >
              <div class="w-full space-y-4">
                <GameReview
                  v-for="review in reviewStore.reviews"
                  :key="`rev-${review.id}`"
                  :rating="review.rating"
                  :title="review.title"
                  :body="review.body"
                  :user-name="review.userName"
                  :created-at="review.createdAt"
                  :updated-at="review.updatedAt"
                />
              </div>
            </PaginatedContainer>
            <form
              id="add-review"
              class="px-4 py-6 space-y-2 bg-slate-100"
              @submit.prevent="addReview"
            >
              <h2>Add your review of {{ gameStore.game?.name }}</h2>
              <div class="flex flex-col space-y-2">
                <label class="text-sm text-neutral-500" for="rating">
                  Rating
                </label>
                <input
                  id="rating"
                  class="w-full"
                  type="number"
                  name="rating"
                  placeholder="1-10"
                />
              </div>
              <div class="flex flex-col space-y-2">
                <label class="text-sm text-neutral-500" for="title">
                  Title
                </label>
                <input
                  id="title"
                  class="w-full"
                  type="text"
                  name="title"
                  placeholder="Review title"
                />
              </div>
              <div class="flex flex-col space-y-2">
                <label class="text-sm text-neutral-500" for="body">Body</label>
                <textarea
                  id="body"
                  class="w-full"
                  name="body"
                  cols="30"
                  rows="10"
                  placeholder="Write your review here"
                ></textarea>
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                >
                  Submit review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Foot -->
    <div class="grid grid-cols-12 gap-6 grid-flow-row mt-12">
      <div class="col-span-4" />
      <div class="col-span-5">
        <div
          class="container relative mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
        >
          <footer class="py-6 text-sm text-center text-gray-700">
            Built by Nikola Dokic & Vlatko Magjer with ❤️
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
