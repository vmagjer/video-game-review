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
  console.log('remove review', review)
  const index = reviewsToAdd.value.findIndex(
    (rev) => rev.tempId === review.tempId
  )
  if (index === -1) {
    return
  }
  reviewsToAdd.value.splice(index, 1)
}

function editReview(review: ReviewToAdd) {
  console.log('edit review', review)

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
        <GameForm @submit="submit" />
      </div>
      <!-- <form
        class="container relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 py-6 px-4"
        @submit.prevent
      >
        <h2>
          <span class="prose">Game Info</span>
        </h2>
        <div class="flex flex-col space-y-2">
          <label class="text-sm text-neutral-500" for="title"> Title </label>
          <input
            id="title"
            v-model="v$.name.$model"
            class="w-full"
            type="text"
            name="title"
            placeholder="Review title"
          />
          <div class="text-red-700 prose-sm">
            <div v-for="error in v$.name.$errors" :key="error.$uid">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-2">
          <label class="text-sm text-neutral-500" for="genre"> Genre </label>
          <div v-if="loadingGenres">Loading...</div>
          <select
            v-else
            id="genre"
            v-model="v$.genres.$model"
            multiple
            class="w-full"
            name="genre"
          >
            <option
              v-for="genre in genreStore.genres"
              :key="`genre-${genre.id}`"
              :value="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
          <div class="text-red-700 prose-sm">
            <div v-for="error in v$.genres.$errors" :key="error.$uid">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-2">
          <label class="text-sm text-neutral-500" for="body">Description</label>
          <textarea
            id="body"
            v-model="description"
            class="w-full"
            name="body"
            cols="30"
            rows="10"
            placeholder="Write your review here"
          ></textarea>
          <div class="text-red-700 prose-sm">
            <div v-for="error in v$.description.$errors" :key="error.$uid">
              {{ error.$message }}
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
            @click="submit"
          >
            Create game
          </button>
        </div>
      </form> -->
      <!-- ################## Reviews ################## -->
      <div
        id="reviews"
        class="container relative mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
      >
        <div class="px-4 pt-2 pb-2 flex justify-between">
          <h2 class="text-sm text-neutral-500">Reviews</h2>
        </div>
        <div class="w-full space-y-4">
          <div v-if="reviewsToAdd.length === 0" class="px-4 py-2">
            <p class="text-sm text-neutral-500">No reviews yet.</p>
          </div>
          <GameReview
            v-for="item in reviewsToAdd"
            :id="item.tempId"
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
