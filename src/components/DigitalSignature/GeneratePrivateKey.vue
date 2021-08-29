<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title>{{
          $t("digital-signature.private-key.label")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form class="digital-signature-form">
        <Cyphers v-model="type" />

        <v-btn
          outlined
          color="success"
          class="text-none"
          depressed
          @click="generatePrivateKey"
        >
          {{ $t("app.generate-private-key") }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";
import Cyphers from "@/components/Cyphers.vue";

export default {
  name: "GeneratePrivateKeyComponent",

  components: {
    Cyphers,
  },

  mixins: [mixin],

  data: function () {
    return {
      type: "RSA",
    };
  },
  methods: {
    generatePrivateKey() {
      window.ipcRenderer.send("generate-private-key", this.type);
      window.ipcRenderer.receive("generate-private-key", (/* privateKey */) => {
        this.$root.Toast.show({
          message: this.$t("toast.private-key.successfully-generated"),
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
