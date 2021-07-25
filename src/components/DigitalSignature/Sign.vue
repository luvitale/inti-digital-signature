<template>
  <v-app>
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
          />

          <v-file-input
            label="Seleccioná el archivo a firmar"
            prepend-icon="mdi-message-text"
            outlined
          />
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" depressed @click="sign"> Firmar </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "SignComponent",

  data: function () {
    return {};
  },
  methods: {
    sign() {
      window.ipcRenderer.send("sign", "ping");
      window.ipcRenderer.receive("sign", (resp) => {
        console.log(resp);
      });
    },
  },
};
</script>

<style></style>