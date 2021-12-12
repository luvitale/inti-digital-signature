<template>
  <v-btn
    outlined
    color="success"
    depressed
    class="text-none"
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
  },

  data: () => ({}),

  methods: {
    emitClick() {
      this.$emit("click");
    },
  },
};
</script>
