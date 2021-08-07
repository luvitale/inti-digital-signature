<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title>{{ $t("private-key") }}</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form class="digital-signature-form">
        <v-btn
          outlined
          color="success"
          class="text-none"
          depressed
          @click="generatePrivateKey"
        >
          {{ $t("generate-private-key") }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "GeneratePrivateKeyComponent",

  mixins: [mixin],

  data: function () {
    return {};
  },
  methods: {
    generatePrivateKey() {
      window.ipcRenderer.send("generate-private-key");
      window.ipcRenderer.receive("generate-private-key", (/* privateKey */) => {
        this.$root.Toast.show({
          message: this.$t("successfully-generated-private-key"),
        });
      });
      window.ipcRenderer.receive("error", (msg) => {
        this.$root.Toast.show({
          message: msg,
          color: "warning",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
