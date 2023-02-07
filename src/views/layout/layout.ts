import { RouteRecordRaw } from "vue-router"

const layoutRoutes: RouteRecordRaw[] = [
  {
    path: "/layout",
    name: "layout",
    component: () => import("./Layout.vue")
  }
]

export default layoutRoutes