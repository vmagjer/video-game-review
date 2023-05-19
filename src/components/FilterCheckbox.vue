<!-- <template>
  <label
    :for="id"
    class="flex items-center px-3 py-2 text-black rounded-md whitespace-nowrap hover:bg-primary-92"
    :class="wrapperClass"
  >
    <input
      v-bind="$attrs"
      type="checkbox"
      :id="id"
      :checked="checked"
      @input="handleClick"
      class="w-0 h-0 opacity-0"
    />
    <span
      class="mr-3 unchecked material-symbols-outlined text-neutral-60"
      :class="{ hidden: checked }"
    >
      radio_button_unchecked
    </span>
    <span
      class="mr-3 checked material-symbols-outlined text-green-500"
      :class="{ hidden: !checked }"
      style="font-variation-settings: 'FILL' 1"
    >
      check_circle
    </span>
    <slot></slot>
  </label>
</template> -->
<template>
  <div class="flex items-center mb-4">
    <input
      :id="id"
      type="checkbox"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      :checked="checked"
      @input="handleClick"
    />
    <label
      :for="id"
      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  checked: boolean
  wrapperClass?: string
  id?: string
}>()

const emit = defineEmits(['toggle'])

function handleClick() {
  emit('toggle', !props.checked)
}
</script>

<style>
label:hover {
  cursor: pointer;
}
label:hover .unchecked {
  @apply text-green-500;
}
</style>
