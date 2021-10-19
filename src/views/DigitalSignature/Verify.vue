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

        <HashSelector v-model="hash" />
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
import HashSelector from "@/components/HashSelector";

export default {
  name: "Verify",

  components: {
    HashSelector,
  },

  data: function () {
    return {
      publicKeyFile: [],
      signatureFilePath: [],
      originalFile: [],
      hash: "",
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
      const hash = this.hash;

      if (process.env.IS_ELECTRON) {
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
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
