<template>
  <q-page>
    <q-card class="digital-signature-card">
      <q-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <q-toolbar-title>Verificar</q-toolbar-title>
      </q-toolbar>

      <q-separator></q-separator>

      <q-form class="digital-signature-form">
        <q-file
          :label="$t('digital-signature.verify.select-public-key')"
          prepend-icon="mdi-message-text"
          outlined
          required
          v-model="publicKeyFile"
        />

        <q-file
          :label="$t('digital-signature.verify.select-signature')"
          prepend-icon="mdi-message-text"
          outlined
          required
          v-model="signatureFile"
        />

        <q-file
          :label="$t('digital-signature.verify.select-original-file')"
          prepend-icon="mdi-message-text"
          outlined
          required
          v-model="originalFile"
        />

        <HashSelector v-model="hash" />
      </q-form>

      <div class="row justify-center">
        <q-btn
          color="blue"
          depressed
          no-caps
          :label="$t('app.verify')"
          @click="verify"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import HashSelector from 'components/HashSelector';
import { useQuasar } from 'quasar';
import { i18n } from 'boot/i18n';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Verify',

  components: {
    HashSelector,
  },

  setup: () => {
    const $q = useQuasar();

    const publicKeyFile = ref([]);
    const signatureFile = ref([]);
    const originalFile = ref([]);
    const hash = ref('SHA1');

    const verify = () => {
      if (!publicKeyFile.value) return;
      if (!signatureFile.value) return;
      if (!originalFile.value) return;

      const publicKeyPath = publicKeyFile.value.path;
      const signatureFilePath = signatureFile.value.path;
      const originalFilePath = originalFile.value.path;

      window.ipcRenderer.send('verify', {
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        hash: hash.value,
      });
      window.ipcRenderer.receive('verify', (isVerified) => {
        if (isVerified) {
          $q.notify({
            message: i18n.global.t('toast.verification.correct'),
            color: 'success',
          });
        } else {
          $q.notify({
            message: i18n.global.t('toast.verification.wrong'),
            color: 'error',
          });
        }
      });
      window.ipcRenderer.receive('error', (msg) => {
        $q.notify({
          message: msg,
          color: 'error',
        });
      });
    };

    return {
      publicKeyFile,
      signatureFile,
      originalFile,
      hash,
      verify,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
