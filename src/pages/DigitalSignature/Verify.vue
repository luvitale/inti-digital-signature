<template>
  <q-container fluid>
    <q-card class="digital-signature-card">
      <q-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <q-toolbar-title>Verificar</q-toolbar-title>
      </q-toolbar>

      <q-divider></q-divider>

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
          v-model="signatureFilePath"
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
  </q-container>
</template>

<script>
import HashSelector from 'components/HashSelector';

export default {
  name: 'Verify',

  components: {
    HashSelector,
  },

  data: function () {
    return {
      publicKeyFile: [],
      signatureFilePath: [],
      originalFile: [],
      hash: '',
    };
  },
  methods: {
    verify() {
      if (!this.publicKeyFile) return;
      if (!this.signatureFilePath) return;
      if (!this.originalFile) return;

      const publicKeyPath = this.publicKeyFile.path;
      const signatureFilePath = this.signatureFilePath.path;
      const originalFilePath = this.originalFile.path;
      const hash = this.hash;
      window.ipcRenderer.send('verify', {
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        hash,
      });
      window.ipcRenderer.receive('verify', (isVerified) => {
        if (isVerified) {
          this.$root.Toast.show({
            message: this.$t('toast.verification.correct'),
            color: 'success',
          });
        } else {
          this.$root.Toast.show({
            message: this.$t('toast.verification.wrong'),
            color: 'error',
          });
        }
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
