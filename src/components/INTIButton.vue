<template>
  <v-btn
    outlined
    color="success"
    depressed
    class="text-none"
    :disabled="disabled"
    @click="emitClick"
  >
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "INTIButton",

  props: {
    text: String,
    disabled: Boolean,
  },

  data: () => ({}),

  methods: {
    emitClick() {
      this.$emit("click");
    },
  },
};
</script>
