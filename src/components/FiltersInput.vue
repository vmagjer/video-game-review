<script setup lang="ts">
import { useGenreStore } from '@/stores/genre'
import FilterCheckbox from './FilterCheckbox.vue'

const emit = defineEmits(['selectedGenresChanged'])

export type Option = {
  name: string
  value: string
}
const genreStore = useGenreStore()

const genres = ref<Option[]>([])
const loading = ref(false)
onBeforeMount(async () => {
  loading.value = true
  await genreStore.fetchGenres()
  genres.value = genreStore.genres.map((genre) => ({
    name: genre.name,
    value: genre.id.toString(),
  }))
  loading.value = false
})
const selectedGenres = ref<string[]>([])

function toggleGenre(genreId: string) {
  if (selectedGenres.value.includes(genreId)) {
    selectedGenres.value = selectedGenres.value.filter(
      (genre) => genre !== genreId
    )
  } else {
    selectedGenres.value.push(genreId)
  }  
  emit('selectedGenresChanged', selectedGenres.value)
}

</script>

<template>
  <div class="">
    <div v-if="loading">Loading...</div>
    <template v-else>
      <FilterCheckbox
        v-for="option in genres"
        :key="option.value"
        :id="option.value"
        :checked="selectedGenres.includes(option.value)"
        @toggle="toggleGenre(option.value)"
      >
        {{ option.name }}
      </FilterCheckbox>
    </template>
  </div>
</template>
