<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("app.verify")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="verify-form" ref="form">
        <DigestSwitch v-model="digest" />

        <VerifyDigest v-if="digest" />
        <VerifyFile v-else />

        <HashSelector v-model="hash" />

        <INTIButton
          :disabled="!valid"
          :text="$t('app.verify')"
          @click="verify"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import DigestSwitch from "@/components/DigitalSignature/Utils/DigestSwitch.vue";
import VerifyFile from "@/components/DigitalSignature/Verify/File.vue";
import VerifyDigest from "@/components/DigitalSignature/Verify/Digest.vue";
import HashSelector from "@/components/DigitalSignature/Utils/HashSelector.vue";
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

    data() {
      return {
        valid: true,
      };
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
      if (!this.$refs.form.validate()) return;

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
