<template>
  <div class="checkout-page">
    <div class="container">
      <div class="checkout-header">
        <h1>Checkout</h1>
        <div class="checkout-steps">
          <div class="step" :class="{ active: step >= 1 }">
            <span class="step-number">1</span>
            <span class="step-label">Shipping</span>
          </div>
          <div class="step" :class="{ active: step >= 2 }">
            <span class="step-number">2</span>
            <span class="step-label">Payment</span>
          </div>
          <div class="step" :class="{ active: step >= 3 }">
            <span class="step-number">3</span>
            <span class="step-label">Review</span>
          </div>
        </div>
      </div>
      
      <div class="checkout-content">
        <div class="checkout-form">
          <!-- Step 1: Shipping Information -->
          <div v-if="step === 1" class="checkout-step">
            <h2>Shipping Information</h2>
            
            <form @submit.prevent="nextStep">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName" class="form-label">First Name</label>
                  <input
                    id="firstName"
                    v-model="shippingForm.firstName"
                    type="text"
                    class="form-input"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input
                    id="lastName"
                    v-model="shippingForm.lastName"
                    type="text"
                    class="form-input"
                    required
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="address" class="form-label">Street Address</label>
                <input
                  id="address"
                  v-model="shippingForm.address"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="city" class="form-label">City</label>
                  <input
                    id="city"
                    v-model="shippingForm.city"
                    type="text"
                    class="form-input"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="state" class="form-label">State</label>
                  <input
                    id="state"
                    v-model="shippingForm.state"
                    type="text"
                    class="form-input"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="zipCode" class="form-label">ZIP Code</label>
                  <input
                    id="zipCode"
                    v-model="shippingForm.zipCode"
                    type="text"
                    class="form-input"
                    required
                  />
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">Continue to Payment</button>
              </div>
            </form>
          </div>
          
          <!-- Step 2: Payment Information -->
          <div v-else-if="step === 2" class="checkout-step">
            <h2>Payment Information</h2>
            
            <form @submit.prevent="nextStep">
              <!-- Payment Method Selection -->
              <div class="payment-methods">
                <h3>Select Payment Method</h3>
                <div class="payment-options">
                  <label class="payment-option" :class="{ active: paymentForm.method === 'card' }">
                    <input
                      type="radio"
                      v-model="paymentForm.method"
                      value="card"
                      class="payment-radio"
                    />
                    <div class="payment-option-content">
                      <div class="payment-icon">💳</div>
                      <div class="payment-details">
                        <span class="payment-name">Credit / Debit Card</span>
                        <span class="payment-description">Visa, Mastercard, American Express</span>
                      </div>
                    </div>
                  </label>
                  
                  <label class="payment-option" :class="{ active: paymentForm.method === 'paypal' }">
                    <input
                      type="radio"
                      v-model="paymentForm.method"
                      value="paypal"
                      class="payment-radio"
                    />
                    <div class="payment-option-content">
                      <div class="payment-icon">🅿️</div>
                      <div class="payment-details">
                        <span class="payment-name">PayPal</span>
                        <span class="payment-description">Pay with your PayPal account</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Credit Card Form -->
              <div v-if="paymentForm.method === 'card'" class="card-form">
                <h3>Card Details</h3>
                
                <div class="form-group">
                  <label for="cardNumber" class="form-label">Card Number</label>
                  <div class="input-with-icon">
                    <input
                      id="cardNumber"
                      v-model="paymentForm.cardNumber"
                      type="text"
                      class="form-input"
                      :class="{ 'error': cardErrors.cardNumber }"
                      placeholder="1234 5678 9012 3456"
                      maxlength="19"
                      @input="formatCardNumber"
                      @blur="validateCardNumber"
                    />
                    <div class="card-type-icon">
                      {{ getCardTypeIcon(paymentForm.cardNumber) }}
                    </div>
                  </div>
                  <span v-if="cardErrors.cardNumber" class="error-message">{{ cardErrors.cardNumber }}</span>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="expiryDate" class="form-label">Expiry Date</label>
                    <input
                      id="expiryDate"
                      v-model="paymentForm.expiryDate"
                      type="text"
                      class="form-input"
                      :class="{ 'error': cardErrors.expiryDate }"
                      placeholder="MM/YY"
                      maxlength="5"
                      @input="formatExpiryDate"
                      @blur="validateExpiryDate"
                    />
                    <span v-if="cardErrors.expiryDate" class="error-message">{{ cardErrors.expiryDate }}</span>
                  </div>
                  <div class="form-group">
                    <label for="cvv" class="form-label">CVV</label>
                    <input
                      id="cvv"
                      v-model="paymentForm.cvv"
                      type="text"
                      class="form-input"
                      :class="{ 'error': cardErrors.cvv }"
                      placeholder="123"
                      maxlength="4"
                      @input="formatCVV"
                      @blur="validateCVV"
                    />
                    <span v-if="cardErrors.cvv" class="error-message">{{ cardErrors.cvv }}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="cardholderName" class="form-label">Cardholder Name</label>
                  <input
                    id="cardholderName"
                    v-model="paymentForm.cardholderName"
                    type="text"
                    class="form-input"
                    :class="{ 'error': cardErrors.cardholderName }"
                    placeholder="John Doe"
                    @blur="validateCardholderName"
                  />
                  <span v-if="cardErrors.cardholderName" class="error-message">{{ cardErrors.cardholderName }}</span>
                </div>
              </div>

              <!-- PayPal Form -->
              <div v-if="paymentForm.method === 'paypal'" class="paypal-form">
                <div class="paypal-info">
                  <div class="paypal-icon">🅿️</div>
                  <div class="paypal-details">
                    <h3>PayPal Checkout</h3>
                    <p>You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                </div>
              </div>

              <!-- Billing Address -->
              <div class="billing-address">
                <h3>Billing Address</h3>
                
                <div class="form-group">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      v-model="paymentForm.sameAsShipping"
                      class="checkbox-input"
                    />
                    <span class="checkbox-text">Same as shipping address</span>
                  </label>
                </div>

                <div v-if="!paymentForm.sameAsShipping" class="billing-form">
                  <div class="form-row">
                    <div class="form-group">
                      <label for="billingFirstName" class="form-label">First Name</label>
                      <input
                        id="billingFirstName"
                        v-model="paymentForm.billingFirstName"
                        type="text"
                        class="form-input"
                        :class="{ 'error': billingErrors.firstName && paymentForm.billingFirstName === '' }"                                                                 
                      />
                      <span v-if="billingErrors.firstName && paymentForm.billingFirstName === ''" class="error-message">{{ billingErrors.firstName }}</span>
                    </div>
                    <div class="form-group">
                      <label for="billingLastName" class="form-label">Last Name</label>
                      <input
                        id="billingLastName"
                        v-model="paymentForm.billingLastName"
                        type="text"
                        class="form-input"
                        :class="{ 'error': billingErrors.lastName && paymentForm.billingLastName === '' }"
                        
                      />
                      <span v-if="billingErrors.lastName && paymentForm.billingLastName === ''" class="error-message">{{ billingErrors.lastName }}</span>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="billingAddress" class="form-label">Street Address</label>
                    <input
                      id="billingAddress"
                      v-model="paymentForm.billingAddress"
                      type="text"
                      class="form-input"
                      :class="{ 'error': billingErrors.address && paymentForm.billingAddress === '' }"
                      
                    />
                    <span v-if="billingErrors.address && paymentForm.billingAddress === ''" class="error-message">{{ billingErrors.address }}</span>
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label for="billingCity" class="form-label">City</label>
                      <input
                        id="billingCity"
                        v-model="paymentForm.billingCity"
                        type="text"
                        class="form-input"
                        :class="{ 'error': billingErrors.city && paymentForm.billingCity === '' }"
                        
                      />
                      <span v-if="billingErrors.city && paymentForm.billingCity === ''" class="error-message">{{ billingErrors.city }}</span>
                    </div>
                    <div class="form-group">
                      <label for="billingState" class="form-label">State</label>
                      <input
                        id="billingState"
                        v-model="paymentForm.billingState"
                        type="text"
                        class="form-input"
                        :class="{ 'error': billingErrors.state && paymentForm.billingState === '' }"
                        
                      />
                      <span v-if="billingErrors.state && paymentForm.billingState === ''" class="error-message">{{ billingErrors.state }}</span>
                    </div>
                    <div class="form-group">
                      <label for="billingZipCode" class="form-label">ZIP Code</label>
                      <input
                        id="billingZipCode"
                        v-model="paymentForm.billingZipCode"
                        type="text"
                        class="form-input"
                        :class="{ 'error': billingErrors.zipCode && paymentForm.billingZipCode === '' }"
                        
                      />
                      <span v-if="billingErrors.zipCode && paymentForm.billingZipCode === ''" class="error-message">{{ billingErrors.zipCode }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="form-actions">
                <button @click="step = 1" type="button" class="btn btn-outline">Back to Shipping</button>
                <button type="submit" class="btn btn-primary" >Continue to Review</button>
              </div>
            </form>
          </div>
          
          <!-- Step 3: Order Review -->
          <div v-else-if="step === 3" class="checkout-step">
            <h2>Order Review</h2>
            
            <!-- <div class="incomplete-section">
              <div class="incomplete-message">
                <h3>🚧 Order Review Incomplete</h3>
                <p>This section needs to be implemented:</p>
                <ul>
                  <li>Order summary with all items</li>
                  <li>Shipping information review</li>
                  <li>Payment method summary</li>
                  <li>Terms and conditions checkbox</li>
                  <li>Place order functionality</li>
                </ul>
              </div>
            </div> -->
                        <div class="review-section">
              <div class="review-group">
                <h3>📋 Order Items</h3>
                <div class="review-items">
                  <div v-for="item in cartItems" :key="item.id" class="review-item">
                    <div class="item-review">
                      <img :src="item.product.thumbnail" :alt="item.product.title" class="item-review-image" />
                      <div class="item-review-details">
                        <span class="item-review-title">{{ item.product.title }}</span>
                        <span class="item-review-qty">Qty: {{ item.quantity }}</span>
                      </div>
                      <span class="item-review-price">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="review-group">
                <h3>📦 Shipping Information</h3>
                <div class="review-info">
                  <div class="review-row">
                    <span class="review-label">Name:</span>
                    <span class="review-value">{{ shippingForm.firstName }} {{ shippingForm.lastName }}</span>
                  </div>
                  <div class="review-row">
                    <span class="review-label">Address:</span>
                    <span class="review-value">{{ shippingForm.address }}, {{ shippingForm.city }}, {{ shippingForm.state }} {{ shippingForm.zipCode }}</span>
                  </div>
                </div>
              </div>

              <div class="review-group">
                <h3>💳 Billing Information</h3>
                <div class="review-info">
                  <div class="review-row" v-if="paymentForm.sameAsShipping">
                    <span class="review-label">Address:</span>
                    <span class="review-value">Same as shipping address</span>
                  </div>
                  <div v-else>
                    <div class="review-row">
                      <span class="review-label">Name:</span>
                      <span class="review-value">{{ paymentForm.billingFirstName }} {{ paymentForm.billingLastName }}</span>
                    </div>
                    <div class="review-row">
                      <span class="review-label">Address:</span>
                      <span class="review-value">{{ paymentForm.billingAddress }}, {{ paymentForm.billingCity }}, {{ paymentForm.billingState }} {{ paymentForm.billingZipCode }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="review-group">
                <h3>💳 Payment Method</h3>
                <div class="review-info">
                  <div class="review-row" v-if="paymentForm.method === 'card'">
                    <span class="review-label">Card:</span>
                    <span class="review-value">💳 Card ending in {{ paymentForm.cardNumber.slice(-4) }}</span>
                  </div>
                  <div class="review-row" v-else>
                    <span class="review-label">Method:</span>
                    <span class="review-value">🅿️ PayPal</span>
                  </div>
                </div>
              </div>
              
              <div class="terms-section">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="termsAccepted" class="checkbox-input" />
                  <span class="checkbox-text">I agree to the terms and conditions</span>
                </label>
              </div>
            </div>
            <div class="form-actions">
              <button @click="step = 2" class="btn btn-outline">Back to Payment</button>
              <button class="btn btn-primary" :disabled="!termsAccepted" @click="placeOrder">Place Order</button>
            </div>
          </div>
        </div>
        
        <div class="order-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            
            <div class="summary-items">
              <div v-for="item in cartItems" :key="item.id" class="summary-item">
                <div class="item-info">
                  <img :src="item.product.thumbnail" :alt="item.product.title" class="item-image" />
                  <div class="item-details">
                    <h4>{{ item.product.title }}</h4>
                    <p>Qty: {{ item.quantity }}</p>
                  </div>
                </div>
                <div class="item-price">
                  ${{ (item.product.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>
            
            <div class="summary-totals">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>Discount:</span>
                <span class="discount-amount">-${{ discount.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div class="summary-row">
                <span>Tax:</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              <div class="summary-row total-row">
                <span>Total:</span>
                <span>${{ finalTotal.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
// Router is available globally in Nuxt 3
const router = useRouter()
const cartStore = useCartStore()
const { items: cartItems, subtotal, discount } = storeToRefs(cartStore)

// Redirect if cart is empty
if (cartItems.value.length === 0) {
  await navigateTo('/cart')
}

const step = ref(1)

const shippingForm = reactive({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
})

// Payment form data
const paymentForm = reactive({
  method: 'card',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: '',
  sameAsShipping: true,
  billingFirstName: '',
  billingLastName: '',
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingZipCode: ''
})

// Error states
const cardErrors = reactive({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: ''
})

const billingErrors = reactive({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
})

const termsAccepted = ref(false)

const tax = computed(() => subtotal.value * 0.08) // 8% tax
const finalTotal = computed(() => subtotal.value - discount.value + tax.value)

// Card validation functions
const validateCardNumber = () => {
  const cardNumber = paymentForm.cardNumber.replace(/\s/g, '')
  if (!cardNumber) {
    cardErrors.cardNumber = 'Card number is required'
    return false
  }
  if (cardNumber.length < 13 || cardNumber.length > 19) {
    cardErrors.cardNumber = 'Card number must be 13-19 digits'
    return false
  }
  if (!/^\d+$/.test(cardNumber)) {
    cardErrors.cardNumber = 'Card number must contain only digits'
    return false
  }
  // Luhn algorithm validation
  // let sum = 0
  // let isEven = false
  // for (let i = cardNumber.length - 1; i >= 0; i--) {
  //   let digit = parseInt(cardNumber[i])
  //   if (isEven) {
  //     digit *= 2
  //     if (digit > 9) {
  //       digit -= 9
  //     }
  //   }
  //   sum += digit
  //   isEven = !isEven
  // }
  // if (sum % 10 !== 0) {
  //   cardErrors.cardNumber = 'Invalid card number'
  //   return false
  // }
  cardErrors.cardNumber = ''
  return true
}

const validateExpiryDate = () => {
  const expiry = paymentForm.expiryDate
  if (!expiry) {
    cardErrors.expiryDate = 'Expiry date is required'
    return false
  }
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    cardErrors.expiryDate = 'Invalid format (MM/YY)'
    return false
  }
  const [month, year] = expiry.split('/')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1
  
  if (parseInt(month) < 1 || parseInt(month) > 12) {
    cardErrors.expiryDate = 'Invalid month'
    return false
  }
  if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    cardErrors.expiryDate = 'Card has expired'
    return false
  }
  cardErrors.expiryDate = ''
  return true
}

const validateCVV = () => {
  const cvv = paymentForm.cvv
  if (!cvv) {
    cardErrors.cvv = 'CVV is required'
    return false
  }
  if (!/^\d{3,4}$/.test(cvv)) {
    cardErrors.cvv = 'CVV must be 3-4 digits'
    return false
  }
  cardErrors.cvv = ''
  return true
}

const validateCardholderName = () => {
  const name = paymentForm.cardholderName.trim()
  if (!name) {
    cardErrors.cardholderName = 'Cardholder name is required'
    return false
  }
  if (name.length < 2) {
    cardErrors.cardholderName = 'Name must be at least 2 characters'
    return false
  }
  cardErrors.cardholderName = ''
  return true
}

// Formatting functions
const formatCardNumber = () => {
  let value = paymentForm.cardNumber.replace(/\s/g, '')
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
  paymentForm.cardNumber = value
}

const formatExpiryDate = () => {
  let value = paymentForm.expiryDate.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  paymentForm.expiryDate = value
}

const formatCVV = () => {
  paymentForm.cvv = paymentForm.cvv.replace(/\D/g, '')
}

// Card type detection
const getCardTypeIcon = (cardNumber: string) => {
  const number = cardNumber.replace(/\s/g, '')
  if (number.startsWith('4')) return '💳' // Visa
  if (number.startsWith('5')) return '💳' // Mastercard
  return '💳'
}

// Billing address validation
const validateBillingAddress = () => {
  if (paymentForm.sameAsShipping) return true
  
  let isValid = true
  
  if (!paymentForm.billingFirstName.trim()) {
    billingErrors.firstName = 'First name is required'
    isValid = false
  } else {
    billingErrors.firstName = ''
  }
  
  if (!paymentForm.billingLastName.trim()) {
    billingErrors.lastName = 'Last name is required'
    isValid = false
  } else {
    billingErrors.lastName = ''
  }
  
  if (!paymentForm.billingAddress.trim()) {
    billingErrors.address = 'Address is required'
    isValid = false
  } else {
    billingErrors.address = ''
  }
  
  if (!paymentForm.billingCity.trim()) {
    billingErrors.city = 'City is required'
    isValid = false
  } else {
    billingErrors.city = ''
  }
  
  if (!paymentForm.billingState.trim()) {
    billingErrors.state = 'State is required'
    isValid = false
  } else {
    billingErrors.state = ''
  }
  
  if (!paymentForm.billingZipCode.trim()) {
    billingErrors.zipCode = 'ZIP code is required'
    isValid = false
  } else {
    billingErrors.zipCode = ''
  }
  
  return isValid
}

// Form validation
const isPaymentFormValid = computed(() => {
  if (paymentForm.method === 'card') {
    return validateCardNumber() && 
           validateExpiryDate() && 
           validateCVV() && 
           validateCardholderName() && 
           validateBillingAddress()
  }
  return validateBillingAddress()
})



const placeOrder = () => {
  if (!termsAccepted.value) return
  // Submit order logic here (API call, etc.)
  // Generate a simple order ID for demo purposes
  const orderId = 'ORD-' + Date.now().toString().slice(-8)
  
  // Clear cart after successful order
  cartStore.clearCart()
  
  // Redirect to thank you page with order ID
  router.push({
    path: '/thank-you',
    query: { orderId }
  })
}

const nextStep = () => {
  console.log('step', step.value)
  if (step.value < 3) {
    if (step.value === 2 && !isPaymentFormValid.value) {
      return;
    }     

    step.value++
  
  }
}
</script>

<style scoped>
.checkout-page {
  padding: 2rem 0;
  min-height: 80vh;
  
}

.checkout-header {
  text-align: center;
  margin-bottom: 3rem;
}

.checkout-header h1 {
  margin-bottom: 2rem;
}

.checkout-steps {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.step.active {
  opacity: 1;
}

.step-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--border-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.discount-amount {
  color: var(--success-color);
}


.step.active .step-number {
  background-color: var(--primary-color);
  color: white;
}

.step-label {
  font-weight: 500;
}

.checkout-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.checkout-form {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

.checkout-step h2 {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.incomplete-section {
  background-color: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-bottom: 2rem;
}

.incomplete-message h3 {
  color: #92400e;
  margin-bottom: 1rem;
}

.incomplete-message p {
  color: #92400e;
  margin-bottom: 1rem;
}

.incomplete-message ul {
  color: #92400e;
  margin-left: 1.5rem;
}

.incomplete-message li {
  margin-bottom: 0.5rem;
}

.order-summary {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.summary-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.summary-card h3 {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.summary-items {
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.summary-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: var(--border-radius);
}

.item-details h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
}

.item-details p {
  margin: 0;
  color: var(--text-light);
  font-size: 0.875rem;
}

.item-price {
  font-weight: 600;
  color: var(--primary-color);
}

.summary-totals {
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.total-row {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .checkout-steps {
    flex-direction: column;
    align-items: center;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    justify-content: center;
  }
}

/* Payment Form Styles */
.payment-methods {
  margin-bottom: 2rem;
}

.payment-methods h3 {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  color: var(--text-color);
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-option {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
}

.payment-option:hover {
  border-color: var(--primary-color);
}

.payment-option.active {
  border-color: var(--primary-color);
  background-color: #f0f9ff;
}

.payment-radio {
  display: none;
}

.payment-option-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.payment-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.payment-details {
  display: flex;
  flex-direction: column;
}

.payment-name {
  font-weight: 600;
  color: var(--text-color);
}

.payment-description {
  font-size: 0.875rem;
  color: var(--text-light);
}

/* Card Form Styles */
.card-form {
  margin-bottom: 2rem;
}

.card-form h3 {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  color: var(--text-color);
}

.input-with-icon {
  position: relative;
}

.card-type-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  pointer-events: none;
}

.form-input.error {
  border-color: #ef4444;
  box-shadow: 0 0 0 1px #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

/* PayPal Form Styles */
.paypal-form {
  margin-bottom: 2rem;
}

.paypal-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: var(--border-radius);
}

.paypal-icon {
  font-size: 2rem;
}

.paypal-details h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
}

.paypal-details p {
  margin: 0;
  color: var(--text-light);
}

/* Billing Address Styles */
.billing-address {
  margin-bottom: 2rem;
}

.billing-address h3 {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  color: var(--text-color);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
  accent-color: var(--primary-color);
}

.checkbox-text {
  font-weight: 500;
  color: var(--text-color);
}

.billing-form {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

/* Responsive adjustments for payment form */
@media (max-width: 768px) {
  .payment-option-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .paypal-info {
    flex-direction: column;
    text-align: center;
  }
}

/* Enhanced Review Section Styles */
.review-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.review-group {
  margin-bottom: 1.5rem;
}

.review-group h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.review-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.review-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem 0;
}

.review-label {
  font-weight: 500;
  color: var(--text-light);
  min-width: 80px;
  flex-shrink: 0;
}

.review-value {
  color: var(--text-color);
  text-align: right;
  flex: 1;
  margin-left: 1rem;
}

.review-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Item Review Styles */
.item-review {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.item-review-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: var(--border-radius);
  flex-shrink: 0;
}

.item-review-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.item-review-title {
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.875rem;
}

.item-review-qty {
  color: var(--text-light);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.item-review-price {
  font-weight: 600;
  color: var(--primary-color);
  font-size: 0.875rem;
}

/* Terms Section */
.terms-section {
  background-color: #f8fafc;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-top: 1rem;
}

/* Responsive adjustments for review section */
@media (max-width: 768px) {
  .review-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .review-value {
    text-align: left;
    margin-left: 0;
  }
  
  .item-review {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .item-review-price {
    align-self: flex-end;
  }
}
</style>