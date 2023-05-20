<script setup lang="ts">
const links = [
  { name: 'Search Games', path: '/' },
  { name: 'Create Game', path: '/games/create' },
]
</script>

<template>
  <div class="relative">
    <div
      class="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"
    ></div>
    <div class="min-h-screen flex flex-col">
      <div class="h-10 grid grid-cols-12 gap-6 mb-12">
        <div class="col-span-4"></div>
        <div class="col-span-5">
          <div
            class="container flex items-center gap-4 px-4 h-full relative bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5"
          >
            <div>
              <h2 class="prose-sm md:prose font-bold">VGR</h2>
            </div>
            <div class="flex gap-2">
              <router-link
                v-for="link in links"
                :key="link.path"
                :to="link.path"
                class="text-sm text-blue-500 hover:text-blue-600 px-2 py-1"
                exact-active-class="border-b-2 border-blue-500"
              >
                {{ link.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-span-"></div>
      </div>
      <div class="flex-grow">
        <router-view />
      </div>
    </div>
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
