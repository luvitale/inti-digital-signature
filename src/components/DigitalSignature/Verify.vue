<template>
  <v-app>
    <v-container fluid>
      <v-card>
        <v-toolbar flat color="blue" dark>
          <v-toolbar-title>Verificar</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-form>
          <v-file-input
            label="Seleccioná la clave pública"
            prepend-icon="mdi-message-text"
            outlined
          />

          <v-file-input
            label="Seleccioná el archivo a verificar"
            prepend-icon="mdi-message-text"
            outlined
          />

          <v-file-input
            label="Seleccioná el archivo original"
            prepend-icon="mdi-message-text"
            outlined
          />
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" depressed @click="verify"> Verificar </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "VerifyComponent",

  data: function () {
    return {};
  },
  methods: {
    verify() {
      window.ipcRenderer.send("verify", "ping");
      window.ipcRenderer.receive("verify", (resp) => {
        console.log(resp);
      });
    },
  },
};
</script>

<style></style>