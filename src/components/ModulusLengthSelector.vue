<template class="modulus-length-selector">
  <v-select
    class="modulus-length-changer"
    v-model="modulusLength"
    :items="validLengths"
    :label="$t('digital-signature.private-key.modulus-length')"
    dense
    hide-details
    menu-props="offset-y"
    @click="getValidLengths"
  />
</template>

<script>
export default {
  name: "ModulusLengthSelector",

  computed: {
    cypher() {
      return this.$store.state.digitalSignature.type;
    },

    modulusLength: {
      get() {
        return this.$store.state.digitalSignature.modulusLength;
      },
      set(modulusLength) {
        this.$store.dispatch("setModulusLength", modulusLength);
      },
    },
  },

  data() {
    return {
      validLengths: [1024, 2048, 4096],
    };
  },

  methods: {
    getValidLengths() {
      if (this.cypher === "rsa") {
        this.validLengths = [1024, 2048, 4096];
      }
    },
  },
};
</script>

<style>
.modulus-length-changer {
  min-width: 20%;
  max-width: 30%;
  margin: 2em auto;
  flex: 0 !important;
}
</style>
