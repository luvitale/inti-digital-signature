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
          prepend-icon="mdi-message-text"
          outlined
          required
          :label="$t('digital-signature.public-key.select-private-key')"
          v-model="privateKeyFile"
        />

        <INTIButton
          :text="$t('app.generate-public-key')"
          @click="generatePublicKey"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import INTIButton from "@/components/INTIButton.vue";

export default {
  name: "GeneratePublicKey",

  components: {
    INTIButton,
  },

  data() {
    return {
      removeGeneratePublicKeyListener: () => null,
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
  },

  mounted() {
    this.removeGeneratePublicKeyListener = window.ipcRenderer.receive(
      "generate-public-key",
      (publicKeyFile) => {
        this.$store.dispatch("showToast", {
          message: this.$t("toast.public-key.successfully-generated"),
          color: "success",
        });

        this.$store.dispatch("setFileWithResult", {
          dispatcher: "setPublicKeyFile",
          file: publicKeyFile,
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

  methods: {
    generatePublicKey() {
      this.$store.dispatch("generatePublicKey", this.privateKeyFile);
    },
  },

  destroyed() {
    this.removeGeneratePublicKeyListener();
    this.removeErrorListener();
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
