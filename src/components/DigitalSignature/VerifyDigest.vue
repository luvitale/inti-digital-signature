<template>
  <v-container fluid>
    <v-file-input
      prepend-icon="mdi-message-text"
      outlined
      required
      :label="$t('digital-signature.verify.select-public-key')"
      v-model="publicKeyFile"
    />

    <v-file-input
      prepend-icon="mdi-message-text"
      outlined
      required
      :label="$t('digital-signature.verify.select-signature')"
      v-model="signatureFile"
    />

    <v-file-input
      prepend-icon="mdi-message-text"
      outlined
      required
      :label="$t('digital-signature.verify.select-digest-file')"
      v-model="digestFile"
    />
  </v-container>
</template>

<script>
export default {
  name: "VerifyDigest",

  data() {
    return {
      removeVerifyDigestListener: () => null,
      removeErrorListener: () => null,
    };
  },

  computed: {
    publicKeyFile: {
      get() {
        if (!this.$store.state.digitalSignature.publicKeyFile) return undefined;

        return this.$store.state.digitalSignature.publicKeyFile.__ob__
          ? undefined
          : this.$store.state.digitalSignature.publicKeyFile;
      },
      set(value) {
        this.$store.dispatch("setPublicKeyFile", value);
      },
    },
    signatureFile: {
      get() {
        if (!this.$store.state.digitalSignature.signatureFile) return undefined;

        return this.$store.state.digitalSignature.signatureFile.__ob__
          ? undefined
          : this.$store.state.digitalSignature.signatureFile;
      },
      set(value) {
        this.$store.dispatch("setSignatureFile", value);
      },
    },
    digestFile: {
      get() {
        if (!this.$store.state.digitalSignature.digestFile) return undefined;

        return this.$store.state.digitalSignature.digestFile.__ob__
          ? undefined
          : this.$store.state.digitalSignature.digestFile;
      },
      set(value) {
        this.$store.dispatch("setDigestFile", value);
      },
    },
  },

  mounted() {
    this.removeVerifyDigestListener = window.ipcRenderer.receive(
      "verify-digest",
      (isVerified) => {
        if (isVerified) {
          this.$store.dispatch("showToast", {
            message: this.$t("toast.verification.correct"),
            color: "success",
          });
        } else {
          this.$store.dispatch("showToast", {
            message: this.$t("toast.verification.wrong"),
            color: "error",
          });
        }
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
    this.removeVerifyDigestListener();
    this.removeErrorListener();
  },
};
</script>
