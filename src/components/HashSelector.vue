<template class="hash-selector">
  <q-select
    class="hash-changer"
    v-model="hash"
    :options="hashes"
    :label="$t('digital-signature.hash')"
    dense
    hide-details
    menu-props="offset-y"
    @change="updateHash"
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
  name: 'HashSelector',

  setup: () => {
    const hashes = ['SHA1', 'SHA256', 'SHA384', 'SHA512'];
    const hash = ref('SHA1');

    const updateHash = () => {
      this.$emit('input', hash);
    };

    return {
      hashes,
      hash,
      updateHash,
    }
  },
});
</script>

<style>
.hash-changer {
  min-width: 20%;
  max-width: 30%;
  margin: 2em auto;
  flex: 0 !important;
}
</style>
