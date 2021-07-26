<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat color="blue" dark>
        <v-toolbar-title>Clave pública</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form>
        <v-file-input
          label="Seleccioná la clave privada y generá la clave pública"
          prepend-icon="mdi-message-text"
          outlined
          append-outer-icon="mdi-send"
          v-model="privateKeyFile"
          @click:append-outer="generatePublicKey"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin"

export default {
  name: "GeneratePublicKeyComponent",

  mixins: [mixin],

  data: function () {
    return {
      privateKeyFile: []
    };
  },
  methods: {
    generatePublicKey() {
      const privateKeyPath = this.privateKeyFile.path
      window.ipcRenderer.send("generate-public-key", privateKeyPath);
      window.ipcRenderer.receive("generate-public-key", (/* publicKey */) => {
        console.log("Clave pública generada correctamente")
      });
    }
  },
};
</script>

<style></style>