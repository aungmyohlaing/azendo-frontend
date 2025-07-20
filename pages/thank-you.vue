<template>
  <div class="thank-you-page">
    <div class="container">
      <div class="thank-you-content">
        <!-- Success Icon -->
        <div class="success-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <!-- Main Message -->
        <h1 class="thank-you-title">Thank You!</h1>
        <p class="thank-you-message">
          We have received your order and will process it shortly.
        </p>

        <!-- Order Details (if available) -->
        <div v-if="orderId" class="order-details">
          <p class="order-id">Order ID: <span class="order-number">{{ orderId }}</span></p>
        </div>

        <!-- Additional Information -->
        <div class="order-info">
          <p class="info-text">
            You will receive an email confirmation with your order details and tracking information.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <NuxtLink to="/products" class="btn btn-primary">
            Continue Shopping
          </NuxtLink>
          <!-- <NuxtLink to="/dashboard" class="btn btn-outline">
            View Orders
          </NuxtLink> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: 'default'
})

// Get order ID from route query if available
const route = useRoute()
const orderId = computed(() => {
  const queryOrderId = route.query.orderId
  console.log('Query orderId:', queryOrderId) // Debug log
  return queryOrderId ? String(queryOrderId) : null
})
</script>

<style scoped>
.thank-you-page {
  padding: 4rem 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.thank-you-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background-color: var(--success-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.success-icon svg {
  width: 40px;
  height: 40px;
}

.thank-you-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.thank-you-message {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.order-details {
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.order-id {
  font-size: 1rem;
  color: var(--text-color);
  margin: 0;
}

.order-number {
  font-weight: 600;
  color: var(--primary-color);
}

.order-info {
  margin-bottom: 3rem;
}

.info-text {
  font-size: 1rem;
  color: var(--text-light);
  line-height: 1.6;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-buttons .btn {
  min-width: 160px;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .thank-you-page {
    padding: 2rem 0;
  }

  .thank-you-content {
    padding: 2rem 1rem;
  }

  .thank-you-title {
    font-size: 2rem;
  }

  .thank-you-message {
    font-size: 1.125rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .action-buttons .btn {
    width: 100%;
    max-width: 280px;
  }
}
</style> 