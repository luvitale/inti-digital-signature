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

    const sign = () => {
      if (!privateKeyFile.value) return;
      if (!fileToSign.value) return;

      const privateKeyPath = privateKeyFile.value.path;
      const fileToSignPath = fileToSign.value.path;

      window.ipcRenderer.send('sign', {
        privateKeyPath,
        fileToSignPath,
        hash: hash.value,
      });
      window.ipcRenderer.receive('sign', (/* signature */) => {
        $q.notify({
          message: i18n.global.t('toast.signature.successfully-signed'),
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
      privateKeyFile,
      fileToSign,
      hash,
      sign,
    };
  },
});
</script>
