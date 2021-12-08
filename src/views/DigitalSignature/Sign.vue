<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("app.sign")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="sign-form">
        <DigestSwitch v-model="digest" />

        <SignDigest v-if="digest" ref="sign_digest" />
        <SignFile v-else ref="sign_file" />

        <v-btn
          outlined
          color="success"
          depressed
          class="text-none"
          @click="sign"
        >
          {{ $t("app.sign") }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";
import DigestSwitch from "@/components/DigestSwitch";
import SignFile from "@/components/DigitalSignature/SignFile.vue";
import SignDigest from "@/components/DigitalSignature/SignDigest.vue";

export default {
  name: "Sign",

  mixins: [mixin],

  components: {
    DigestSwitch,
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
@import "styles.scss";
</style>
