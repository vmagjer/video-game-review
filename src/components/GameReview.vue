<script setup lang="ts">
const props = defineProps<{
  rating: number
  title: string
  body: string
  userName: string
  createdAt: string
  updatedAt: string
}>()
</script>

<template>
  <div class="px-4 py-3 space-y-2 bg-white">
    <div class="flex gap-3 items-center">
      <div
        class="font-bold prose-lg"
        :class="{
          'text-green-500': props.rating >= 8,
          'text-yellow-500': rating >= 5 && rating < 8,
          'text-red-500': rating < 5,
        }"
      >
        {{ rating }}
      </div>
      <div class="font-bold">
        {{ title }}
      </div>
    </div>
    <div class="prose">
      {{ body }}
    </div>
    <div class="flex justify-between">
      <div class="prose-sm text-blue-400">
        {{ userName }}
      </div>
      <div class="prose-sm text-neutral-500 text-right">
        Last edited
        <span class="text-neutral-700">{{
          Intl.DateTimeFormat('hr').format(new Date(updatedAt))
        }}</span>
      </div>
    </div>
    <!-- <div class="prose-sm text-neutral-500">Created <span class="text-neutral-800">{{ Intl.DateTimeFormat('hr').format(new Date(review.createdAt)) }}</span></div> -->
  </div>
</template>
