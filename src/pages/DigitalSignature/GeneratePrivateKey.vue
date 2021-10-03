<template>
  <q-container fluid>
    <q-card class="digital-signature-card">
      <q-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <q-toolbar-title>{{
          $t('digital-signature.private-key.label')
        }}</q-toolbar-title>
      </q-toolbar>

      <q-divider></q-divider>

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
  </q-container>
</template>

<script>
import mixin from './mixin';
import CypherSelector from 'components/CypherSelector.vue';
import ModulusLengthSelector from 'components/ModulusLengthSelector.vue';

export default {
  name: 'GeneratePrivateKey',

  components: {
    CypherSelector,
    ModulusLengthSelector,
  },

  mixins: [mixin],

  data() {
    return {
      type: 'rsa',
      modulusLength: 2048,
      namedCurve: 'P-256',
    };
  },
  methods: {
    generatePrivateKey() {
      window.ipcRenderer.send('generate-private-key', {
        type: this.type,
        modulusLength: this.modulusLength,
        namedCurve: this.namedCurve,
      });
      window.ipcRenderer.receive('generate-private-key', (/* privateKey */) => {
        this.$root.Toast.show({
          message: this.$t('toast.private-key.successfully-generated'),
        });
      });
      window.ipcRenderer.receive('error', (msg) => {
        this.$root.Toast.show({
          message: msg,
          color: 'warning',
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
