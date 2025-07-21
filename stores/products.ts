import { defineStore } from 'pinia'
import { PRODUCTS_PER_PAGE } from '~/constants'
import type { Product, Category, ProductsResponse } from '~/types'
import { useProducts } from '~/composables/useProducts'

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [] as Product[],
        categories: [] as Category[],
        filters: {
            category: '',
            minPrice: 0,
            maxPrice: 0,
            brands: [] as string[],
            minRating: '',
        },
        searchQuery: '',
        sortBy: 'price-asc',
        currentPage: 1,
        productsPerPage: PRODUCTS_PER_PAGE,
        totalProducts: 0,   
        isLoading: false,
        error: null as string | null,
    }),

    getters: {      

        filteredProducts:(state) => {             
            let filterProducts = [...state.products]
            // filtering
            filterProducts = filterProducts.filter(product => {
                //price filter
                const discountedPrice = product.price - (product.price * product.discountPercentage / 100)
                const minPrice = state.filters.minPrice ?? 0
                const maxPrice = state.filters.maxPrice ?? 0
                if (state.filters.minPrice !== 0 || state.filters.maxPrice !== 0) {
                if (discountedPrice < minPrice || discountedPrice > maxPrice) return false;
                }
                // Rating Filter
                if (state.filters.minRating) {
                if (product.rating < parseFloat(state.filters.minRating)) return false;
                }
                // Brand Filter (Multi Select)
                if (state.filters.brands.length > 0) {
                if (!state.filters.brands.includes(product.brand)) return false;
                }
                // Category filter
                if (state.filters.category) {
                if (product.category !== state.filters.category) return false;
                }
                // Search Filter
                if (state.searchQuery) {
                if (!product.title.toLowerCase().includes(state.searchQuery.toLowerCase())) return false;
                }
                return true
            });

            // Sorting
            filterProducts.sort((a: Product, b: Product) => {
                const discountedPriceA = a.price - (a.price * a.discountPercentage / 100)
                const discountedPriceB = b.price - (b.price * b.discountPercentage / 100)
                switch (state.sortBy) {
                    case 'price-asc':
                        return discountedPriceA - discountedPriceB
                    case 'price-desc':
                        return discountedPriceB - discountedPriceA
                    case 'rating-desc':
                        return b.rating - a.rating
                    case 'title-asc':
                        return a.title.localeCompare(b.title)
                    case 'id-desc':
                        return b.id - a.id
                    default:
                        return 0
                }
            })
            state.totalProducts = filterProducts.length

            return filterProducts
        },
        availableBrands: (state) => {
            const brands = [...new Set(state.products.map(product => product.brand))]
            return Array.from(brands).filter(Boolean).sort()
        },

        totalPages: (state) => {
            return Math.ceil(state.totalProducts / state.productsPerPage)
        },        
    },
    
    actions: {
        updateFilters(newFilters: any) {
            this.filters = { ...this.filters, ...newFilters }
        },
        clearFilters() {
            this.filters = {
                category: '',
                minPrice: 0,
                maxPrice: 0,
                brands: [] as string[],
                minRating: ''
            }
            this.searchQuery = ''
            this.sortBy = 'price-asc'            
        },               
        setCurrentPage(page: number) {
            this.currentPage = page
        },
        async fetchProducts(searchQuery: string, filters: any) {
            const { searchProducts, getProductsByCategory, getAllProducts } = useProducts()
            this.isLoading = true
            this.error = null
            try {    
                let response: ProductsResponse
                if (searchQuery) {
                response = await searchProducts(searchQuery)                
                } else if (filters.category) {
                response = await getProductsByCategory(filters.category)
                } else {
                response = await getAllProducts({ limit: 250, skip: 0 })
                }                                

                this.products = response.products
                this.totalProducts = response.total

            } catch (err) {
                this.error = 'Failed to load products. Please try again.'
                console.error('Error loading products:', err) 
            } finally {
                this.isLoading = false
            }
        }
    }
})
