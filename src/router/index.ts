import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: "/guide",
    name: "guide",
    component: () => import("@/views/guide/Guide.vue")
  },
  {
    path: "/503",
    name: "badService",
    component: () => import("@/views/error/BadService.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import("@/views/error/NotFound.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router