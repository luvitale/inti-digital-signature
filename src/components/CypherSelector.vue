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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CypherSelector',

  setup: () => {
    const cyphers = ['rsa', 'ec'];
    const cypher = ref('rsa');

    const updateCypher = () => {
      this.$emit('input', cypher);
    };

    return {
      cyphers,
      cypher,
      updateCypher
    }
  },
});
</script>

<style>
.cypher-changer {
  min-width: 20%;
  max-width: 30%;
  margin: 2em auto;
  flex: 0 !important;
}
</style>
