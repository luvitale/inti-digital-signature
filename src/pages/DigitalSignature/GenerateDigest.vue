<template>
  <q-page fluid>
    <q-card class="digest-card">
      <q-toolbar flat color="blue" dark class="digest-toolbar">
        <q-toolbar-title>Generar digesto</q-toolbar-title>
      </q-toolbar>

      <q-separator></q-separator>

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
  </q-page>
</template>

<script>
import HashSelector from 'components/HashSelector';
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'GenerateDigest',

  components: {
    HashSelector,
  },

  setup: () => {
    const $q = useQuasar();

    const fileToDigest = ref([]);
    const hash = ref('SHA1');

    const generateDigest = () => {
      if (!fileToDigest.value) return;

      const fileToDigestPath = fileToDigest.value.path;

      window.ipcRenderer.send('generate-digest', {
        fileToDigestPath,
        hash: hash.value,
      });
      window.ipcRenderer.receive('generate-digest', (/* digest */) => {
        $q.notify({
          message: 'Digesto generado',
          color: 'success',
        });
      });
      window.ipcRenderer.receive('error', (msg) => {
        $q.notify({
          message: msg,
          color: 'error',
        });
      });
    };

    return {
      fileToDigest,
      hash,
      generateDigest,
    }
  },
});
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
