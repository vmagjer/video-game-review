<script setup lang="ts">
import FiltersInput from '@/components/FiltersInput.vue'
import PaginatedContainer from '@/components/PaginatedContainer.vue'
import { useGameStore } from '@/stores/game'
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
  await gameStore.fetchGames({
    searchParams: { query: query.value, genres: genres.value },
  })
})

const genres = ref<string[]>([])
async function handleGenreChange(genreIds: string[]) {
  genres.value = genreIds
  await gameStore.fetchGames({
    searchParams: { query: query.value, genres: genreIds },
  })
}

const query = ref('')
watch(query, async (newVal) => {
  await gameStore.fetchGames({
    searchParams: { query: newVal, genres: genres.value },
  })
})

const gameStore = useGameStore()
async function nextPage() {
  await gameStore.nextPage({
    searchParams: { query: query.value, genres: genres.value },
  })
}
async function previousPage() {
  await gameStore.previousPage({
    searchParams: { query: query.value, genres: genres.value },
  })
}
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"
    ></div>
    <div class="min-h-screen">
      <div class="h-10 grid grid-cols-12 gap-6 mb-12">
        <div class="col-span-3"></div>
        <div class="col-span-6">
          <div
            class="container px-4 h-full relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
          >
            <h2 class="prose-sm md:prose font-bold">VideoGameReview</h2>
          </div>
        </div>
        <div class="col-span-"></div>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-4 flex justify-end">
          <div
            class="container p-6 space-y-2 relative max-w-xs bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
          >
            <h2 class="prose-sm md:prose">Filters</h2>
            <FiltersInput
              class=""
              @selected-genres-changed="handleGenreChange"
            />
          </div>
        </div>
        <div class="col-span-4 space-y-4">
          <div
            class="container relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
          >
            <input
              v-model="query"
              placeholder="Search for a game"
              type="text"
              class="w-full px-4 py-2 text-black border-yellow-400"
            />
          </div>
          <div
            class="container relative max-w-2xl mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
          >
            <h2 class="px-4 pt-2 pb-2 text-sm text-neutral-500">Results</h2>
            <main>
              <PaginatedContainer
                :page="gameStore.page"
                :total-pages="gameStore.totalPages"
                @next-page="nextPage"
                @previous-page="previousPage"
              >
                <table class="table-auto w-full">
                  <thead>
                    <tr>
                      <th class="px-4 py-2 text-start">Name</th>
                      <th class="px-4 py-2 text-start">Genres</th>
                      <th class="px-4 py-2 text-end">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="game in gameStore.games" :key="game.id">
                      <td class="px-4 py-2">
                        <router-link :to="`/games/${game.id}`">{{
                          game.name
                        }}</router-link>
                      </td>
                      <td class="px-4 py-2 flex gap-1 flex-wrap">
                        <div
                          v-for="genre in game.genres"
                          :key="genre.id"
                          class="bg-neutral-200 p-1 px-2 rounded-sm"
                        >
                          {{ genre.name }}
                        </div>
                      </td>
                      <td class="px-4 py-2">{{ game.rating }}</td>
                    </tr>
                  </tbody>
                </table>
              </PaginatedContainer>
            </main>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6 grid-flow-row">
      <div class="col-span-4" />
      <div class="col-span-4">
        <div
          class="container relative max-w-2xl mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
        >
          <footer class="py-6 text-sm text-center text-gray-700">
            Built by Nikola Dokic & Vlatko Magjer with ❤️
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
