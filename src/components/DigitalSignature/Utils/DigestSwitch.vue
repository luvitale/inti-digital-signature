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
<script>
export default {
  name: "DigestSwitch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      digest: this.value,
    };
  },
  methods: {
    toggleDigest() {
      this.$emit("input", this.digest);
    },
  },
};
</script>
