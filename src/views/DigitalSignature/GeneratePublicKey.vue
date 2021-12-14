<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("digital-signature.public-key.label")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="public-key-form" ref="form">
        <FileInput
          :label="$t('digital-signature.public-key.select-private-key')"
          :required-label="
            $t(
              'digital-signature.utils.file-input.private-key.is-required-label'
            )
          "
          v-model="privateKeyFile"
        />

        <INTIButton
          :text="$t('app.generate-public-key')"
          :disabled="!valid"
          @click="generatePublicKey"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import FileInput from "@/components/DigitalSignature/Utils/FileInput.vue";
import INTIButton from "@/components/INTIButton.vue";

export default {
  name: "GeneratePublicKey",

  components: {
    FileInput,
    INTIButton,
  },

  data() {
    return {
      valid: true,
      removeGeneratePublicKeyListener: () => null,
      removeErrorListener: () => null,
    };
  },

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
      if (!this.$refs.form.validate()) return;

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
