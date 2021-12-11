<template>
  <v-container fluid>
    <v-card class="digital-signature-card">
      <v-toolbar flat color="blue" dark class="digital-signature-toolbar">
        <v-toolbar-title class="flex text-center">{{
          $t("digital-signature.private-key.label")
        }}</v-toolbar-title>
      </v-toolbar>

      <v-form class="digital-signature-form" id="private-key-form">
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
import CypherSelector from "@/components/CypherSelector.vue";
import ModulusLengthSelector from "@/components/ModulusLengthSelector.vue";

export default {
  name: "GeneratePrivateKey",

  components: {
    CypherSelector,
    ModulusLengthSelector,
  },

  computed: {
    type: {
      get() {
        return this.$store.state.digitalSignature.type;
      },

      set(type) {
        this.$store.dispatch("setType", type);
      },
    },

    modulusLength: {
      get() {
        return this.$store.state.digitalSignature.modulusLength;
      },

      set(modulusLength) {
        this.$store.dispatch("setModulusLength", modulusLength);
      },
    },

    namedCurve: {
      get() {
        return this.$store.state.digitalSignature.namedCurve;
      },

      set(namedCurve) {
        this.$store.dispatch("setNamedCurve", namedCurve);
      },
    },
  },

  mounted() {
    window.ipcRenderer.receive("generate-private-key", (privateKeyFile) => {
      this.$store.dispatch(
        "showToast",
        this.$t("toast.private-key.successfully-generated")
      );
      this.$store.dispatch("setPrivateKeyFile", privateKeyFile);
    });
    window.ipcRenderer.receive("error", (msg) => {
      this.$store.dispatch("showToast", msg);
    });
  },

  methods: {
    generatePrivateKey() {
      this.$store.dispatch("generatePrivateKey");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "styles.scss";
</style>
