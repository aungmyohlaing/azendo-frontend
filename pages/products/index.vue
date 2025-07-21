<template>
  <div class="container">
    <!-- Page Header -->
    <div class="mb-4">
      <h1 class="mb-2">Product Catalog</h1>
      <p class="text-muted">Discover our amazing collection of products</p>
    </div>

    <!-- ======================================== Search and View Toggle ======================================== -->
     <!-- NOTE: Search and View Toggle -->
    <div class="flex items-center mb-4 gap-3">
      <!-- Search Bar -->
      <div class="flex-grow-1 w-full">
        <!-- <div class="search-input-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="form-input search-input w-full"
            @input="debounceApplyFilters"
          />
          <div class="search-icon">
            <svg class="search-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="clear-search-btn"
          >
            <svg class="clear-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> -->
        <SearchBar :products="productStore.products" />
      </div>

      <!-- View Toggle -->
      <div class="flex gap-1 toggle-container">
        <button
          @click="viewMode = 'grid'"          
          :class="[
            'btn btn-outline p-1 h-40',
            viewMode === 'grid' ? 'view-btn-active' : ''
          ]"
        >
          <svg class="view-svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
          </svg>
        </button>
        <button
          @click="viewMode = 'list'"          
          :class="[
            'btn btn-outline p-1 h-40',
            viewMode === 'list' ? 'view-btn-active' : ''
          ]"
        >
          <svg class="view-svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ======================================== Filters Section ======================================== -->
    <ProductFilters
      :categories="categoryStore.categories"
      :available-brands="productStore.availableBrands"
      :filters="productStore.filters"
      :sort-by="productStore.sortBy"
      :computed-max-price="computedMaxPrice"
      @update:filters="updateFilters"
      @update:sort-by="updateSortBy"
      @clear-all="clearAllFilters"
    />

    <!-- ======================================== Active Filters ======================================== -->
     <!-- NOTE: Active Filters -->
    <FilterBadges
      :has-active-filters="hasActiveFilters"
      :active-filter-badges="activeFilterBadges"
      @remove-filter="removeFilter"
    />

    <!-- ======================================== Loading State ======================================== -->
     <!-- NOTE: Loading State -->
    <Loading v-if="productStore.isLoading" message="Loading products..." />

    <!-- Error State -->
    <!-- ======================================== Error State ======================================== -->
    <div v-else-if="productStore.error" class="error-container">
      <div class="error-content">
        <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p class="error-message">{{ productStore.error }}</p>
      </div>
      <button
        type="button"
        @click="loadProducts"
        class="btn btn-primary"
      >
        Try Again
      </button>
    </div>

    <div v-else>
      <!-- Products Grid/List -->
    <!-- ======================================== Products Grid/List ======================================== -->   

    <div v-if="paginatedProducts.length > 0" class="mt-4 mb-4">
    <!-- Top Pagination -->
      <div class="pagination-container-top">
      <ProductPagination
          :current-page="productStore.currentPage"
          :total-items="productStore.totalProducts"
          :items-per-page="productStore.productsPerPage"
          :total-pages="productStore.totalPages"
          @page-change="handlePageChange"
        />
      </div>
      <!-- Grid View -->
      <div
        v-if="viewMode === 'grid'"
        class="products-grid"
      >
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- List View (hidden on mobile) -->
      <div v-else class="list-view-container">
        <ProductCardListView
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Bottom Pagination -->
      <div class="pagination-container-bottom">
        <ProductPagination
          :current-page="productStore.currentPage"
          :total-items="productStore.totalProducts"
          :items-per-page="productStore.productsPerPage"
          :total-pages="productStore.totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- No Results -->
    <!-- ======================================== No Results ======================================== -->
    <div v-else class="no-results-container">
      <div class="no-results-content">
        <svg class="no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="no-results-title">No products found</p>
        <p class="no-results-subtitle">Try adjusting your search or filters</p>
      </div>
      <button
        @click="clearAllFilters"
        class="btn btn-primary"
      >
        Clear Filters
      </button>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCardListView from '~/components/ProductCardListView.vue'
