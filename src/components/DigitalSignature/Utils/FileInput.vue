<template>
  <v-file-input
    prepend-icon="mdi-message-text"
    outlined
    :label="label"
    :rules="rules"
    v-model="file"
    required
  />
</template>

<script>
export default {
  name: "FileInput",
  props: {
    value: {
      type: File,
      default: undefined,
    },
    label: {
      type: String,
      default: "",
    },
    requiredLabel: {
      type: String,
      default: "",
    },
  },
  computed: {
    rules() {
      return [(v) => !!v || this.requiredLabel];
    },
    file: {
      get() {
        return this.value;
      },
      set(file) {
        this.$emit("input", file);
      },
    },
  },
};
</script>
