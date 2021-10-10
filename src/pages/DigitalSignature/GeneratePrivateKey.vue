<template>
  <q-page>
    <q-card class="digital-signature-card">
      <q-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <q-toolbar-title>{{
          $t('digital-signature.private-key.label')
        }}</q-toolbar-title>
      </q-toolbar>

      <q-separator></q-separator>

      <q-form class="digital-signature-form">
        <CypherSelector v-model="type" />
        <ModulusLengthSelector
          :cypher="type"
          v-model="modulusLength"
          v-if="type !== 'ec'"
        />

        <div class="row justify-center">
          <q-btn
            :label="$t('app.generate-private-key')"
            class="q-mt-md"
            color="blue"
            no-caps
            @click="generatePrivateKey"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import CypherSelector from 'components/CypherSelector.vue';
import ModulusLengthSelector from 'components/ModulusLengthSelector.vue';
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { i18n } from 'boot/i18n';

export default defineComponent({
  name: 'GeneratePrivateKey',

  components: {
    CypherSelector,
    ModulusLengthSelector,
  },

  setup: () => {
    const $q = useQuasar();

    const type = ref('rsa');
    const modulusLength = ref(2048);
    const namedCurve = ref('P-256');

    const receivePrivateKeyToDownload = () =>
      window.ipcRenderer.receive('generate-private-key', (privateKey) => {
        const url = window.URL.createObjectURL(new Blob([privateKey]));
        window.ipcRenderer.send('download', {
          url,
          properties: {
            defaultFilename: `${i18n.global.t(
              'crypto-file-dialog.default-filename.private-key'
            )}.pem`,
          },
        });
      });

    const receiveDownload = () =>
      window.ipcRenderer.receive('download', (savedPath) => {
        console.log(savedPath);

        $q.notify({
          message: i18n.global.t('toast.private-key.successfully-generated'),
          color: 'green',
        });
      });

    const receiveError = () =>
      window.ipcRenderer.receive('error', () => {
        $q.notify({
          message: i18n.global.t('toast.private-key.not-generated'),
          color: 'red',
        });
      });

    receivePrivateKeyToDownload();
    receiveDownload();
    receiveError();

    const generatePrivateKey = () => {
      window.ipcRenderer.send('generate-private-key', {
        type: type.value,
        modulusLength: modulusLength.value,
        namedCurve: namedCurve.value,
      });
    };

    return {
      type,
      modulusLength,
      namedCurve,
      generatePrivateKey,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
