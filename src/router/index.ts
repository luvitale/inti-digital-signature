import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import GeneratePrivateKey from "@/views/DigitalSignature/GeneratePrivateKey.vue";
import GeneratePublicKey from "@/views/DigitalSignature/GeneratePublicKey.vue";
import Sign from "@/views/DigitalSignature/Sign.vue";
import Verify from "@/views/DigitalSignature/Verify.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/generate-private-key",
    name: "GeneratePrivateKey",
    component: GeneratePrivateKey,
  },
  {
    path: "/generate-public-key",
    name: "GeneratePublicKey",
    component: GeneratePublicKey,
  },
  {
    path: "/sign",
    name: "Sign",
    component: Sign,
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
