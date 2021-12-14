<template>
  <v-container fluid>
    <FileInput
      :label="$t('digital-signature.sign.select-private-key')"
      :required-label="
        $t('digital-signature.utils.file-input.private-key.is-required-label')
      "
      v-model="privateKeyFile"
    />

    <FileInput
      :label="$t('digital-signature.sign.select-file')"
      :required-label="
        $t('digital-signature.utils.file-input.original-file.is-required-label')
      "
      v-model="fileToSign"
    />
  </v-container>
</template>

<script>
import FileInput from "@/components/DigitalSignature/Utils/FileInput.vue";

export default {
  name: "SignFile",

  components: {
    FileInput,
  },

  data() {
    return {
      removeSignListener: () => null,
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
    fileToSign: {
      get() {
        return this.$store.state.digitalSignature.fileToSign;
      },
      set(fileToSign) {
        this.$store.dispatch("setFileToSign", fileToSign);
      },
    },
  },

  mounted() {
    this.removeSignListener = window.ipcRenderer.receive(
      "sign",
      (signatureFile) => {
        this.$store.dispatch("showToast", {
          message: this.$t("toast.signature.successfully-signed"),
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
    this.removeSignListener();
    this.removeErrorListener();
  },
};
</script>
