import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Provider from '../views/Provider.vue'
import Customer from '../views/Customer.vue'
import Stock from '../views/Stock.vue'
import Dashboard from '../views/Dashboard.vue'
import Setting from '../views/Setting.vue'
import Sale from '../views/Sale.vue'
import Purchase from '../views/Purchase.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/provider',
    name: 'Provider',
    component: Provider
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/sale',
    name: 'Sale',
    component: Sale
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: Purchase
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
