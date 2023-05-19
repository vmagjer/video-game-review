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

const genres = ref<string[]>([])
function handleGenreChange(genreIds: string[]) {
  console.log('handleGenreChange', genreIds)
  genres.value = genreIds
}

const query = ref('')
watch(query, (newVal, oldVal) => {
  console.log('query changed', newVal, oldVal)
})

const gameStore = useGameStore()
async function nextPage() {
  await gameStore.nextPage({ searchParams: { query: query.value, genres: genres.value } })
}
async function previousPage() {
  await gameStore.previousPage({ searchParams: { query: query.value, genres: genres.value } })
}
</script>

<template>
  <div class="relative py-8">
    <div
      class="absolute inset-0 bg-[url(/img/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>
    <div class="min-h-screen">
      <div class="h-10 grid grid-cols-12 gap-6">
        <div class="col-span-4"></div>
        <div class="col-span-4 bg-red-200">nav</div>
        <div class="col-span-4"></div>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-4 flex justify-end">
          <div
            class="container p-6 space-y-2 relative max-w-xs bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
          >
            <h2 class="prose-sm md:prose">Filters</h2>
            <FiltersInput
              @selected-genres-changed="handleGenreChange"
              class=""
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
            <h2 class="px-4 pt-6 prose-sm md:px-6 md:prose">Results</h2>
            <main>
              <PaginatedContainer
                :page="gameStore.page"
                :total-pages="gameStore.totalPages"
                @next-page="nextPage"
                @previous-page="previousPage"
                >
                asdasda
              </PaginatedContainer>

            </main>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6 grid-flow-row">
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
