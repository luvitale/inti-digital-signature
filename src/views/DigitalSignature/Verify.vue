<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("app.verify")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="verify-form">
        <DigestSwitch v-model="digest" />

        <VerifyDigest v-if="digest" ref="verify_digest" />
        <VerifyFile v-else ref="verify_file" />

        <v-btn
          outlined
          color="success"
          depressed
          class="text-none"
          @click="verify"
        >
          {{ $t("app.verify") }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import DigestSwitch from "@/components/DigestSwitch";
import VerifyFile from "@/components/DigitalSignature/VerifyFile";
import VerifyDigest from "@/components/DigitalSignature/VerifyDigest";

export default {
  name: "Verify",

  components: {
    DigestSwitch,
    VerifyFile,
    VerifyDigest,
  },

  data: function () {
    return {
      digest: false,
    };
  },
  methods: {
    verify() {
      if (this.digest) {
        this.$refs.verify_digest.verify();
      } else {
        this.$refs.verify_file.verify();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
