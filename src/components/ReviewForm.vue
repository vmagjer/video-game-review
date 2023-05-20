<script setup lang="ts">
import type { NewReview } from '@/api/review'
import { useVuelidate } from '@vuelidate/core'
import { required, between, maxLength } from '@vuelidate/validators'

const emit = defineEmits(['createReview'])

const rating = ref('')
const title = ref('')
const body = ref('')

const rules = computed(() => {
  return {
    rating: {
      required,
      between: between(1, 10),
    },
    title: {
      required,
    },
    body: {
      required,
      maxLength: maxLength(500),
    },
  }
})

const v$ = useVuelidate(rules, { rating, title, body })

function submit() {
  const isValid = v$.value.$validate()
  if (!isValid) {
    return
  }
  emit('createReview', {
    rating: parseInt(rating.value),
    title: title.value,
    body: body.value,
  })
}

function setValues(review: NewReview) {
  rating.value = review.rating.toString()
  title.value = review.title
  body.value = review.body
}

defineExpose({
  setValues,
})
</script>

<template>
  <form
    id="add-review"
    class="px-4 py-6 space-y-2 bg-slate-100"
    @submit.prevent="submit"
  >
    <div class="flex flex-col space-y-2">
      <label class="text-sm text-neutral-500" for="rating"> Rating </label>
      <select
        id="rating"
        v-model="v$.rating.$model"
        class="w-full"
        name="rating"
      >
        <option value="">Select a rating</option>
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
      <div class="text-red-700 prose-sm">
        <div v-for="error in v$.rating.$errors" :key="error.$uid">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <label class="text-sm text-neutral-500" for="title"> Title </label>
      <input
        id="title"
        v-model="v$.title.$model"
        class="w-full"
        type="text"
        name="title"
        placeholder="Review title"
      />
      <div class="text-red-700 prose-sm">
        <div v-for="error in v$.title.$errors" :key="error.$uid">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <label class="text-sm text-neutral-500" for="body">Body</label>
      <textarea
        id="body"
        v-model="body"
        class="w-full"
        name="body"
        cols="30"
        rows="10"
        placeholder="Write your review here"
      ></textarea>
      <div class="text-red-700 prose-sm">
        <div v-for="error in v$.body.$errors" :key="error.$uid">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
      >
        Submit review
      </button>
    </div>
  </form>
</template>
