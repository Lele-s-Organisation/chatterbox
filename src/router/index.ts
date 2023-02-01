import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatDetail from "../views/chat/ChatDetail.vue";
import Chats from "../views/chat/Chats.vue";
import Chat from "../views/chat/Chat.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/chats",
      name: "chats",
      component: Chats,
    },
    {
      path: "/chats/:id",
      name: "chatDetail",
      component: ChatDetail,
    },
    {
      path: "/chats/:id/chat",
      name: "chat",
      component: Chat,
    },
  ],
});

export default router;
