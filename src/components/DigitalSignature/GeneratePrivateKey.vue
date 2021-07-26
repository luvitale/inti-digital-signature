<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat color="blue" dark>
        <v-toolbar-title>Clave privada</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form>
        <v-btn
          outlined
          color="success"
          class="text-none"
          depressed
          @click="generatePrivateKey"
        >
          Generar clave privada
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "GeneratePrivateKeyComponent",

  mixins: [mixin],

  data: function () {
    return {};
  },
  methods: {
    generatePrivateKey() {
      window.ipcRenderer.send("generate-private-key");
      window.ipcRenderer.receive("generate-private-key", (/* privateKey */) => {
        console.log("Clave privada generada correctamente");
      });
    },
  },
};
</script>

<style></style>
