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

        <VerifyDigest v-if="digest" />
        <VerifyFile v-else />

        <HashSelector v-model="hash" />

        <INTIButton :text="$t('app.verify')" @click="verify" />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import DigestSwitch from "@/components/DigestSwitch.vue";
import VerifyFile from "@/components/DigitalSignature/VerifyFile.vue";
import VerifyDigest from "@/components/DigitalSignature/VerifyDigest.vue";
import HashSelector from "@/components/HashSelector.vue";
import INTIButton from "@/components/INTIButton.vue";

export default {
  name: "Verify",

  components: {
    DigestSwitch,
    VerifyFile,
    VerifyDigest,
    HashSelector,
    INTIButton,
  },

  computed: {
    digest: {
      get() {
        return this.$store.state.digitalSignature.digest;
      },
      set(value) {
        this.$store.dispatch("setDigest", value);
      },
    },

    hash: {
      get() {
        return this.$store.state.digitalSignature.hash;
      },
      set(hash) {
        this.$store.dispatch("setHash", hash);
      },
    },
  },

  methods: {
    verify() {
      if (this.digest) {
        this.$store.dispatch("verifyDigest");
      } else {
        this.$store.dispatch("verifyFile");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
