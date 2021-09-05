<template class="cyphers">
  <v-select
    class="cypher-changer"
    v-model="cypher"
    :items="cyphers"
    :label="$t('digital-signature.private-key.cypher-type')"
    dense
    hide-details
    menu-props="offset-y"
    @change="updateCypher"
  >
    <template slot="selection" slot-scope="data">
      {{ data.item.toUpperCase() }}
    </template>

    <template slot="item" slot-scope="data">
      {{ data.item.toUpperCase() }}
    </template>
  </v-select>
</template>

<script>
export default {
  name: "Cyphers",

  data() {
    return {
      cyphers: ["rsa", "ec"],
      cypher: "rsa",
    };
  },

  methods: {
    updateCypher() {
      this.$emit("input", this.cypher);
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
