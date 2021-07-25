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
          @click:append-outer="generatePublicKey"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "GeneratePublicKeyComponent",

  data: function () {
    return {};
  },
  methods: {
    generatePublicKey() {
      window.ipcRenderer.send("generate-public-key", "ping");
      window.ipcRenderer.receive("generate-public-key", (resp) => {
        console.log(resp);
      });
    }
  },
};
</script>

<style></style>