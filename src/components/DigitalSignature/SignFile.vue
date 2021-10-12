<template>
  <v-container fluid>
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
  </v-container>
</template>

<script>
import HashSelector from "@/components/HashSelector";

export default {
  name: "Sign",

  components: {
    HashSelector,
  },

  data: function () {
    return {
      privateKeyFile: [],
      fileToSign: [],
      hash: "",
    };
  },
  methods: {
    sign() {
      if (!this.privateKeyFile) return;
      if (!this.fileToSign) return;

      const privateKeyPath = this.privateKeyFile.path;
      const fileToSignPath = this.fileToSign.path;
      const hash = this.hash;

      if (process.env.IS_ELECTRON) {
        window.ipcRenderer.send("sign", {
          privateKeyPath,
          fileToSignPath,
          hash,
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
      }
    },
  },
};
</script>
