<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat color="blue" dark>
        <v-toolbar-title>{{ $t("public-key") }}</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form>
        <v-file-input
          :label="$t('select-private-key-to-generate-public-key-label')"
          prepend-icon="mdi-message-text"
          outlined
          append-outer-icon="mdi-send"
          v-model="privateKeyFile"
          @click:append-outer="generatePublicKey"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "GeneratePublicKeyComponent",

  mixins: [mixin],

  data: function () {
    return {
      privateKeyFile: [],
    };
  },
  methods: {
    generatePublicKey() {
      const privateKeyPath = this.privateKeyFile.path;
      window.ipcRenderer.send("generate-public-key", privateKeyPath);
      window.ipcRenderer.receive("generate-public-key", (/* publicKey */) => {
        this.$root.Toast.show({
          message: this.$t("successfully-generated-public-key"),
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

<style></style>
