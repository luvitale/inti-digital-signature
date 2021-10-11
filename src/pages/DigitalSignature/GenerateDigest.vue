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

    const receiveDigestToDownload = () =>
      window.ipcRenderer.receive('generate-digest', (digest) => {
        const url = window.URL.createObjectURL(new Blob([digest]));
        window.ipcRenderer.send('download', {
          url,
          properties: {
            defaultFilename: `${'digest'}.pem`,
          },
        });
      });

    const receiveDownload = () =>
      window.ipcRenderer.receive('download', (savedPath) => {
        console.log(savedPath);

        $q.notify({
          message: 'Digesto generado',
          color: 'green',
        });
      });

    const receiveError = () =>
      window.ipcRenderer.receive('error', () => {
        $q.notify({
          message: 'No se pudo generar el digesto',
          color: 'red',
        });
      });

      if ($q.platform.is.electron) {
    receiveDigestToDownload();
    receiveDownload();
    receiveError();
      }

    const generateDigest = () => {
      if (!fileToDigest.value) return;

      const fileToDigestPath = fileToDigest.value.path;

      if ($q.platform.is.electron) {
      window.ipcRenderer.send('generate-digest', {
        fileToDigestPath,
        hash: hash.value,
      });
      }
    };

    return {
      fileToDigest,
      hash,
      generateDigest,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
