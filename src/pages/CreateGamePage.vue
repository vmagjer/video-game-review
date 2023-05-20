<script setup lang="ts">
import GameReview from '@/components/GameReview.vue'
import { useGameStore } from '@/stores/game'
import { useHead } from '@vueuse/head'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import ReviewForm from '@/components/ReviewForm.vue'
import { useReviewStore } from '@/stores/review'
import { useGenreStore } from '@/stores/genre'

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

onMounted(fetchGenres)

const genreStore = useGenreStore()
const loadingGenres = ref(false)
async function fetchGenres() {
  loadingGenres.value = true
  await genreStore.fetchGenres()
  loadingGenres.value = false
}

const gameStore = useGameStore()
const name = ref('')
const description = ref('')
const genres = ref<number[]>([])

// validation
const rules = {
  name: {
    required,
    maxLength: maxLength(100),
  },
  description: {
    required,
    maxLength: maxLength(1000),
  },
  genres: {
    required,
  },
}
const v$ = useVuelidate(rules, { name, description, genres })

// manipulation
const reviewStore = useReviewStore()
async function submit() {
  console.log('create game', {
    name: name.value,
    description: description.value,
    genres: genres.value,
    reviewsToAdd: reviewsToAdd.value,
  })

  const isValid = await v$.value.$validate()
  if (!isValid) {
    return
  }

  const game = await gameStore.createGame({
    name: name.value,
    description: description.value,
    genres: genreStore.genres.filter((genre) =>
      genres.value.includes(genre.id)
    ),
  })
  console.log('game created', game)

  await Promise.all(
    reviewsToAdd.value.map((review) =>
      reviewStore.createReview({
        rating: review.rating,
        title: review.title,
        body: review.body,
        gameId: game.id,
        userId: 1,
        userName: 'John Doe',
      })
    )
  )
  console.log('reviews created')
}

type ReviewToAdd = {
  tempId: number
  rating: number
  title: string
  body: string
}
const reviewsToAdd = ref<ReviewToAdd[]>([])

function addReview({ rating, title, body }: ReviewToAdd) {
  reviewsToAdd.value.push({
    tempId: Date.now(),
    rating: rating,
    title: title,
    body: body,
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
  revToUpdate.rating = review.rating
  revToUpdate.title = review.title
  revToUpdate.body = review.body
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-4"></div>
    <div class="col-span-5 space-y-4">
      <form
        class="container relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 py-6 px-4"
        @submit.prevent="submit"
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
            type="submit"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
          >
            Create game
          </button>
        </div>
      </form>
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
            v-for="review in reviewsToAdd"
            :key="`rev-${review.title}`"
            :rating="review.rating"
            :title="review.title"
            :body="review.body"
            user-name="You"
            :created-at="new Date().toISOString()"
            :updated-at="new Date().toISOString()"
            @edit-review="
              (changedRev) =>
                editReview({ ...changedRev, tempId: review.tempId })
            "
            @delete-review="removeReview(review)"
          />
        </div>
        <ReviewForm ref="reviewForm" @create-review="addReview" />
      </div>
    </div>
  </div>
</template>
