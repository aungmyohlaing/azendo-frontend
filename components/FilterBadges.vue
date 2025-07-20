<template>
<div v-if="hasActiveFilters" class="mb-4">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="filter in activeFilterBadges"
          :key="filter.key"
          class="filter-badge"
        >
          {{ filter.label }}
          <button
            @click="removeFilter(filter.key)"
            class="filter-remove-btn"
          >
            <svg class="filter-remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
  hasActiveFilters: boolean | string
  activeFilterBadges: { key: string; label: string }[]
}>()

const emit = defineEmits<{
  (e: 'removeFilter', key: string): void
}>()

const removeFilter = (key: string) => {
  emit('removeFilter', key)
}
</script>

<style scoped>
.filter-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background-color: #dbeafe;
  color: #1e40af;
  font-size: 0.875rem;
  border-radius: 9999px;
}

.filter-remove-btn {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.125rem;
  margin-left: 0.25rem;
}

.filter-remove-btn:hover {
  color: #1d4ed8;
}

.filter-remove-icon {
  width: 1rem;
  height: 1rem;
}
</style>