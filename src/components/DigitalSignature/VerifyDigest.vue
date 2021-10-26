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
      :label="$t('digital-signature.verify.select-digest-file')"
      prepend-icon="mdi-message-text"
      outlined
      required
      v-model="digestFile"
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

  data: function () {
    return {
      publicKeyFile: [],
      signatureFile: [],
      digestFile: [],
      hash: "",
    };
  },

  methods: {
    verify() {
      if (!this.publicKeyFile) return;
      if (!this.signatureFile) return;
      if (!this.digestFile) return;

      const publicKeyPath = this.publicKeyFile.path;
      const signatureFilePath = this.signatureFile.path;
      const digestFilePath = this.digestFile.path;
      const hash = this.hash;
      window.ipcRenderer.send("verify-digest", {
        publicKeyPath,
        signatureFilePath,
        digestFilePath,
        hash,
      });
      window.ipcRenderer.receive("verify-digest", (isVerified) => {
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
