<template>
  <q-page>
    <q-card class="digital-signature-card">
      <q-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <q-toolbar-title>{{ $t('app.sign') }}</q-toolbar-title>
      </q-toolbar>

      <q-separator></q-separator>

      <q-form class="digital-signature-form">
        <q-toggle
          name="digest_switch"
          id="digest-switch"
          v-model="digest"
          :label="`Digest`"
        />

        <SignDigest v-if="digest" ref="sign_digest" />
        <SignFile v-else ref="sign_file" />
      </q-form>

      <div class="row justify-center">
        <q-btn
          color="blue"
          depressed
          no-caps
          :label="$t('app.sign')"
          @click="sign"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import SignFile from 'components/DigitalSignature/SignFile.vue';
import SignDigest from 'components/DigitalSignature/SignDigest.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Sign',

  components: {
    SignFile,
    SignDigest,
  },

  setup: () => {
    const digest = ref(false);
    const sign_digest = ref(null);
    const sign_file = ref(null);

    const sign = () => {
      if (digest.value) {
        sign_digest.value.sign();
      } else {
        sign_file.value.sign();
      }
    };

    return {
      digest,
      sign,
      sign_digest,
      sign_file,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'styles.scss';
</style>
