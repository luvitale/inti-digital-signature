<template>
  <q-container fluid>
    <q-card class="digital-signature-card">
      <q-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <q-toolbar-title>{{
          $t('digital-signature.public-key.label')
        }}</q-toolbar-title>
      </q-toolbar>

      <q-divider></q-divider>

      <q-form class="digital-signature-form">
        <q-file
          :label="$t('digital-signature.public-key.select-private-key')"
          prepend-icon="mdi-message-text"
          outlined
          append-outer-icon="mdi-send"
          v-model="privateKeyFile"
          required
        >
          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="generatePublicKey" />
          </template>
        </q-file>
      </q-form>
    </q-card>
  </q-container>
</template>

<script>
import mixin from './mixin';

export default {
  name: 'GeneratePublicKey',

  mixins: [mixin],

  data: function () {
    return {
      privateKeyFile: [],
    };
  },
  methods: {
    generatePublicKey() {
      if (!this.privateKeyFile) return;

      const privateKeyPath = this.privateKeyFile.path;
      window.ipcRenderer.send('generate-public-key', privateKeyPath);
      window.ipcRenderer.receive('generate-public-key', (/* publicKey */) => {
        this.$root.Toast.show({
          message: this.$t('toast.public-key.successfully-generated'),
          color: 'success',
        });
      });
      window.ipcRenderer.receive('error', (msg) => {
        this.$root.Toast.show({
          message: msg,
          color: 'warning',
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
