<template>
  <v-container fluid>
    <v-file-input
      :label="$t('digital-signature.sign.select-private-key')"
      prepend-icon="mdi-message-text"
      outlined
      required
      v-model="privateKeyFile"
    />

    <v-file-input
      :label="$t('digital-signature.sign.select-digest-file')"
      prepend-icon="mdi-message-text"
      outlined
      required
      v-model="digestToSign"
    />

    <HashSelector v-model="hash" />
  </v-container>
</template>

<script>
import HashSelector from "@/components/HashSelector";

export default {
  name: "Sign",

  components: {
    HashSelector,
  },
  data: function () {
    return {
      privateKeyFile: [],
      digestToSign: [],
      hash: "",
    };
  },
  methods: {
    sign() {
      if (!this.privateKeyFile) return;
      if (!this.digestToSign) return;

      const privateKeyPath = this.privateKeyFile.path;
      const digestToSignPath = this.digestToSign.path;
      const hash = this.hash;
      window.ipcRenderer.send("sign-digest", {
        privateKeyPath,
        digestToSignPath,
        hash,
      });
      window.ipcRenderer.receive("sign-digest", (/* signature */) => {
        this.$root.Toast.show({
          message: this.$t("toast.signature.successfully-signed-digest"),
          color: "success",
        });
      });
      window.ipcRenderer.receive("error", (msg) => {
        this.$root.Toast.show({
          message: msg,
          color: "error",
        });
      });
    },
  },
};
</script>
