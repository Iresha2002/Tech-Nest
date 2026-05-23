import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import CategoriesView from '../views/CategoriesView.vue'    
import DealsView from '../views/DealsView.vue'  
import ProductDetails from '../views/ProductDetails.vue'
import Support from '../views/Support.vue'
import path from 'path/win32'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
     path: '/categories',
     name: 'categories',
     component: CategoriesView

},
  {
     path: '/deals',
     name: 'deals',
     component: DealsView

},
  {
     path: '/productdeatail',
     name: 'productdeatail',
     component: ProductDetails

},
  {
     path: '/support',
     name: 'support',
     component: Support

}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router