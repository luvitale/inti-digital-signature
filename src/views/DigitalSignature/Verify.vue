<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title>{{ $t("app.verify") }}</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form class="digital-signature-form">
        <v-switch
          id="digest-switch"
          v-model="digest"
          flat
          :label="$t('digest-switch-label')"
        />

        <VerifyDigest v-if="digest" ref="verify_digest" />
        <VerifyFile v-else ref="verify_file" />
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed class="text-none" @click="verify">
          {{ $t("app.verify") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import VerifyFile from "@/components/DigitalSignature/VerifyFile";
import VerifyDigest from "@/components/DigitalSignature/VerifyDigest";

export default {
  name: "Verify",

  components: {
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
