<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("digital-signature.public-key.label")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="public-key-form">
        <v-file-input
          :label="$t('digital-signature.public-key.select-private-key')"
          prepend-icon="mdi-message-text"
          outlined
          v-model="privateKeyFile"
          required
        />

        <v-btn
          outlined
          color="success"
          class="text-none"
          depressed
          @click="generatePublicKey"
        >
          {{ $t("app.generate-public-key") }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "GeneratePublicKey",

  computed: {
    privateKeyFile: {
      get() {
        return this.$store.state.digitalSignature.privateKeyFile;
      },
      set(privateKeyFile) {
        this.$store.dispatch("setPrivateKeyFile", privateKeyFile);
      },
    },
  },

  mounted() {
    window.ipcRenderer.receive("generate-public-key", () => {
      this.$store.dispatch("showToast", {
        message: this.$t("toast.public-key.successfully-generated"),
        color: "success",
      });

      this.$store.dispatch("setFileWithResult", {
        dispatcher: "setPublicKeyFile",
        file: this.publicKeyFile,
      });
    });
    window.ipcRenderer.receive("error", (msg) => {
      this.$store.dispatch("showToast", {
        message: msg,
        color: "error",
      });
    });
  },

  methods: {
    generatePublicKey() {
      this.$store.dispatch("generatePublicKey", this.privateKeyFile);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
