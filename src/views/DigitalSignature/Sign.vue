<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title>{{ $t("app.sign") }}</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form class="digital-signature-form">
        <v-switch
          id="digest-switch"
          v-model="digest"
          flat
          :label="$t('digest-switch-label')"
        />

        <SignDigest v-if="digest" ref="sign_digest" />
        <SignFile v-else ref="sign_file" />
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed class="text-none" @click="sign">
          {{ $t("app.sign") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";
import SignFile from "@/components/DigitalSignature/SignFile.vue";
import SignDigest from "@/components/DigitalSignature/SignDigest.vue";

export default {
  name: "Sign",

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
@import "styles.scss";
</style>
