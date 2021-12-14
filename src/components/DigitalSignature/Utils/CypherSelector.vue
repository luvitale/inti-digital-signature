<template class="cypher-selector">
  <v-select
    class="cypher-changer"
    v-model="cypher"
    :items="cyphers"
    :label="$t('digital-signature.private-key.cypher-type')"
    :rules="[
      (v) =>
        !!v || $t('digital-signature.utils.cypher-selector.is-required-label'),
    ]"
    dense
    menu-props="offset-y"
    required
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
  name: "CypherSelector",

  computed: {
    cypher: {
      get() {
        return this.$store.state.digitalSignature.type;
      },

      set(type) {
        this.$store.dispatch("setType", type);
      },
    },
  },

  data() {
    return {
      cyphers: ["rsa", "ec"],
    };
  },
};
</script>

<style>
.cypher-changer {
  width: 50%;
  min-width: 20%;
  max-width: 50%;
  margin: 2em auto;
  flex: 0 !important;
}
</style>
