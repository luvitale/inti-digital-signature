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
        <CypherSelector v-model="type" />
        <ModulusLengthSelector
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
import browserDS from "@/middleware/digital-signature";
import CypherSelector from "@/components/CypherSelector.vue";
import ModulusLengthSelector from "@/components/ModulusLengthSelector.vue";

export default {
  name: "GeneratePrivateKey",

  components: {
    CypherSelector,
    ModulusLengthSelector,
  },

  mixins: [mixin],

  data() {
    return {
      type: "rsa",
      modulusLength: 2048,
      namedCurve: "P-256",
    };
  },
  methods: {
    generatePrivateKey() {
      if (process.env.IS_ELECTRON) {
        window.ipcRenderer.send("generate-private-key", {
          type: this.type,
          modulusLength: this.modulusLength,
          namedCurve: this.namedCurve,
        });
        window.ipcRenderer.receive(
          "generate-private-key",
          (/* privateKey */) => {
            this.$root.Toast.show({
              message: this.$t("toast.private-key.successfully-generated"),
            });
          }
        );
        window.ipcRenderer.receive("error", (msg) => {
          this.$root.Toast.show({
            message: msg,
            color: "warning",
          });
        });
      } else {
        browserDS.generatePrivateKey();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
