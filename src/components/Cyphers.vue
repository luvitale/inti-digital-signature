<template class="cyphers">
  <v-select
    class="cypher-changer"
    v-model="cypher"
    :items="cyphers"
    label="Algoritmo"
    dense
    hide-details
    menu-props="offset-y"
    @change="updateCypher"
  />
</template>

<script>
export default {
  name: "Cyphers",

  data() {
    return {
      cyphers: ["RSA", "DSA", "EC"],
      cypher: "RSA",
    };
  },

  methods: {
    updateCypher() {
      this.$emit("change", this.cypher);
    },
  },
};
</script>

<style>
.cypher-changer {
  min-width: 20%;
  max-width: 30%;
  margin: 2em auto;
  flex: 0 !important;
}
</style>
