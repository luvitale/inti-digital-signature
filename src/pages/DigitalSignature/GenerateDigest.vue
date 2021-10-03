<template>
  <q-container fluid>
    <q-card class="digest-card">
      <q-toolbar flat color="blue" dark class="digest-toolbar">
        <q-toolbar-title>Generar digesto</q-toolbar-title>
      </q-toolbar>

      <q-divider></q-divider>

      <q-form class="digest-form">
        <q-file
          label="Seleccioná el archivo para generar el digesto"
          prepend-icon="mdi-message-text"
          outlined
          required
          v-model="fileToDigest"
        />

        <HashSelector v-model="hash" />
      </q-form>

      <div class="row justify-center">
        <q-btn
          label="Generar digesto"
          color="blue"
          depressed
          class="q-mt-md"
          no-caps
          @click="generateDigest"
        />
      </div>
    </q-card>
  </q-container>
</template>

<script>
import mixin from './mixin';
import HashSelector from 'components/HashSelector';

export default {
  name: 'GenerateDigest',

  mixins: [mixin],

  components: {
    HashSelector,
  },

  data: function () {
    return {
      fileToDigest: [],
      hash: '',
    };
  },
  methods: {
    generateDigest() {
      if (!this.fileToDigest) return;

      const fileToDigestPath = this.fileToDigest.path;
      const hash = this.hash;
      window.ipcRenderer.send('generate-digest', {
        fileToDigestPath,
        hash,
      });
      window.ipcRenderer.receive('generate-digest', (/* digest */) => {
        this.$root.Toast.show({
          message: 'Digesto generado',
          color: 'success',
        });
      });
      window.ipcRenderer.receive('error', (msg) => {
        this.$root.Toast.show({
          message: msg,
          color: 'error',
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
