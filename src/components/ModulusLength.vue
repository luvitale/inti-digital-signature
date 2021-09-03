<template class="modulus-length">
  <v-select
    class="modulus-length-changer"
    v-model="modulusLength"
    :items="validLengths"
    :label="$t('digital-signature.private-key.modulus-length')"
    dense
    hide-details
    menu-props="offset-y"
    @click="getValidLengths"
    @change="updateLength"
  />
</template>

<script>
export default {
  name: "Cyphers",

  props: {
    cypher: {
      type: String,
      default: "rsa",
      required: true,
    },
  },

  data() {
    return {
      validLengths: [1024, 2048],
      modulusLength: 2048,
    };
  },

  methods: {
    updateLength() {
      this.$emit("input", this.modulusLength);
    },

    getValidLengths() {
      if (this.cypher === "rsa") {
        this.validLengths = [1024, 2048, 4096];
      } else if (this.cypher === "dsa") {
        this.validLengths = [1024, 2048, 3072];
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
