<template>
  <div class="product-list-card">
    <NuxtLink :to="`/products/${product.id}`" class="product-list-link">
      <div class="product-list-image">
        <img :src="product.thumbnail" :alt="product.title" />
        <div v-if="product.discountPercentage > 0" class="discount-badge">
          -{{ Math.round(product.discountPercentage) }}%
        </div>
      </div>
      <div class="product-list-info">
        <h3 class="product-list-title">{{ product.title }}</h3>
        <p class="product-list-brand">{{ product.brand }}</p>
        <div class="product-list-rating">
          <span class="stars">{{ getStars(product.rating) }}</span>
          <span class="rating-value">({{ product.rating }})</span>
        </div>
        <p class="product-list-description">{{ product.description }}</p>
        <div class="product-list-price">
          <span v-if="product.discountPercentage > 0" class="original-price">
            ${{ product.price.toFixed(2) }}
          </span>
          <span class="current-price">
            ${{ discountedPrice.toFixed(2) }}
          </span>
        </div>
      </div>
    </NuxtLink>
    <button @click="addToCart" class="btn btn-primary add-to-cart">
      Add to Cart
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const cartStore = useCartStore()

const discountedPrice = computed(() => {
  const discount = (props.product.price * props.product.discountPercentage) / 100
  return props.product.price - discount
})

const getStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar
  
  return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars)
}

const addToCart = () => {
  cartStore.addToCart(props.product)
  // You could add a toast notification here
}
</script>

<style scoped>
.product-list-card {
  display: flex;
  gap: 1.5rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  padding: 1.25rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}
.product-list-link {
  display: flex;
  gap: 1.5rem;
  flex: 1;
  color: inherit;
  text-decoration: none;
}
.product-list-image {
  flex-shrink: 0;
  width: 7rem;
  height: 7rem;
  position: relative;
  background-color: #f9fafb;
  border-radius: var(--border-radius);
  overflow: hidden;
}
.product-list-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius);
}
.discount-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: var(--danger-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
}
.product-list-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-list-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-color);
}
.product-list-brand {
  font-size: 0.875rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}
.product-list-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.stars {
  color: #f59e0b;
  font-size: 0.875rem;
}
.rating-value {
  font-size: 0.875rem;
  color: var(--text-light);
}
.product-list-description {
  font-size: 0.95rem;
  color: var(--text-color);
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.product-list-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.original-price {
  color: var(--text-light);
  text-decoration: line-through;
  font-size: 0.875rem;
}
.current-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
}
.add-to-cart {
  min-width: 8rem;
  align-self: flex-end;
  margin-left: 1.5rem;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
}
@media (max-width: 639px) {
  .product-list-card, .product-list-link {
    flex-direction: column;
    gap: 0.75rem;
  }
  .add-to-cart {
    align-self: stretch;
    margin-left: 0;
  }
  .product-list-image {
    width: 100%;
    height: 10rem;
  }
}
</style> 