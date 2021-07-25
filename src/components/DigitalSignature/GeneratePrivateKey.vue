<template>
  <v-app>
    <v-container fluid>
      <v-card>
        <v-toolbar flat color="blue" dark>
          <v-toolbar-title>Clave privada</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-form>
          <v-btn class="ma-2" outlined @click="generatePrivateKey">
            Generar clave privada
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "GeneratePrivateKeyComponent",

  data: function () {
    return {};
  },
  methods: {
    generatePrivateKey() {
      window.ipcRenderer.send("generate-private-key", "ping");
      window.ipcRenderer.receive("generate-private-key", (resp) => {
        console.log(resp);
      });
    }
  }
};
</script>

<style></style>