import { ref, onMounted } from 'vue'
import { SEARCH_DEBOUNCE_TIME } from '~/constants'
import { useProductStore } from '~/stores/products'
import { useCategoryStore } from '~/stores/categories'

// Page meta
definePageMeta({
  layout: 'default'
})

// ======================================== Composables & Data ========================================

// NOTE: Composables

// Route and router
const route = useRoute()
const router = useRouter()

// Reactive state
const viewMode = ref<'grid' | 'list'>('grid')
const filterDebounce = ref<NodeJS.Timeout | null>(null)


const productStore = useProductStore()
const categoryStore = useCategoryStore()

// ======================================== Computed Properties ========================================

// NOTE: Computed Properties
const computedMaxPrice = computed(() => {    
  if (productStore.products.length === 0) return 0
  let maxPrice = 0
  for (const product of productStore.products) {
    /**
     * NOTE: It should be calculated the discounted price for each product
     *      to get the maximum price range,
     */
    const discountedPrice = product.price - (product.price * product.discountPercentage / 100)
    if (discountedPrice > maxPrice) {
      maxPrice = discountedPrice
    }
  }
  return maxPrice
})

const hasActiveFilters = computed(() => {
  return productStore.filters.category ||
    productStore.filters.minPrice !== 0 ||
    productStore.filters.maxPrice !== computedMaxPrice.value ||
    productStore.filters.brands.length > 0 ||
    productStore.filters.minRating ||
    productStore.searchQuery
})

const activeFilterBadges = computed(() => {
  const badges: Array<{ key: string; label: string }> = []
  if (productStore.searchQuery) badges.push({ key: 'search', label: `Search: "${productStore.searchQuery}"` })
  if (productStore.filters.category) badges.push({ key: 'category', label: `Category: ${productStore.filters.category}` })
  if (productStore.filters.minPrice !== 0) badges.push({ key: 'price', label: `Price: $${productStore.filters.minPrice} - $${productStore.filters.maxPrice}` })
  if (productStore.filters.brands.length > 0) badges.push({ key: 'brands', label: `Brands: ${productStore.filters.brands.join(', ')}` })
  if (productStore.filters.minRating) badges.push({ key: 'rating', label: `${productStore.filters.minRating}⭐ & up` })
  return badges
})

// ======================================== Products List ========================================

// NOTE: Products List

const paginatedProducts = computed(() => {
    const start = (productStore.currentPage - 1) * productStore.productsPerPage
    const end = start + productStore.productsPerPage  
  
  // No products found
  if(!productStore.filteredProducts || productStore.filteredProducts.length === 0) {    
    return []
  }

  // Set filtered products from store to local variable
  let filteredProducts = productStore.filteredProducts
  // Pagination
  return filteredProducts.slice(start, end)
    
});

// ======================================== Debounce & Input ========================================

// NOTE: Debounce & Input
const debounceApplyFilters = () => {
  if (filterDebounce.value) clearTimeout(filterDebounce.value)
  filterDebounce.value = setTimeout(() => {
    applyFilters()
  }, SEARCH_DEBOUNCE_TIME)
}

const loadCategories = async () => {  
  await categoryStore.fetchCategories()
}

const loadProducts = async () => {  
  await productStore.fetchProducts(productStore.searchQuery, productStore.filters)
}

const handlePageChange = (page: number) => {
  productStore.setCurrentPage(page)
  loadProducts()
}

const updateFilters = (newFilters: typeof productStore.filters) => {
  productStore.updateFilters(newFilters)
  debounceApplyFilters()
}

const updateSortBy = (newSortBy: string) => {
  productStore.sortBy = newSortBy
  debounceApplyFilters()
}

const applyFilters = () => {
  productStore.setCurrentPage(1)  
  updateURL()
}

const clearAllFilters = () => {
  productStore.clearFilters()
  productStore.setCurrentPage(1)
  debounceApplyFilters()
}

const removeFilter = (key: string) => {
  switch (key) {
    case 'search':
      productStore.searchQuery = ''
      break
    case 'category':
      productStore.filters.category = ''
      break
    case 'price':
      productStore.filters.minPrice = 0
      productStore.filters.maxPrice = computedMaxPrice.value
      break
    case 'brands':
      productStore.filters.brands = []
      break
    case 'rating':
      productStore.filters.minRating = ''
      break
  }
  productStore.setCurrentPage(1)
  debounceApplyFilters()
}

