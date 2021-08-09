<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title>{{ $t("sign") }}</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form class="digital-signature-form">
        <v-file-input
          :label="$t('select-private-key')"
          prepend-icon="mdi-message-text"
          outlined
          v-model="privateKeyFile"
        />

        <v-file-input
          :label="$t('select-file-to-sign')"
          prepend-icon="mdi-message-text"
          outlined
          v-model="fileToSign"
        />
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed class="text-none" @click="sign">
          {{ $t("sign") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "SignComponent",

  mixins: [mixin],

  data: function () {
    return {
      privateKeyFile: [],
      fileToSign: [],
    };
  },
  methods: {
    sign() {
      if (!this.privateKeyFile) return;
      if (!this.fileToSign) return;

      const privateKeyPath = this.privateKeyFile.path;
      const fileToSignPath = this.fileToSign.path;
      window.ipcRenderer.send("sign", {
        privateKeyPath,
        fileToSignPath,
      });
      window.ipcRenderer.receive("sign", (/* signature */) => {
        this.$root.Toast.show({
          message: this.$t("successfully-signed-file"),
          color: "success",
        });
      });
      window.ipcRenderer.receive("error", (msg) => {
        this.$root.Toast.show({
          message: msg,
          color: "error",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
