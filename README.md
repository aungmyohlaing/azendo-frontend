# 🛍️ Azendo - Nuxt 3 E-Commerce Store

A modern, responsive e-commerce application built with **Nuxt 3**, featuring a complete product catalog, shopping cart, and checkout system.

## ✨ Features Implemented

### 🏪 Product Catalog
- **Product Grid/List View**: Toggle between grid and list layouts
- **Advanced Search**: Real-time search with debouncing
- **Comprehensive Filtering**:
  - Category filter (dropdown)
  - Price range filter (slider)
  - Brand filter (checkbox list)
  - Rating filter (star rating)
  - Active filter badges with easy removal
- **Sorting Options**: Price (asc/desc), rating, popularity
- **Pagination**: Efficient product pagination
- **Responsive Design**: Mobile-first approach with breakpoints

### 🛒 Shopping Cart
- **Add/Remove Items**: Seamless cart management
- **Quantity Controls**: Update item quantities
- **Real-time Calculations**: Accurate pricing with discounts
- **Persistent Storage**: Cart state maintained across sessions



### 💳 Checkout System
- **Order Review**: Complete order summary
- **Shipping Information**: Address collection and validation
- **Payment Integration**: Credit card form with validation
- **Order Confirmation**: Thank you page with order details

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on all device sizes
- **Loading Animations**: Smooth user experience
- **Error Handling**: User-friendly error messages
- **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Technologies Used

### Frontend Framework
- **Nuxt 3** - Vue.js meta-framework with SSR
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript development

### State Management
- **Pinia** - Intuitive Vue store
- **@pinia/nuxt** - Nuxt 3 integration

## 📁 Code Organization & File Splitting

### 🧩 **Component-Based Architecture**
The application follows a modular component approach for better maintainability and reusability:

#### **Reusable Components** (`/components/`)
- **ProductCard.vue** - Individual product display with grid layout
- **ProductCardListView.vue** - Product display optimized for list view
- **ProductFilters.vue** - Advanced filtering system (category, price, brand, rating)
- **FilterBadges.vue** - Active filter display with removal functionality
- **SearchBar.vue** - Debounced search with clear functionality
- **ProductPagination.vue** - Pagination controls with page navigation
- **Loading.vue** - Reusable loading states and spinners
- **Breadcrumb.vue** - Navigation breadcrumbs

#### **Benefits of Component Splitting:**
- **Reusability**: Components can be used across multiple pages
- **Maintainability**: Each component has a single responsibility
- **Testing**: Individual components can be tested in isolation
- **Performance**: Components can be lazy-loaded when needed

### 🏪 **Store-Based State Management** (`/stores/`)
Centralized state management using Pinia stores for better data flow:

#### **Products Store** (`stores/products.ts`)
- **Product Data**: Centralized product catalog management
- **Filtering Logic**: Search, category, price, brand, and rating filters
- **Pagination State**: Current page, items per page, total pages
- **Sorting Options**: Price, rating, and popularity sorting
- **API Integration**: Product fetching and caching

#### **Categories Store** (`stores/categories.ts`)
- **Category Data**: Centralized category list management
- **API Integration**: Category fetching and caching

#### **Benefits of Store Splitting:**
- **Separation of Concerns**: Each store handles specific domain logic
- **Data Consistency**: Centralized state prevents data duplication
- **Reactive Updates**: Changes automatically propagate to all components
- **Type Safety**: TypeScript interfaces ensure data integrity

### ⚙️ **Constants Management** (`/constants/`)
Application-wide constants for configuration and maintainability:

#### **Constants File** (`constants/index.ts`)
- **Search Settings**: Debounce timing and search parameters
- **Pagination**: Default page sizes and limits
- **Filter Options**: Default filter values and ranges

#### **Benefits of Constants Splitting:**
- **Configuration Management**: Easy to modify application settings
- **Code Maintainability**: Single source of truth for constants
- **Environment Flexibility**: Easy to switch between development/production
- **Reduced Magic Numbers**: Meaningful constant names instead of hardcoded values

## ⚡ Technical Decisions

### Why All Products Are Loaded at Once

- The **DummyJSON API does not support server-side filtering** for price and brands.
- To provide accurate and dynamic filter options (e.g., price range slider, available brands), **all products are loaded at once** on the client.
- **Filtering and sorting** (by price, brand, rating, etc.) are performed client-side for a seamless user experience.
- **Pagination** is also handled client-side, after filtering.
- This approach ensures that filter options always reflect the actual data, and users can combine filters in any way.

> **Note:** For large real-world datasets, server-side filtering and pagination would be preferred for performance.

### Styling
- **Custom CSS** - Tailwind-inspired utility classes
- **CSS Variables** - Consistent design system
- **Responsive Design** - Mobile-first approach

### API Integration
- **DummyJSON API** - Mock e-commerce data for products
- **RESTful Architecture** - Standard API patterns
- **Error Handling** - Robust API error management

### Development Tools
- **Vue DevTools** - Development debugging
- **TypeScript** - Static type checking
- **ESLint** - Code quality enforcement

## 📁 Project Structure

