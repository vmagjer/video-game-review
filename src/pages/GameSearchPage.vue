<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { useGenreStore } from '@/stores/genre'
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

const loading = ref(false)
onMounted(async () => {
  loading.value = true
  await gameStore.fetchGames()
  loading.value = false
})

const selectedGenre = ref(-1)
watch(selectedGenre, async (newVal) => {
  loading.value = true
  try {
    if (newVal === -1) {
      await gameStore.fetchGames()
    } else {
      await gameStore.fetchByGenre(newVal)
    }
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
})

const genreStore = useGenreStore()
const loadingGenres = ref(false)
onMounted(async () => {
  loadingGenres.value = true
  await genreStore.fetchGenres()
  loadingGenres.value = false
})

// const query = ref('')
// watch(query, async (newVal) => {
//   loading.value = true
//   try {
//     await gameStore.fetchGames({
//       searchParams: { query: newVal, genres: genres.value },
//     })
//   } catch (error) {
//     alert(error)
//   } finally {
//     loading.value = false
//   }
// })

const gameStore = useGameStore()
</script>

<template>
  <div class="grid grid-cols-12 gap-6 flex-grow">
    <div class="col-span-4 flex justify-end items-start">
      <div
        class="container p-6 space-y-2 relative max-w-xs bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
      >
        <h2 class="prose-sm md:prose">Genre</h2>
        <div v-if="loadingGenres" class="">Loading...</div>
        <select
          v-else
          v-model="selectedGenre"
          class="w-full px-4 py-2 text-black border-yellow-400"
        >
          <option :value="-1">All</option>
          <option
            v-for="genre in genreStore.genres"
            :key="`genre-${genre.id}`"
            :value="genre.id"
          >
            {{ genre.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="col-span-5 space-y-4 flex flex-col">
      <div
        class="container relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
      >
        <input
          placeholder="Search for a game"
          type="text"
          class="w-full px-4 py-2 text-black border-yellow-400"
          disabled
        />
      </div>
      <div
        class="flex-grow container relative mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
      >
        <h2 class="px-4 pt-2 pb-2 text-sm text-neutral-500">
          Results <span v-show="loading">Loading...</span>
        </h2>
        <main>
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="px-4 py-2 text-start">Name</th>
                <th class="px-4 py-2 text-start">Genre</th>
                <th class="px-4 py-2 text-start">Platform</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="game in gameStore.games" :key="`game-${game.id}`">
                <td class="px-4 py-2 align-top">
                  <router-link :to="`/games/${game.id}`">{{
                    game.name
                  }}</router-link>
                </td>

                <td class="px-4 py-2 align-top">
                  <div class="flex gap-1 flex-wrap">
                    <div
                      v-for="genre in game.genres"
                      :key="`gen-${genre.id}`"
                      class="bg-neutral-200 p-1 px-2 rounded-sm text-sm"
                    >
                      {{ genre.name }}
                    </div>
                  </div>
                </td>

                <td class="px-4 py-2 align-top">
                  <div class="flex gap-1 flex-wrap">
                    <div
                      v-for="platform in game.platforms"
                      :key="`plat-${platform.id}`"
                      class="bg-neutral-200 p-1 px-2 rounded-sm text-sm"
                    >
                      {{ platform.name }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
  </div>
</template>
