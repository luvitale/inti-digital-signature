<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/">{{ $t("app.home") }}</router-link> |
      <router-link to="/generate-private-key">{{
        $t("app.generate-private-key")
      }}</router-link>
      |
      <router-link to="/generate-public-key">{{
        $t("app.generate-public-key")
      }}</router-link>
      |
      <router-link to="/generate-digest">{{
        $t("app.generate-digest")
      }}</router-link>
      |
      <router-link to="/sign">{{ $t("app.sign") }}</router-link> |
      <router-link to="/verify">{{ $t("app.verify") }}</router-link>
    </div>

    <v-img
      class="mx-auto"
      id="inti-logo"
      :alt="$t('app.logo')"
      src="@/assets/logo.png"
      max-width="300px"
      max-height="300px"
    />
    <router-view />
    <Toast ref="Toast" />
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@media (prefers-color-scheme: dark) {
  #app {
    background-color: #121212;
    color: #fff;
  }

  #nav {
    a {
      color: turquoise;

      &.router-link-exact-active {
        color: lightblue;
      }
    }
  }
}
</style>

<script>
import Toast from "@/components/Toast";

export default {
  name: "App",
  components: {
    Toast,
  },
  mounted() {
    if (process.env.IS_ELECTRON) {
      window.ipcRenderer.receive("change-language", (lang) => {
        this.$root.$i18n.locale = lang;
      });
    }
    this.$root.Toast = this.$refs.Toast;
  },
};
</script>
