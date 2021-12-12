<template>
  <v-container fluid>
    <v-file-input
      prepend-icon="mdi-message-text"
      outlined
      required
      :label="$t('digital-signature.sign.select-private-key')"
      v-model="privateKeyFile"
    />

    <v-file-input
      prepend-icon="mdi-message-text"
      outlined
      required
      :label="$t('digital-signature.sign.select-file')"
      v-model="fileToSign"
    />
  </v-container>
</template>

<script>
export default {
  name: "SignFile",

  data() {
    return {
      removeSignListener: () => null,
      removeErrorListener: () => null,
    };
  },

  computed: {
    privateKeyFile: {
      get() {
        if (!this.$store.state.digitalSignature.privateKeyFile)
          return undefined;

        return this.$store.state.digitalSignature.privateKeyFile.__ob__
          ? undefined
          : this.$store.state.digitalSignature.privateKeyFile;
      },
      set(privateKeyFile) {
        this.$store.dispatch("setPrivateKeyFile", privateKeyFile);
      },
    },
    fileToSign: {
      get() {
        if (!this.$store.state.digitalSignature.fileToSign) return undefined;

        return this.$store.state.digitalSignature.fileToSign.__ob__
          ? undefined
          : this.$store.state.digitalSignature.fileToSign;
      },
      set(fileToSign) {
        this.$store.dispatch("setFileToSign", fileToSign);
      },
    },
  },

  mounted() {
    this.removeSignListener = window.ipcRenderer.receive(
      "sign",
      (signatureFile) => {
        this.$store.dispatch("showToast", {
          message: this.$t("toast.signature.successfully-signed"),
          color: "success",
        });

        this.$store.dispatch("setFileWithResult", {
          dispatcher: "setSignatureFile",
          file: signatureFile,
        });
      }
    );

    this.removeErrorListener = window.ipcRenderer.receive("error", (msg) => {
      this.$store.dispatch("showToast", {
        message: msg,
        color: "error",
      });
    });
  },

  destroyed() {
    this.removeSignListener();
    this.removeErrorListener();
  },
};
</script>
