<template>
  <q-container fluid>
    <q-card class="digital-signature-card" v-if="true">
      <q-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <q-toolbar-title>{{ $t('app.sign') }}</q-toolbar-title>
      </q-toolbar>

      <q-divider></q-divider>

      <q-form class="digital-signature-form">
        <q-switch id="digest-switch" v-model="digest" flat :label="`Digest`" />

        <SignDigest v-if="digest" ref="sign_digest" />
        <SignFile v-else ref="sign_file" />
      </q-form>

      <div class="row justify-center">
        <q-btn
          color="blue"
          depressed
          no-caps
          @click="sign"
          :label="$t('app.sign')"
        />
      </div>
    </q-card>
  </q-container>
</template>

<script>
import mixin from './mixin';
import SignFile from 'components/DigitalSignature/SignFile.vue';
import SignDigest from 'components/DigitalSignature/SignDigest.vue';

export default {
  name: 'Sign',

  mixins: [mixin],

  components: {
    SignFile,
    SignDigest,
  },

  data: function () {
    return {
      digest: false,
    };
  },
  methods: {
    sign() {
      if (this.digest) {
        this.$refs.sign_digest.sign();
      } else {
        this.$refs.sign_file.sign();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
