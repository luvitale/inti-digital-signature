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
      :label="$t('digital-signature.sign.select-digest-file')"
      :required-label="
        $t('digital-signature.utils.file-input.digest-file.is-required-label')
      "
      v-model="digestToSign"
    />
  </v-container>
</template>

<script>
import FileInput from "@/components/DigitalSignature/Utils/FileInput.vue";

export default {
  name: "SignDigest",

  components: {
    FileInput,
  },

  data() {
    return {
      removeSignDigestListener: () => null,
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
    digestToSign: {
      get() {
        return this.$store.state.digitalSignature.digestToSign;
      },
      set(digestToSign) {
        this.$store.dispatch("setDigestToSign", digestToSign);
      },
    },
  },

  mounted() {
    this.removeSignDigestListener = window.ipcRenderer.receive(
      "sign-digest",
      (signatureFile) => {
        this.$store.dispatch("showToast", {
          message: this.$t("toast.signature.successfully-signed-digest"),
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
    this.removeSignDigestListener();
    this.removeErrorListener();
  },
};
</script>
