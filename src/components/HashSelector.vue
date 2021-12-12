<template class="hash-selector">
  <v-select
    class="hash-changer"
    v-model="hash"
    :items="hashes"
    :label="$t('digital-signature.hash')"
    dense
    hide-details
    menu-props="offset-y"
    @change="updateHash"
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
  name: "HashSelector",

  props: {
    value: {
      type: String,
      default: "SHA1",
    },
  },

  data() {
    return {
      hashes: ["SHA1", "SHA256", "SHA384", "SHA512"],
      hash: this.value,
    };
  },

  methods: {
    updateHash() {
      this.$emit("input", this.hash);
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
