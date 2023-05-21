<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import { useGenreStore } from '@/stores/genre'
import { usePlatformStore } from '@/stores/platform'
import type { Genre } from '@/api/genre'
import type { Platform } from '@/api/platform'

onMounted( async () => {
  Promise.all([fetchGenres(), fetchPlatforms()])
})

const genreStore = useGenreStore()
const loadingGenres = ref(false)
async function fetchGenres() {
  loadingGenres.value = true
  await genreStore.fetchGenres()
  loadingGenres.value = false
}

const platformStore = usePlatformStore()
const loadingPlatforms = ref(false)
async function fetchPlatforms() {
  loadingPlatforms.value = true
  await platformStore.fetchPlatforms()
  loadingPlatforms.value = false
}

const name = ref('')
const creatorStudio = ref('')
const description = ref('')
const genres = ref<number[]>([])
const platforms = ref<number[]>([])

// validation
const rules = {
  name: {
    required,
    maxLength: maxLength(100),
  },
  creatorStudio: {
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
  platforms: {
    required,
  },
}
const v$ = useVuelidate(rules, { name, creatorStudio, description, genres, platforms })

const emit = defineEmits<{
  (
    e: 'submit',
    value: {
      name: string
      creatorStudio: string
      description: string
      genres: Genre[]
      platforms: Platform[]
    }
  ): void
}>()
// manipulation
async function submit() {
  console.log('create game', {
    name: name.value,
    creatorStudio: creatorStudio.value,
    description: description.value,
    genres: genres.value,
  })

  const isValid = await v$.value.$validate()
  if (!isValid) {
    return
  }
  emit('submit', {
    name: name.value,
    creatorStudio: creatorStudio.value,
    description: description.value,
    genres: genres.value.map((id) => genreStore.genres.find((genre) => genre.id === id)!),
    platforms: platforms.value.map((id) => platformStore.platforms.find((plat) => plat.id === id)!),
  })
}
</script>

<template>
  <form class="" @submit.prevent>
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
      <label class="text-sm text-neutral-500" for="platform"> Platform </label>
      <div v-if="loadingPlatforms">Loading...</div>
      <select
        v-else
        id="platform"
        v-model="v$.platforms.$model"
        multiple
        class="w-full"
        name="platform"
      >
        <option
          v-for="platform in platformStore.platforms"
          :key="`platform-${platform.id}`"
          :value="platform.id"
        >
          {{ platform.name }}
        </option>
      </select>
      <div class="text-red-700 prose-sm">
        <div v-for="error in v$.platforms.$errors" :key="error.$uid">
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
  </form>
</template>
