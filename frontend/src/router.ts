import { createRouter, createWebHistory } from "vue-router";
import RegisterForm from "./components/RegisterForm.vue";
import LoginForm from "./components/LoginForm.vue";
import CatalogView from "./components/CatalogView.vue";
import CategoryView from "./components/CategoryView.vue";

const routes = [
  { path: "/register", component: RegisterForm },
  { path: "/login", component: LoginForm },
  { path: "/catalog", component: CatalogView},
  { path: "/category/:id", component: CategoryView},
  { path: "/", redirect: "/register"}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;