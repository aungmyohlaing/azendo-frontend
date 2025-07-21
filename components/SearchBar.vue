<template>
    <div class="search-input-wrapper">        
        <div class="flex ">
            <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="form-input search-input w-full"
            @input="handleSearch"
            @focus="showDropdown = true"
            @blur="handleBlur"
            @keydown="handleKeydown"
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
        </div>
            <!-- Autocomplete Dropdown -->
        <div v-if="showDropdown && searchResults.length > 0" class="search-dropdown">
        <div
            v-for="(product, index) in searchResults"
            :key="product.id"
            :class="['search-item', { 'active': selectedIndex === index }]"
            @click="selectProduct(product)"
            @mouseenter="selectedIndex = index"
        >
            <img :src="product.thumbnail" :alt="product.title" class="product-thumbnail" />
            <div class="product-info">
            <div class="product-name">{{ product.title }}</div>
            <div class="product-brand">{{ product.brand }}</div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

interface Props {
    products: Product[]
}
const props = defineProps<Props>()  

const searchQuery = ref('')
const showDropdown = ref(false)
const searchResults = ref<Product[]>([])
const selectedIndex = ref(-1)
const searchDebounce = ref<NodeJS.Timeout | null>(null)

const clearSearch = () => {
    searchQuery.value = ''
    showDropdown.value = false
    searchResults.value = []
    selectedIndex.value = -1
}

const handleSearch = () => {
    if (searchDebounce.value) {
        clearTimeout(searchDebounce.value)
    }
    searchDebounce.value = setTimeout(() => {
        
        if (searchQuery.value.trim().length < 3) {
            searchResults.value = []            
            return;
        } 

        const query = searchQuery.value.toLowerCase()
        const result = props.products.filter(product => {                      
            return product.title.toLowerCase().includes(query) ||
            	(product.brand ? product.brand.toLowerCase().includes(query) : false) ||
                product.category.toLowerCase().includes(query)
        }).slice(0, 5)

        searchResults.value = result
        selectedIndex.value = -1
    }, 300)
}

const handleKeydown = (event: KeyboardEvent) => {
   switch (event.key) {
    case 'ArrowUp':
        event.preventDefault()
        selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
        break
    case 'ArrowDown':
        event.preventDefault()
        selectedIndex.value = Math.min(selectedIndex.value + 1, searchResults.value.length - 1)
        break
    case 'Enter':
        event.preventDefault()
        if (selectedIndex.value >= 0 && searchResults.value[selectedIndex.value]) {
            selectProduct(searchResults.value[selectedIndex.value])
        } else {
            navigateToSearch()
        }
        break
   }
}

const selectProduct = (product: Product) => {
    navigateTo(`/products/${product.id}`)    
    showDropdown.value = false
    searchQuery.value = ''
    searchResults.value = []
}

const navigateToSearch = () => {
    if (searchQuery.value.trim()) {
    navigateTo(`/products?q=${encodeURIComponent(searchQuery.value)}`)    
    showDropdown.value = false
    selectedIndex.value = -1
    searchQuery.value = ''
    searchResults.value = []
    }
}

const handleBlur = () => {
    setTimeout(() => {
        showDropdown.value = false
    }, 200)
}


</script>

<style scoped>


.search-input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s ease;
  height: 48px;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  pointer-events: none;
  z-index: 1;
}

.search-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  display: block;
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.25rem;
}

.clear-search-btn:hover {
  color: var(--text-color);
}

.clear-svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Autocomplete Dropdown */
.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border-color);
}

.search-item:last-child {
  border-bottom: none;
}

.search-item:hover,
.search-item.active {
  background-color: var(--background-light);
}

.product-thumbnail {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: var(--border-radius);
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-name {
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-brand {
  font-size: 0.875rem;
  color: var(--text-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .search-dropdown {
    max-height: 300px;
  }
  
  .search-item {
    padding: 0.5rem 0.75rem;
  }
  
  .product-thumbnail {
    width: 32px;
    height: 32px;
  }
  
  .product-name {
    font-size: 0.875rem;
  }
  
  .product-brand {
    font-size: 0.75rem;
  }
}
</style>