const updateURL = () => {
  const query: Record<string, string> = {}
  
  if (productStore.searchQuery) query.q = productStore.searchQuery
  if (productStore.filters.category) query.category = productStore.filters.category
  if (productStore.filters.minPrice !== 0) {
    query.minPrice = productStore.filters.minPrice.toString()
    query.maxPrice = Math.round(computedMaxPrice.value).toString()
  }  
  if (productStore.filters.brands.length > 0) query.brands = productStore.filters.brands.join(',')
  if (productStore.filters.minRating) query.minRating = productStore.filters.minRating
  if (productStore.sortBy !== 'price-asc') query.sortBy = productStore.sortBy
  
  // Use replace to avoid adding to browser history for filter changes
  router.replace({ query })
}

const loadFromURL = () => {
  const query = route.query  
  
  if (query.q) productStore.searchQuery = query.q as string
  if (query.category) productStore.filters.category = query.category as string
  if (query.minPrice) productStore.filters.minPrice = Number(query.minPrice)
  if (query.maxPrice) productStore.filters.maxPrice = Number(query.maxPrice)
  if (query.brands) productStore.filters.brands = (query.brands as string).split(',')
  if (query.minRating) productStore.filters.minRating = query.minRating as string
  if (query.sortBy) productStore.sortBy = query.sortBy as string
}

// ======================================== Watchers & Lifecycle Hooks ========================================

// Auto-switch to grid view on mobile
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 639
  if (isMobile.value && viewMode.value === 'list') {
    viewMode.value = 'grid'
  }
}

// NOTE: Lifecycle Hooks
onMounted(async () => {
  /** NOTE: Loading data and set the filters when mounted*/
  checkMobile()
  window.addEventListener('resize', checkMobile)
  loadFromURL()
  await Promise.all([loadCategories(), loadProducts()])
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Watch for route changes
watch(() => route.query, () => {
  loadFromURL()  
  loadProducts()
}, { deep: true })

</script>

<style scoped>

.view-btn-active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.view-svg {
  width: 1.25rem;
  height: 1.25rem;
}


/* ========================================
   LOADING AND ERROR STATES
   ======================================== */

.error-container {
  text-align: center;
  padding: 3rem 0;
}

.error-content {
  color: var(--danger-color);
  margin-bottom: 1rem;
}

.error-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.5rem;
}

.error-message {
  font-size: 1.125rem;
  font-weight: 500;
}

/* ========================================
   PRODUCTS GRID
   ======================================== */
.products-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, 1fr);
}

/* ========================================
   END OF RESULTS
   ======================================== */
.end-results-container {
  text-align: center;
  padding: 2rem 0;
}

.end-results-content {
  color: var(--text-light);
}

.end-results-icon {
  width: 2rem;
  height: 2rem;
  margin: 0 auto 0.5rem;
  color: var(--success-color);
}

.end-results-text {
  font-size: 0.875rem;
  font-weight: 500;
}

/* ========================================
   LOAD MORE TRIGGER
   ======================================== */
.load-more-trigger {
  height: 1px;
  width: 100%;
  margin: 1rem 0;
}

/* ========================================
   NO RESULTS
   ======================================== */
.no-results-container {
  text-align: center;
  padding: 3rem 0;
}

.no-results-content {
  color: var(--text-light);
  margin-bottom: 1rem;
}

.no-results-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.5rem;
}

.no-results-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.no-results-subtitle {
  font-size: 0.875rem;
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

/* ========================================
   PAGINATION
   ======================================== */

.pagination-container-top {  
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
}

.pagination-container-bottom {  
  margin-top: 2rem;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}


/* ========================================
   RESPONSIVE DESIGN
   ======================================== */

/* Mobile responsive adjustments */
@media (max-width: 639px) {
  .flex.justify-between {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .list-view-container {
    display: none;
  }

  .toggle-container {
    display: none;
  }
}

/* Tablet (640px and up) */
@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px and up) */
@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large Desktop (1280px and up) */
@media (min-width: 1280px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

</style>
