<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title>Verificar</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form class="digital-signature-form">
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
          v-model="signatureFilePath"
        />

        <v-file-input
          :label="$t('digital-signature.verify.select-original-file')"
          prepend-icon="mdi-message-text"
          outlined
          required
          v-model="originalFile"
        />
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed class="text-none" @click="verify">
          {{ $t("app.verify") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "VerifyComponent",

  data: function () {
    return {
      publicKeyFile: [],
      signatureFilePath: [],
      originalFile: [],
    };
  },
  methods: {
    verify() {
      if (!this.publicKeyFile) return;
      if (!this.signatureFilePath) return;
      if (!this.originalFile) return;

      const publicKeyPath = this.publicKeyFile.path;
      const signatureFilePath = this.signatureFilePath.path;
      const originalFilePath = this.originalFile.path;
      window.ipcRenderer.send("verify", {
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
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

<style lang="scss" scoped>
@import "styles.scss";
</style>
