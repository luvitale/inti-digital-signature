<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title>{{ $t("app.sign") }}</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form class="digital-signature-form">
        <v-file-input
          :label="$t('digital-signature.sign.select-private-key')"
          prepend-icon="mdi-message-text"
          outlined
          required
          v-model="privateKeyFile"
        />

        <v-file-input
          :label="$t('digital-signature.sign.select-file')"
          prepend-icon="mdi-message-text"
          outlined
          required
          v-model="fileToSign"
        />

        <HashSelector v-model="hash" />
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed class="text-none" @click="sign">
          {{ $t("app.sign") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";
import HashSelector from "@/components/HashSelector";

export default {
  name: "Sign",

  mixins: [mixin],

  components: {
    HashSelector,
  },

  data: function () {
    return {
      privateKeyFile: [],
      fileToSign: [],
      hash: [],
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
        hash: this.hash,
      });
      window.ipcRenderer.receive("sign", (/* signature */) => {
        this.$root.Toast.show({
          message: this.$t("toast.signature.successfully-signed"),
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
