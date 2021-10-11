<template>
  <div>
    <q-file
      :label="$t('digital-signature.sign.select-private-key')"
      prepend-icon="mdi-message-text"
      outlined
      required
      v-model="privateKeyFile"
    />

    <q-file
      :label="$t('digital-signature.sign.select-file')"
      prepend-icon="mdi-message-text"
      outlined
      required
      v-model="fileToSign"
    />

    <HashSelector v-model="hash" />
  </div>
</template>

<script>
import HashSelector from 'components/HashSelector';
import { useQuasar } from 'quasar';
import { i18n } from 'boot/i18n';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Sign',

  components: {
    HashSelector,
  },

  setup: () => {
    const $q = useQuasar();

    const privateKeyFile = ref([]);
    const fileToSign = ref([]);
    const hash = ref('SHA1');

    const getBinaryString = (str) => {
      const array = new Uint8Array(str.length);
      for (let c = 0; c < str.length; ++c) {
        array[c] = str.charCodeAt(c);
      }
      return array;
    };

    const receiveSignatureToDownload = () =>
      window.ipcRenderer.receive('sign', (signature) => {
        const binarySignature = getBinaryString(signature);

        const url = window.URL.createObjectURL(
          new Blob([binarySignature], { type: 'application/octet-stream' })
        );
        window.ipcRenderer.send('download', {
          url,
          properties: {
            defaultFilename: `${i18n.global.t(
              'crypto-file-dialog.default-filename.signature'
            )}.bin`,
          },
        });
      });

    const receiveDownload = () =>
      window.ipcRenderer.receive('download', (savedPath) => {
        console.log(savedPath);

        $q.notify({
          message: i18n.global.t('toast.signature.successfully-signed'),
          color: 'green',
        });
      });

    const receiveError = () =>
      window.ipcRenderer.receive('error', () => {
        $q.notify({
          message: i18n.global.t('toast.signature.not-signed'),
          color: 'red',
        });
      });

    if ($q.platform.is.electron) {
      receiveSignatureToDownload();
      receiveDownload();
      receiveError();
    }

    const sign = () => {
      if (!privateKeyFile.value) return;
      if (!fileToSign.value) return;

      const privateKeyPath = privateKeyFile.value.path;
      const fileToSignPath = fileToSign.value.path;

      if ($q.platform.is.electron) {
        window.ipcRenderer.send('sign', {
          privateKeyPath,
          fileToSignPath,
          hash: hash.value,
        });
      }
    };

    return {
      privateKeyFile,
      fileToSign,
      hash,
      sign,
    };
  },
});
</script>
