<template>
  <v-layout column align-center>
    <v-flex xs12 md2>
      <v-switch
        id="digest-switch"
        v-model="digest"
        flat
        :label="$t('digest-switch-label')"
        @change="toggleDigest"
      ></v-switch>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "DigestSwitch",
  data() {
    return {
      digest: false,
    };
  },
  methods: {
    toggleDigest() {
      this.$emit("input", this.digest);
    },
  },
});
</script>
