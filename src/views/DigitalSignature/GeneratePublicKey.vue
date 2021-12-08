<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("digital-signature.public-key.label")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="public-key-form">
        <v-file-input
          :label="$t('digital-signature.public-key.select-private-key')"
          prepend-icon="mdi-message-text"
          outlined
          v-model="privateKeyFile"
          required
        />

        <v-btn
          outlined
          color="success"
          class="text-none"
          depressed
          @click="generatePublicKey"
        >
          {{ $t("app.generate-public-key") }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "GeneratePublicKey",

  mixins: [mixin],

  data: function () {
    return {
      privateKeyFile: [],
    };
  },
  methods: {
    generatePublicKey() {
      if (!this.privateKeyFile) return;

      const privateKeyPath = this.privateKeyFile.path;
      window.ipcRenderer.send("generate-public-key", privateKeyPath);
      window.ipcRenderer.receive("generate-public-key", (/* publicKey */) => {
        this.$root.Toast.show({
          message: this.$t("toast.public-key.successfully-generated"),
          color: "success",
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
