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

        <SignDigest v-if="digest" />
        <SignFile v-else />

        <HashSelector v-model="hash" />

        <INTIButton :text="$t('app.sign')" @click="sign" />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import DigestSwitch from "@/components/DigestSwitch.vue";
import SignFile from "@/components/DigitalSignature/SignFile.vue";
import SignDigest from "@/components/DigitalSignature/SignDigest.vue";
import HashSelector from "@/components/HashSelector.vue";
import INTIButton from "@/components/INTIButton.vue";

export default {
  name: "Sign",

  components: {
    DigestSwitch,
    SignFile,
    SignDigest,
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
    sign() {
      if (this.digest) {
        this.$store.dispatch("signDigest");
      } else {
        this.$store.dispatch("signFile");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
