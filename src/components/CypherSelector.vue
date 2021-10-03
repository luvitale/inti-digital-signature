<template class="cypher-selector">
  <q-select
    class="cypher-changer"
    v-model="cypher"
    :options="cyphers"
    :label="$t('digital-signature.private-key.cypher-type')"
    dense
    hide-details
    menu-props="offset-y"
    @change="updateCypher"
  >
    <template v-slot:selection="data">
      {{ data.item.toUpperCase() }}
    </template>

    <template v-slot:item="data">
      {{ data.item.toUpperCase() }}
    </template>
  </q-select>
</template>

<script>
export default {
  name: 'CypherSelector',

  data() {
    return {
      cyphers: ['rsa', 'ec'],
      cypher: 'rsa',
    };
  },

  methods: {
    updateCypher() {
      this.$emit('input', this.cypher);
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
