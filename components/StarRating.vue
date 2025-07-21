<template>
  <div class="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
    <button
      v-for="star in maxStars"
      :key="star"
      type="button"
      :aria-checked="modelValue === star"
      :aria-label="`${star} star${star > 1 ? 's' : ''}`"
      :tabindex="0"
      class="star-btn"
      @click="setRating(star)"
      @keydown.enter.prevent="setRating(star)"
      @keydown.space.prevent="setRating(star)"
    >
      <svg
        :class="['star-icon', modelValue >= star ? 'star-filled' : 'star-outline']"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <template v-if="modelValue >= star">
          <!-- Filled star -->
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.995a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.995c.3.922-.755 1.688-1.538 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.784.57-1.838-.197-1.538-1.118l1.286-3.995a1 1 0 00-.364-1.118L2.227 9.422c-.784-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.286-3.995z"
          />
        </template>
        <template v-else>
          <!-- Outlined star -->
          <path
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.995a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.404 2.473a1 1 0 00-.364 1.118l1.286 3.995c.3.922-.755 1.688-1.538 1.118l-3.404-2.473a1 1 0 00-1.176 0l-3.404 2.473c-.784.57-1.838-.197-1.538-1.118l1.286-3.995a1 1 0 00-.364-1.118L2.227 9.422c-.784-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.286-3.995z"
          />
        </template>
      </svg>
    </button>
    & Up
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
})
const emit = defineEmits(['update:modelValue'])

function setRating(star: number) {
  if (props.modelValue === star) {
    emit('update:modelValue', 0) // allow deselect
  } else {
    emit('update:modelValue', star)
  }
}
</script> 

<style scoped>
.star-icon {
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.2s;
}
.star-filled {
  color: gold;
}
.star-outline {
  color: #ccc;
}
.star-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
}
</style>