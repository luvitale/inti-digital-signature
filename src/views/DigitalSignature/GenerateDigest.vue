<template>
  <v-container fluid>
    <v-card class="digest-card">
      <v-toolbar flat color="blue" dark class="digest-toolbar">
        <v-toolbar-title>Generar digesto</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form class="digest-form">
        <v-file-input
          label="Seleccioná el archivo para generar el digesto"
          prepend-icon="mdi-message-text"
          outlined
          required
          v-model="fileToDigest"
        />

        <HashSelector v-model="hash" />
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          depressed
          class="text-none"
          @click="generateDigest"
        >
          Generar digesto
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";
import HashSelector from "@/components/HashSelector";

export default {
  name: "GenerateDigest",

  mixins: [mixin],

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
          message: "Digesto generado",
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
