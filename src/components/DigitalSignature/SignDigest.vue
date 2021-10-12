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
      v-model="digestToSign"
    />
  </v-container>
</template>

<script>
export default {
  name: "Sign",

  data: function () {
    return {
      privateKeyFile: [],
      digestToSign: [],
    };
  },
  methods: {
    sign() {
      if (!this.privateKeyFile) return;
      if (!this.digestToSign) return;

      const privateKeyPath = this.privateKeyFile.path;
      const digestToSignPath = this.digestToSign.path;

      if (process.env.IS_ELECTRON) {
        window.ipcRenderer.send("sign-digest", {
          privateKeyPath,
          digestToSignPath,
        });
        window.ipcRenderer.receive("sign-digest", (/* signature */) => {
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
