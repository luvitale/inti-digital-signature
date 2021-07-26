<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat color="blue" dark>
        <v-toolbar-title>Firmar</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form>
        <v-file-input
          label="Seleccioná la clave privada"
          prepend-icon="mdi-message-text"
          outlined
          v-model="privateKeyFile"
        />

        <v-file-input
          label="Seleccioná el archivo a firmar"
          prepend-icon="mdi-message-text"
          outlined
          v-model="fileToSign"
        />
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed class="text-none" @click="sign">
          Firmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "SignComponent",

  mixins: [mixin],

  data: function () {
    return {
      privateKeyFile: [],
      fileToSign: [],
    };
  },
  methods: {
    sign() {
      const privateKeyPath = this.privateKeyFile.path;
      const fileToSignPath = this.fileToSign.path;
      window.ipcRenderer.send("sign", { privateKeyPath, fileToSignPath });
      window.ipcRenderer.receive("sign", (/* signedFile */) => {
        console.log("Firmado archivo correctamente");
      });
    },
  },
};
</script>

<style></style>
