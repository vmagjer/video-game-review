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

const loading = ref(false)
onMounted(async () => {
  loading.value = true
  await gameStore.fetchGames({
    searchParams: { query: query.value, genres: genres.value },
  })
  loading.value = false
})

const genres = ref<string[]>([])
async function handleGenreChange(genreIds: string[]) {
  loading.value = true
  try {
    genres.value = genreIds
    await gameStore.fetchGames({
      searchParams: { query: query.value, genres: genreIds },
    })
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}

const query = ref('')
watch(query, async (newVal) => {
  loading.value = true
  try {
    await gameStore.fetchGames({
      searchParams: { query: newVal, genres: genres.value },
    })
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
})

const gameStore = useGameStore()
async function nextPage() {
  loading.value = true
  try {
    await gameStore.nextPage({
      searchParams: { query: query.value, genres: genres.value },
    })
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
async function previousPage() {
  loading.value = true
  try {
    await gameStore.previousPage({
      searchParams: { query: query.value, genres: genres.value },
    })
  } catch (error) {
    alert(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6 flex-grow">
    <div class="col-span-4 flex justify-end items-start">
      <div
        class="container p-6 space-y-2 relative max-w-xs bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
      >
        <h2 class="prose-sm md:prose">Genre</h2>
        <FiltersInput
          class=""
          @selected-genres-changed="handleGenreChange"
        />
      </div>
    </div>

    <div class="col-span-5 space-y-4 flex flex-col">
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
        class="flex-grow container relative mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
      >
        <h2 class="px-4 pt-2 pb-2 text-sm text-neutral-500">
          Results <span v-show="loading">Loading...</span>
        </h2>
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
                  <th class="px-4 py-2 text-start">Image</th>
                  <th class="px-4 py-2 text-start">Title</th>
                  <th class="px-4 py-2 text-start">Genre</th>
                  <th class="px-4 py-2 text-end">Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="game in gameStore.games" :key="game.id">
                  <td class="px-4 py-2 align-top">
                    <router-link :to="`/games/${game.id}`">
                      <img
                        :src="game.image"
                        :alt="game.name"
                        class="w-40 object-cover rounded-sm"
                      />
                    </router-link>
                  </td>
                  <td class="px-4 py-2 align-top">
                    <router-link :to="`/games/${game.id}`">{{
                      game.name
                    }}</router-link>
                  </td>
                  <td class="px-4 py-2 flex gap-1 flex-wrap align-top">
                    <div
                      v-for="genre in game.genres"
                      :key="genre.id"
                      class="bg-neutral-200 p-1 px-2 rounded-sm text-sm"
                    >
                      {{ genre.name }}
                    </div>
                  </td>
                  <td class="px-4 py-2 align-top text-right">
                    <!-- <div class="flex flex-nowrap">
                      <div
                        v-for="i in 5"
                        :key="i"
                        :class="[
                          i <= game.rating ? 'grayscale-0' : 'grayscale',
                        ]"
                      >
                        ⭐
                      </div>
                    </div> -->
                    {{ game.rating }}
                  </td>
                </tr>
              </tbody>
            </table>
          </PaginatedContainer>
        </main>
      </div>
    </div>
  </div>
</template>
