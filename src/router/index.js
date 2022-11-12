import { createRouter, createWebHistory } from "vue-router";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/productline",
    name: "ProductLineList",
    component: () => import("../components/ProductLineList.vue"),
  },
  {
    path: "/product",
    name: "ProductList",
    component: () => import("../components/ProductList.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
