<template>
  <v-container fluid>
    <FileInput
      :label="$t('digital-signature.verify.select-public-key')"
      :required-label="
        $t('digital-signature.utils.file-input.public-key.is-required-label')
      "
      v-model="publicKeyFile"
    />

    <FileInput
      :label="$t('digital-signature.verify.select-signature')"
      :required-label="
        $t(
          'digital-signature.utils.file-input.signature-file.is-required-label'
        )
      "
      v-model="signatureFile"
    />

    <FileInput
      :label="$t('digital-signature.verify.select-digest-file')"
      :required-label="
        $t('digital-signature.utils.file-input.digest-file.is-required-label')
      "
      v-model="digestFile"
    />
  </v-container>
</template>

<script>
import FileInput from "@/components/DigitalSignature/Utils/FileInput.vue";

export default {
  name: "VerifyDigest",

  components: {
    FileInput,
  },

  data() {
    return {
      removeVerifyDigestListener: () => null,
      removeErrorListener: () => null,
    };
  },

  computed: {
    publicKeyFile: {
      get() {
        return this.$store.state.digitalSignature.publicKeyFile;
      },
      set(value) {
        this.$store.dispatch("setPublicKeyFile", value);
      },
    },
    signatureFile: {
      get() {
        return this.$store.state.digitalSignature.signatureFile;
      },
      set(value) {
        this.$store.dispatch("setSignatureFile", value);
      },
    },
    digestFile: {
      get() {
        return this.$store.state.digitalSignature.digestFile;
      },
      set(value) {
        this.$store.dispatch("setDigestFile", value);
      },
    },
  },

  mounted() {
    this.removeVerifyDigestListener = window.ipcRenderer.receive(
      "verify-digest",
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
    this.removeVerifyDigestListener();
    this.removeErrorListener();
  },
};
</script>
