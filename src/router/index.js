import { createRouter, createWebHistory } from 'vue-router'

import ProductsDetails from '../pages/products/details.vue'
import HomeView from '@/pages/HomeView.vue'
import Cart from '@/pages/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductsDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
