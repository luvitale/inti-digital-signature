<template>
  <v-container fluid>
    <v-file-input
      :label="$t('digital-signature.verify.select-public-key')"
      prepend-icon="mdi-message-text"
      outlined
      required
      v-model="publicKeyFile"
    />

    <v-file-input
      :label="$t('digital-signature.verify.select-signature')"
      prepend-icon="mdi-message-text"
      outlined
      required
      v-model="signatureFile"
    />

    <v-file-input
      :label="$t('digital-signature.verify.select-original-file')"
      prepend-icon="mdi-message-text"
      outlined
      required
      v-model="originalFile"
    />

    <HashSelector v-model="hash" />
  </v-container>
</template>

<script>
import HashSelector from "@/components/HashSelector";

export default {
  name: "Verify",

  components: {
    HashSelector,
  },

  data: () => {
    return {
      publicKeyFile: [],
      signatureFile: [],
      originalFile: [],
      hash: "",
    };
  },

  methods: {
    verify() {
      if (!this.publicKeyFile) return;
      if (!this.signatureFile) return;
      if (!this.originalFile) return;

      const publicKeyPath = this.publicKeyFile.path;
      const signatureFilePath = this.signatureFile.path;
      const originalFilePath = this.originalFile.path;
      const hash = this.hash;
      window.ipcRenderer.send("verify", {
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        hash,
      });
      window.ipcRenderer.receive("verify", (isVerified) => {
        if (isVerified) {
          this.$root.Toast.show({
            message: this.$t("toast.verification.correct"),
            color: "success",
          });
        } else {
          this.$root.Toast.show({
            message: this.$t("toast.verification.wrong"),
            color: "error",
          });
        }
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
