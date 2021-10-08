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
      label="Select digest file"
      prepend-icon="mdi-message-text"
      outlined
      required
      v-model="digestToSign"
    />
  </div>
</template>

<script>
import { useQuasar } from 'quasar';
import { i18n } from 'boot/i18n';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Sign',

  setup: () => {
    const $q = useQuasar();

    const privateKeyFile = ref([]);
    const digestToSign = ref([]);

    const sign = () => {
      if (!privateKeyFile.value) return;
      if (!digestToSign.value) return;

      const privateKeyPath = privateKeyFile.value.path;
      const digestToSignPath = digestToSign.value.path;
      window.ipcRenderer.send('sign-digest', {
        privateKeyPath,
        digestToSignPath,
      });
      window.ipcRenderer.receive('sign-digest', (/* signature */) => {
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
      digestToSign,
      sign,
    };
  },
});
</script>
