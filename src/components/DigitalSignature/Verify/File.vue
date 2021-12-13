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
      :label="$t('digital-signature.verify.select-original-file')"
      v-model="originalFile"
    />
  </v-container>
</template>

<script>
export default {
  name: "Verify",

  data() {
    return {
      removeVerifyListener: () => null,
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
    originalFile: {
      get() {
        if (!this.$store.state.digitalSignature.originalFile) return undefined;

        return this.$store.state.digitalSignature.originalFile.__ob__
          ? undefined
          : this.$store.state.digitalSignature.originalFile;
      },
      set(value) {
        this.$store.dispatch("setOriginalFile", value);
      },
    },
  },

  mounted() {
    this.removeVerifyListener = window.ipcRenderer.receive(
      "verify",
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
    this.removeVerifyListener();
    this.removeErrorListener();
  },
};
</script>
