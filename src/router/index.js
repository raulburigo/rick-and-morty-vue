import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Início",
    component: Home,
  },
  {
    path: "/sobre",
    name: "Sobre",

    component: () => import("../views/About.vue"),
  },
  {
    path: "/personagens",
    name: "Personagens",

    component: () => import("../views/Characters.vue"),
  },
  {
    path: "/episodios",
    name: "Episódios",

    component: () => import("../views/Episodes.vue"),
  },
  {
    path: "/github",
    beforeEnter() {
      location.href = "http://github.com/raulburigo";
    },
  },
  {
    path: "/linkedin",
    beforeEnter() {
      location.href = "http://linkedin.com/in/raulburigo";
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
