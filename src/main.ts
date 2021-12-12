import Vue from "vue";
import App from "@/App.vue";
import vuetify from "@/plugins/vuetify";
import router from "@/router";
import i18n from "@/i18n";
import store from "./store";

Vue.config.productionTip = false;

declare global {
  interface Window {
    ipcRenderer: {
      send: (arg0: string, arg1: any) => void;
      receive: (arg0: string, arg1: any) => () => void;
    };
  }
}

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
