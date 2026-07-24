# CS3404: GUI Programming - TechNest Single Page Application (SPA)

**TechNest** is a data-driven Single Page Application (SPA) built using **Vue 3 (Composition API)**, **TypeScript**, **Tailwind CSS**, and **Pinia**. It consumes live e-commerce data from the public [DummyJSON REST API](https://dummyjson.com).

---

## 🚀 Tech Stack & Libraries
* **Framework**: Vue 3 (Composition API with `<script setup lang="ts">`)
* **Language**: TypeScript (Strict typing with interfaces)
* **Build Tool**: Vite 8
* **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
* **State Management**: Pinia (Auth, Cart, Dark Mode, Search stores)
* **Router**: Vue Router 5 (Dynamic Routing & History Mode)
* **API**: DummyJSON REST API (`/products`, `/products/category/`, `/products/:id`, `/auth/login`)

---

## ✨ Features Implemented

### 🛠️ Mandatory Technical Requirements
1. **Strict Front-End Architecture**: Fully typed using TypeScript interfaces (`Product`, `CartItem`, `Review`, `ProductsResponse`, `User`). No `any` types.
2. **Asynchronous REST API Consumption**: Consumes multiple DummyJSON endpoints asynchronously using native `fetch`.
3. **Component Architecture**: Modular UI breakdown (`NavBar.vue`, `ProductCard.vue`, `LoadingSpinner.vue`).
4. **Full Mobile & Tablet Responsiveness**: Adaptive layouts using Tailwind Grid and Flexbox classes (`grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`). Responsive mobile drawer navigation menu.
5. **Data Interactions**:
   - Live product search filtering.
   - Dynamic category selection and filtering.
   - Detailed product view page (`/product/:id`) with image gallery, availability, shipping, tags, and customer reviews.

### 🌟 Bonus Distinction / A+ Features
1. **Authentication Simulation**: Uses `/auth/login` DummyJSON API endpoint. Stores JWT token and user profile in `localStorage` with Pinia auth state management.
2. **Shopping Cart**: Global Pinia cart store (`cartStore.ts`) allowing users to add/remove items, adjust quantities, calculate discounts, and persist cart state across page reloads.
3. **Dynamic Routing**: Configured Vue Router for seamless SPA navigation (`/`, `/categories`, `/deals`, `/product/:id`, `/cart`, `/login`, `/support`).
4. **Dark Mode Toggle**: Built-in light/dark theme switcher using Tailwind's `dark:` modifier and `localStorage` persistence.

---

## 💻 Project Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone <your-repository-url>
   cd technest
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/` (or port indicated in terminal).

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🏛️ Component Architecture & Hierarchy

```
App.vue
├── NavBar.vue (Sticky navigation, dark mode, search, cart counter, mobile drawer)
└── RouterView
    ├── HomeView.vue (Hero section, quick stats, product catalog)
    │   └── ProductCard.vue
    ├── CategoriesView.vue (Category selectors & product list)
    │   └── ProductCard.vue
    ├── DealsView.vue (Hot deals filter & sorting)
    │   ├── LoadingSpinner.vue
    │   └── ProductCard.vue
    ├── ProductDetails.vue (Product image gallery, specs, reviews, add to cart)
    ├── CartView.vue (Cart item management, quantity controls, order summary)
    ├── LoginView.vue (DummyJSON JWT authentication & sign-up simulation)
    └── Support.vue (Interactive contact form & FAQ accordion)
```
