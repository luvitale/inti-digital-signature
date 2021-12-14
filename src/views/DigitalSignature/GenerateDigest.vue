<template>
  <v-container fluid>
    <v-card class="digest-card">
      <v-toolbar flat color="blue" dark class="digest-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("app.generate-digest")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="digest-form" ref="form">
        <FileInput
          :label="$t('digital-signature.digest.select-file')"
          :required-label="
            $t(
              'digital-signature.utils.file-input.original-file.is-required-label'
            )
          "
          v-model="fileToDigest"
        />

        <HashSelector v-model="hash" />

        <INTIButton
          :disabled="!valid"
          :text="$t('app.generate-digest')"
          @click="generateDigest"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import FileInput from "@/components/DigitalSignature/Utils/FileInput.vue";
import HashSelector from "@/components/DigitalSignature/Utils/HashSelector.vue";
import INTIButton from "@/components/INTIButton.vue";

export default {
  name: "GenerateDigest",

  components: {
    FileInput,
    HashSelector,
    INTIButton,
  },

  data() {
    return {
      valid: true,
      removeGenerateDigestListener: () => null,
      removeErrorListener: () => null,
    };
  },

  computed: {
    fileToDigest: {
      get() {
        return this.$store.state.digitalSignature.fileToDigest;
      },
      set(value) {
        this.$store.dispatch("setFileToDigest", value);
      },
    },

    hash: {
      get() {
        return this.$store.state.digitalSignature.hash;
      },
      set(value) {
        this.$store.dispatch("setHash", value);
      },
    },
  },

  mounted() {
    this.removeGenerateDigestListener = window.ipcRenderer.receive(
      "generate-digest",
      (digestFile) => {
        this.$store.dispatch("showToast", {
          message: this.$t("toast.digest.successfully-generated"),
          color: "success",
        });

        this.$store.dispatch("setFileWithResult", {
          dispatcher: "setDigestFile",
          file: digestFile,
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
    generateDigest() {
      if (!this.$refs.form.validate()) return;

      this.$store.dispatch("generateDigest");
    },
  },

  destroyed() {
    this.removeGenerateDigestListener();
    this.removeErrorListener();
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
