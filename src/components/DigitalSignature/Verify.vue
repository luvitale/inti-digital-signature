<template>
  <v-container fluid>
    <v-card>
      <v-toolbar flat color="blue" dark>
        <v-toolbar-title>Verificar</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form>
        <v-file-input
          label="{{ $t('select-public-key') }}"
          prepend-icon="mdi-message-text"
          outlined
          v-model="publicKeyFile"
        />

        <v-file-input
          label="{{ $t('select-signature') }}"
          prepend-icon="mdi-message-text"
          outlined
          v-model="fileToVerify"
        />

        <v-file-input
          label="{{ $t('select-original-file') }}"
          prepend-icon="mdi-message-text"
          outlined
          v-model="originalFile"
        />
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed class="text-none" @click="verify">
          {{ $t('verify') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "VerifyComponent",

  data: function () {
    return {
      publicKeyFile: [],
      fileToVerify: [],
      originalFile: [],
    };
  },
  methods: {
    verify() {
      const publicKeyPath = this.publicKeyFile.path;
      const fileToVerifyPath = this.fileToVerify.path;
      const originalFilePath = this.originalFile.path;
      window.ipcRenderer.send("verify", {
        publicKeyPath,
        fileToVerifyPath,
        originalFilePath,
      });
      window.ipcRenderer.receive("verify", (/* verification */) => {
        this.$root.Toast.show({
          message: "{{ $t('correct-verification') }}",
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

<style></style>