```
nuxt3-ecommerce-assessment/
├── assets/
│   └── css/
│       └── main.css              # Global styles and design system
├── components/                   # Reusable Vue components
│   ├── Breadcrumb.vue           # Navigation breadcrumbs
│   ├── FilterBadges.vue         # Active filter display
│   ├── Loading.vue              # Loading states
│   ├── ProductCard.vue          # Product grid item
│   ├── ProductCardListView.vue  # Product list item
│   ├── ProductFilters.vue       # Advanced filtering
│   ├── ProductPagination.vue    # Pagination controls
│   └── SearchBar.vue            # Search functionality
├── composables/                 # Vue 3 composables
│   ├── useApi.ts               # API utilities
│   └── useProducts.ts          # Product data management
├── constants/
│   └── index.ts                # Application constants
├── layouts/                    # Page layouts
│   └── default.vue            # Main layout
├── pages/                     # Application pages
│   ├── about/
│   │   └── index.vue          # About page
│   ├── cart.vue               # Shopping cart
│   ├── checkout.vue           # Checkout process
│   ├── index.vue              # Homepage
│   ├── products/
│   │   ├── [id].vue           # Product detail
│   │   └── index.vue          # Product catalog
│   └── thank-you.vue          # Order confirmation
├── stores/                    # Pinia stores
│   ├── cart.ts                # Shopping cart state
│   └── products.ts            # Product data state
├── types/                     # TypeScript definitions
│   └── index.ts               # Type definitions
├── nuxt.config.ts             # Nuxt configuration
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or later)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nuxt3-ecommerce-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
```

## 🧪 Testing the Application

### 1. **Product Catalog Testing** (`/products`)

#### Search Functionality
- [ ] Type in the search bar to filter products
- [ ] Verify debouncing works (no immediate API calls)
- [ ] Test with various search terms (phones, laptops, etc.)

#### Filtering System
- [ ] **Category Filter**: Select different categories from dropdown
- [ ] **Price Range**: Use the slider to filter by price
- [ ] **Brand Filter**: Check/uncheck brand checkboxes
- [ ] **Rating Filter**: Select minimum star rating
- [ ] **Active Filters**: Verify filter badges appear and can be removed

#### Sorting
- [ ] Test all sort options (Price: Low to High, High to Low, Rating, etc.)
- [ ] Verify products reorder correctly

#### View Modes
- [ ] Toggle between Grid and List views
- [ ] Verify responsive behavior on mobile (auto-switches to grid)

#### Pagination
- [ ] Navigate through pages
- [ ] Verify correct number of products per page
- [ ] Test pagination with filters applied

### 2. **Checkout Process Testing** (`/checkout`)

#### Order Review
- [ ] Verify cart items are displayed correctly
- [ ] Check total calculations
- [ ] Test shipping address form

#### Payment Integration
- [ ] Fill out credit card form
- [ ] Test form validation
- [ ] Verify payment processing

### 3. **Responsive Design Testing**

#### Mobile Testing
- [ ] Test on mobile devices or browser dev tools
- [ ] Verify navigation menu works
- [ ] Check product grid adapts to screen size
- [ ] Test touch interactions

#### Tablet Testing
- [ ] Verify layout adapts to tablet screens
- [ ] Test grid/list view functionality

#### Desktop Testing
- [ ] Verify full desktop layout
- [ ] Test all features on large screens

## 🎨 Design System

### Color Palette
```css
--primary-color: #2563eb    /* Blue */
--secondary-color: #64748b  /* Gray */
--success-color: #10b981    /* Green */
--danger-color: #ef4444     /* Red */
--warning-color: #f59e0b    /* Orange */
--dark-color: #1e293b       /* Dark */
--light-color: #f8fafc      /* Light */
```

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Base Size**: 16px
- **Line Height**: 1.5
- **Responsive**: Scales appropriately on different devices

### Components
- **Buttons**: Primary, Secondary, Outline, Danger variants
- **Forms**: Inputs, selects, textareas with validation states
- **Cards**: Product cards, info cards with headers/bodies
- **Alerts**: Success, error, warning, info messages
- **Loading**: Spinners and skeleton loaders

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
NUXT_PUBLIC_API_BASE=https://dummyjson.com
```

### Nuxt Configuration
- **TypeScript**: Strict mode enabled
- **DevTools**: Development debugging tools
- **Modules**: Pinia for state management
- **CSS**: Global stylesheet included

## 📱 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🚀 Performance Features

- **Lazy Loading**: Images and components load on demand
- **Debounced Search**: Reduces API calls during typing
- **Efficient Pagination**: Only loads necessary data
- **Optimized Images**: Responsive image handling
- **Minimal Bundle**: Tree-shaking and code splitting

## 🔒 Security Features

- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **Form Validation**: Secure checkout form handling

## 📊 API Integration

### DummyJSON Endpoints Used
```bash
GET /products              # Product catalog
GET /products/search       # Product search
GET /products/categories   # Categories list
GET /products/category/*   # Category products
GET /products/:id          # Single product
```

### Error Handling
- **Network Errors**: Graceful fallbacks
- **API Errors**: User-friendly messages
- **Validation Errors**: Form-specific feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.