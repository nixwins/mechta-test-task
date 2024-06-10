import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { loadLayoutMiddleware } from './middlewares/loadLayout.middleware'
import { defineAsyncComponent } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      children: [
        {
          path: 'delivery/city/:id',
          name: 'deliveryCostPage',
          component: defineAsyncComponent(() => import('@/pages/DeliveryCostPage.vue'))
        }
      ]
    }
  ]
})

router.beforeEach(loadLayoutMiddleware)
export default router
