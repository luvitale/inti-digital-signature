<template class="modulus-length">
  <v-select
    class="modulus-length-changer"
    v-model="modulusLength"
    :items="validLengths"
    :label="$t('digital-signature.private-key.modulus-length')"
    dense
    hide-details
    menu-props="offset-y"
    @change="updateLength"
  />
</template>

<script>
export default {
  name: "Cyphers",

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
