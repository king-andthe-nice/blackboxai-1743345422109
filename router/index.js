import Vue from 'vue'
import Router from 'uni-simple-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/index.vue')
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: () => import('@/pages/restaurants/index.vue')
    },
    {
      path: '/menu/:id',
      name: 'menu',
      component: () => import('@/pages/menu/index.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/cart/index.vue')
    },
    {
      path: '/order/confirm',
      name: 'order-confirm',
      component: () => import('@/pages/order/confirm.vue')
    },
    {
      path: '/account/login',
      name: 'login',
      component: () => import('@/pages/account/login.vue')
    }
  ]
})

export default router