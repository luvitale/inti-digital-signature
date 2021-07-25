<template>
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

    <v-divider></v-divider>

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

    <v-divider></v-divider>

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

    <v-divider></v-divider>

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
</template>

<script>
export default {
  components: {},
  data: function () {
    return {};
  },
  methods: {
    generatePrivateKey() {
      window.ipcRenderer.send("generate-private-key", "ping");
      window.ipcRenderer.receive("generate-private-key", (resp) => {
        console.log(resp);
      });
    },

    generatePublicKey() {
      window.ipcRenderer.send("generate-public-key", "ping");
      window.ipcRenderer.receive("generate-public-key", (resp) => {
        console.log(resp);
      });
    },

    sign() {
      window.ipcRenderer.send("sign", "ping");
      window.ipcRenderer.receive("sign", (resp) => {
        console.log(resp);
      });
    },

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
