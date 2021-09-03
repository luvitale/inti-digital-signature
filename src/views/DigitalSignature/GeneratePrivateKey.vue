<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title>{{
          $t("digital-signature.private-key.label")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-form class="digital-signature-form">
        <Cyphers v-model="type" />
        <ModulusLength
          :cypher="type"
          v-model="modulusLength"
          v-if="type !== 'ec'"
        />

        <v-btn
          outlined
          color="success"
          class="text-none"
          depressed
          @click="generatePrivateKey"
        >
          {{ $t("app.generate-private-key") }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import mixin from "./mixin";
import Cyphers from "@/components/Cyphers.vue";
import ModulusLength from "@/components/ModulusLength.vue";

export default {
  name: "GeneratePrivateKey",

  components: {
    Cyphers,
    ModulusLength,
  },

  mixins: [mixin],

  data() {
    return {
      type: "rsa",
      modulusLength: 2048,
      namedCurve: "sect239k1",
    };
  },
  methods: {
    generatePrivateKey() {
      window.ipcRenderer.send("generate-private-key", {
        type: this.type,
        modulusLength: this.modulusLength,
        namedCurve: this.namedCurve,
      });
      window.ipcRenderer.receive("generate-private-key", (/* privateKey */) => {
        this.$root.Toast.show({
          message: this.$t("toast.private-key.successfully-generated"),
        });
      });
      window.ipcRenderer.receive("error", (msg) => {
        this.$root.Toast.show({
          message: msg,
          color: "warning",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
