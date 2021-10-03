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
export default {
  name: 'HashSelector',

  data() {
    return {
      hashes: ['SHA1', 'SHA256', 'SHA384', 'SHA512'],
      hash: 'SHA1',
    };
  },

  methods: {
    updateHash() {
      this.$emit('input', this.hash);
    },
  },
};
</script>

<style>
.hash-changer {
  min-width: 20%;
  max-width: 30%;
  margin: 2em auto;
  flex: 0 !important;
}
</style>
