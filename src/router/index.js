import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Vendor from '../views/Customer.vue'
import Customer from '../views/Customer.vue'
import Stock from '../views/Stock.vue'
import Dashboard from '../views/Dashboard.vue'
import Setting from '../views/Setting.vue'

import auth from '../middleware/auth.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: [auth]
    }
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
    path: '/Vendor',
    name: 'Vendor',
    component: Vendor
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
    path: '/sales',
    name: 'Sales',
    component: () => import('../views/Sale/index.vue')
  },
  {
    path: '/sale/:id',
    name: 'Sale',
    component: () => import('../views/Sale/show.vue')
  },
  {
    path: '/purchases',
    name: 'Purchases',
    component: () => import('../views/Purchase/index.vue')
  },
  {
    path: '/purchase/:id',
    name: 'Purchase',
    component: () => import('../views/Purchase/show.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Product/index.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product/show.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
