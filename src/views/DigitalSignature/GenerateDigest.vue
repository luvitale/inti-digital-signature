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
          :label="$t('digital-signature.digest.select-file')"
          prepend-icon="mdi-message-text"
          outlined
          v-model="fileToDigest"
          required
        />

        <HashSelector v-model="hash" />

        <v-btn
          outlined
          color="success"
          depressed
          class="text-none"
          @click="generateDigest"
        >
          {{ $t("app.generate-digest") }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import HashSelector from "@/components/HashSelector";

export default {
  name: "GenerateDigest",

  components: {
    HashSelector,
  },

  data: function () {
    return {
      fileToDigest: [],
      hash: "",
    };
  },
  methods: {
    generateDigest() {
      if (!this.fileToDigest) return;

      const fileToDigestPath = this.fileToDigest.path;
      const hash = this.hash;
      window.ipcRenderer.send("generate-digest", {
        fileToDigestPath,
        hash,
      });
      window.ipcRenderer.receive("generate-digest", (/* digest */) => {
        this.$root.Toast.show({
          message: this.$t("toast.digest.successfully-generated"),
          color: "success",
        });
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
