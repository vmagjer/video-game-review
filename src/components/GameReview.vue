<script setup lang="ts">
const props = defineProps<{
  rating: number
  title: string
  body: string
  userName: string
  createdAt: string
  updatedAt: string
}>()
const emit = defineEmits(['editReview', 'deleteReview'])

const showForm = ref(false)
const _rating = ref(props.rating)
const _title = ref(props.title)
const _body = ref(props.body)

function edit() {
  _rating.value = props.rating
  _title.value = props.title
  _body.value = props.body
  showForm.value = true
}

function confirmEdit() {
  emit('editReview', {
    rating: _rating.value,
    title: _title.value,
    body: _body.value,
  })
  showForm.value = false
}

function cancelEdit() {
  showForm.value = false
}
</script>

<template>
  <div v-if="!showForm" class="px-4 py-3 space-y-2 bg-white">
    <div class="flex gap-3 items-center justify-between">
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
      <div class="">
        <button
          class="px-4 py-2 text-sm font-medium text-blue-700 "
          @click="edit"
        >
          Edit
        </button>
        <button
          class="px-4 py-2 text-sm font-medium text-red-700 "
          @click="emit('deleteReview')"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="prose">
      {{ body }}
    </div>
    <div class="flex justify-between">
      <div class="prose-sm text-yellow-800">
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
  <div v-else class="px-4 py-3 space-y-2 bg-white">
    <div class="flex gap-3 items-center justify-between">
      <div class="flex gap-3 items-center">
        <div
          class="font-bold prose-lg"
          :class="{
            'text-green-500': props.rating >= 8,
            'text-yellow-500': rating >= 5 && rating < 8,
            'text-red-500': rating < 5,
          }"
        >
          <select
            v-model="_rating"
            class="w-16"
            :class="{
              'text-green-500': _rating >= 8,
              'text-yellow-500': _rating >= 5 && _rating < 8,
              'text-red-500': _rating < 5,
            }"
          >
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <div class="font-bold">
          <input
            v-model="_title"
            class="w-full"
            type="text"
            placeholder="Title"
          />
        </div>
      </div>
      <div class="">
        <button
          class="px-4 py-2 text-sm font-medium text-blue-700 "
          @click="confirmEdit"
        >
          Confirm
        </button>
        <button
          class="px-4 py-2 text-sm font-medium text-red-700 "
          @click="cancelEdit"
        >
          Cancel
        </button>
      </div>
    </div>
    <div class="prose">
      <textarea
        v-model="_body"
        class="w-full"
        placeholder="Body"
      ></textarea>
    </div>
    <div class="flex justify-between">
      <div class="prose-sm text-yellow-800">
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
