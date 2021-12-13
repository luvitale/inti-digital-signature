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
      :label="$t('digital-signature.sign.select-digest-file')"
      v-model="digestToSign"
    />
  </v-container>
</template>

<script>
export default {
  name: "SignDigest",

  data() {
    return {
      removeSignDigestListener: () => null,
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
    digestToSign: {
      get() {
        if (!this.$store.state.digitalSignature.digestToSign) return undefined;

        return this.$store.state.digitalSignature.digestToSign.__ob__
          ? undefined
          : this.$store.state.digitalSignature.digestToSign;
      },
      set(digestToSign) {
        this.$store.dispatch("setDigestToSign", digestToSign);
      },
    },
  },

  mounted() {
    this.removeSignDigestListener = window.ipcRenderer.receive(
      "sign-digest",
      (signatureFile) => {
        this.$store.dispatch("showToast", {
          message: this.$t("toast.signature.successfully-signed-digest"),
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
    this.removeSignDigestListener();
    this.removeErrorListener();
  },
};
</script>
