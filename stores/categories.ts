import { defineStore } from 'pinia'
import type { Category } from '~/types'

export const useCategoryStore = defineStore('categories', {
    state: () => ({
        categories: [] as Category[],
        isLoading: false,
        error: null as string | null
    }),
    getters: {
        getCategories: (state) => state.categories,
    },
    actions: {
        async fetchCategories() {
            const { getCategories } = useProducts()
            this.isLoading = true
            this.error = null
            try {
                this.categories = await getCategories()
            } catch (error) {
                this.error = 'Failed to load categories. Please try again.'
                console.error('Error loading categories:', error)
            } finally {
                this.isLoading = false
            }
        }
    }
})