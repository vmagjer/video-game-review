<!-- paginated container -->
<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits(['nextPage', 'previousPage'])

function nextPage() {
  emit('nextPage')
}

function previousPage() {
  emit('previousPage')
}
</script>

<template>
  <div class="">
    <div class="">
      <slot></slot>
    </div>
    <div class="flex justify-end mt-4 gap-1 p-2">
      <div
        class="flex items-center text-sm text-gray-700 dark:text-gray-300 mr-2"
      >
        Page {{ page }} of {{ totalPages }}
      </div>
      <button
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
        :disabled="props.page === 1"
        @click="previousPage"
      >
        Previous
      </button>
      <button
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
        :disabled="page === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>
