<template>
  <q-page>
    <q-card class="digital-signature-card">
      <q-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <q-toolbar-title>{{
          $t('digital-signature.public-key.label')
        }}</q-toolbar-title>
      </q-toolbar>

      <q-separator></q-separator>

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
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { i18n } from 'boot/i18n';

export default defineComponent({
  name: 'GeneratePublicKey',

  setup: () => {
    const $q = useQuasar();

    const privateKeyFile = ref([]);

    const receivePublicKeyToDownload = () =>
      window.ipcRenderer.receive('generate-public-key', (publicKey) => {
        const url = window.URL.createObjectURL(new Blob([publicKey]));
        window.ipcRenderer.send('download', {
          url,
          properties: {
            defaultFilename: `${i18n.global.t(
              'crypto-file-dialog.default-filename.public-key'
            )}.pem`,
          },
        });
      });

    const receiveDownload = () =>
      window.ipcRenderer.receive('download', (savedPath) => {
        console.log(savedPath);

        $q.notify({
          message: i18n.global.t('toast.public-key.successfully-generated'),
          color: 'green',
        });
      });

    const receiveError = () =>
      window.ipcRenderer.receive('error', () => {
        $q.notify({
          message: i18n.global.t('toast.public-key.not-generated'),
          color: 'red',
        });
      });

    if ($q.platform.is.electron) {
      receivePublicKeyToDownload();
      receiveDownload();
      receiveError();
    }

    const generatePublicKey = () => {
      if (!privateKeyFile.value) return;

      const privateKeyPath = privateKeyFile.value.path;

      if ($q.platform.is.electron) {
        window.ipcRenderer.send('generate-public-key', privateKeyPath);
      }
    };

    return {
      privateKeyFile,
      generatePublicKey,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
