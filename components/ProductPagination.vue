<template>
  <div class="pagination-container">
    <div class="pagination-info">
      Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} products
    </div>
    <div class="pagination-controls">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="btn btn-outline pagination-btn"
        :class="{ 'pagination-btn-disabled': currentPage === 1 }"
      >
        Previous
      </button>
      <div class="pagination-pages">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          class="pagination-page-btn"
          :class="{ 'pagination-page-active': page === currentPage }"
        >
          {{ page }}
        </button>
      </div>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="btn btn-outline pagination-btn"
        :class="{ 'pagination-btn-disabled': currentPage === totalPages }"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  totalPages: number
}

interface Emits {
  (e: 'page-change', page: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Computed properties
const startItem = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(props.totalPages, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const goToPage = (page: number) => {
  emit('page-change', page)
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1)
  }
}

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
  }
}
</script>

<style scoped>
/* ========================================
   PAGINATION
   ======================================== */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 2rem; */
  /* padding-top: 1rem; */
  /* border-top: 1px solid var(--border-color); */
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--text-light);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  min-width: 80px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.pagination-btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--border-color);
  color: var(--text-light);
  border-color: var(--border-color);
}

.pagination-pages {
  display: flex;
  gap: 0.25rem;
}

.pagination-page-btn {
  padding: 0.5rem 1rem;
  min-width: 40px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  background-color: var(--border-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.pagination-page-btn:hover:not(.pagination-page-active) {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.pagination-page-active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Mobile responsive adjustments */
@media (max-width: 639px) {
  .pagination-container {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .pagination-controls {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .pagination-pages {
    order: 2;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
  
  .pagination-btn {
    min-width: 60px;
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .pagination-page-btn {
    min-width: 35px;
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .pagination-info {
    text-align: center;
    order: 1;
  }
}
</style> 