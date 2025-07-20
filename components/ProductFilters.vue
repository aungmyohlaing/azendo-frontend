<template>
  <div class="card mb-4">
    <div class="card-header flex justify-between items-center">
      <h2>Filters</h2>
      <div class="flex items-center justify-between">                  
        <button @click="filtersOpen = !filtersOpen" class="btn btn-outline btn-sm">
          {{ filtersOpen ? 'Hide' : 'Show' }} Filters
        </button>
      </div>
    </div>
    <transition name="fade">
      <div v-if="filtersOpen" class="card-body">
        <div class="text-right mb-2">
          <NuxtLink to="#" @click="clearAllFilters" >
            Reset Filters
          </NuxtLink>
        </div>       
        <div class="grid grid-cols-2 gap-3"> 
          <div class="grid grid-cols-2 gap-2">
            <!-- Category Filter -->
            <div class="filter-section">
              <label class="filter-label">
                <svg class="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Category
              </label>
              <select
                v-model="localFilters.category"
                @change="emitFilters"
                class="filter-select"
              >
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.slug" :value="category.slug">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Price Range Filter -->
            <div class="filter-section">
              <label class="filter-label">
                <svg class="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Price Range
              </label>
              <div class="price-slider-range">
                <div class="slider-labels">
                  <span>${{ localFilters.minPrice ?? 0 }}</span>
                  <span>${{ Math.round(computedMaxPrice) ?? 0 }}</span>
                </div>
                <div class="slider-controls">
                  <input
                    type="range"                              
                    step="1"
                    v-model.number="localFilters.minPrice"
                    @input="onSliderInput"
                    min="0"
                    :max="computedMaxPrice"
                  />
                </div>
              </div>
            </div>

            <!-- Rating Filter -->
            <div class="filter-section">
              <label class="filter-label">
                <svg class="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Minimum Rating
              </label>
              <select
                v-model="localFilters.minRating"
                @change="emitFilters"
                class="filter-select"
              >
                <option value="">Any Rating</option>
                <option v-for="option in ratingOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- Sort Options -->
            <div class="filter-section">
              <label class="filter-label">
                <svg class="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Sort By
              </label>
              <select
                v-model="localSortBy"
                @change="emitFilters"
                class="filter-select"
              >
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>           
          </div>

          <div class="flex flex-column">
            <!-- Brand Filter -->
            <div class="filter-section">
              <label class="filter-label">
                <svg class="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Brand
              </label>
              <template v-if="availableBrands.length > 0">              
              <div class="brand-filters">
                <label
                  v-for="brand in availableBrands"
                  :key="brand"
                  class="brand-checkbox"
                >
                  <input
                    type="checkbox"
                    :value="brand"
                    v-model="localFilters.brands"
                    @change="emitFilters"
                    class="brand-input"
                  />
                  <span class="brand-label">{{ brand }}</span>
                </label>
              </div>
              </template>
              <template v-else>
              <div class="brand-empty-text">
                <p>No brands found</p>
              </div>
              </template>
            </div>
          </div>
        </div>  
        </div>
      </transition>
    </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types'
import { SORT_OPTIONS, RATING_OPTIONS } from '~/constants'

interface Props {
  categories: Category[]
  availableBrands: string[]
  filters: {
    category: string
    minPrice: number
    maxPrice: number
    brands: string[]
    minRating: string
  }
  sortBy: string
  computedMaxPrice: number
}

interface Emits {
  (e: 'update:filters', filters: Props['filters']): void
  (e: 'update:sortBy', sortBy: string): void
  (e: 'clearAll'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Local reactive state for filters
const filtersOpen = ref(true)
const localFilters = reactive({ ...props.filters })
const localSortBy = ref(props.sortBy)
const sortOptions = SORT_OPTIONS
const ratingOptions = RATING_OPTIONS

// Watch for prop changes and update local state
watch(() => props.filters, (newFilters) => {
  Object.assign(localFilters, newFilters)
}, { deep: true })

watch(() => props.sortBy, (newSortBy) => {
  localSortBy.value = newSortBy
})

// Emit filter changes
const emitFilters = () => {
  emit('update:filters', { ...localFilters })
  emit('update:sortBy', localSortBy.value)
}

const onSliderInput = () => {
  if (localFilters?.minPrice !== undefined && localFilters?.maxPrice !== undefined && localFilters?.minPrice > localFilters?.maxPrice) {   
    [localFilters.minPrice, localFilters.maxPrice] = [localFilters.maxPrice, localFilters.minPrice]
  }
  emitFilters()
}

const clearAllFilters = () => {
  emit('clearAll')
}
</script>

<style scoped>
/* ========================================
   FILTERS SECTION
   ======================================== */
.filter-section {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.25rem;
  transition: all 0.2s ease;
}

.filter-section:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-icon {
  width: 1.125rem;
  height: 1.125rem;
  color: var(--primary-color);
}

.filter-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  background-color: white;
  transition: all 0.2s ease;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.filter-select:hover {
  border-color: var(--primary-color);
}

.price-slider-range {
  padding: 0.5rem 0;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.slider-controls {
  display: flex;
  gap: 0.5rem;
}

input[type='range'] {
  flex: 1;
  accent-color: var(--primary-color);
  height: 2px;
}

.brand-filters {
  max-height: 15rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.brand-filters::-webkit-scrollbar {
  width: 6px;
}

.brand-filters::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.brand-filters::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.brand-filters::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.brand-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: background-color 0.2s ease;
}

.brand-checkbox:hover {
  background-color: #f0f0f0;
}

.brand-input {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 0.25rem;
  border: 2px solid var(--border-color);
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
}

.brand-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.brand-input:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

.brand-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.brand-label {
  font-size: 0.875rem;
  color: var(--text-color);
  font-weight: 500;
  flex: 1;
  word-break: break-word;
}

.brand-empty-text {
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-light);  
  flex: 1;
  word-break: break-word;
  margin-top: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Mobile responsive adjustments */
@media (max-width: 639px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  .filter-section {
    padding: 1rem;
  }
  
  .filter-label {
    font-size: 0.8rem;
  }
  
  .filter-select {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
  
  .brand-filters {
    max-height: 10rem;
  }
}
</style> 