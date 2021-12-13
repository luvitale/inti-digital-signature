<template>
  <v-container fluid>
    <v-card class="digest-card">
      <v-toolbar flat color="blue" dark class="digest-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("app.generate-digest")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="digest-form">
        <v-file-input
          prepend-icon="mdi-message-text"
          outlined
          required
          :label="$t('digital-signature.digest.select-file')"
          v-model="fileToDigest"
        />

        <HashSelector v-model="hash" />

        <INTIButton :text="$t('app.generate-digest')" @click="generateDigest" />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import HashSelector from "@/components/DigitalSignature/Utils/HashSelector.vue";
import INTIButton from "@/components/INTIButton.vue";

export default {
  name: "GenerateDigest",

  components: {
    HashSelector,
    INTIButton,
  },

  data() {
    return {
      removeGenerateDigestListener: () => null,
      removeErrorListener: () => null,
    };
  },

  computed: {
    fileToDigest: {
      get() {
        if (!this.$store.state.digitalSignature.fileToDigest) return undefined;

        return this.$store.state.digitalSignature.fileToDigest.__ob__
          ? undefined
          : this.$store.state.digitalSignature.fileToDigest;
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
