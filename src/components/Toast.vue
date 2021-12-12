<template>
  <v-snackbar
    :color="color"
    :timeout="timer"
    v-model="showSnackbar"
    bottom
    center
  >
    <v-icon left>{{ icon }}</v-icon
    >{{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: "Toast",

  computed: {
    showSnackbar: {
      get() {
        return this.$store.state.toast.show;
      },
      set(show) {
        this.$store.commit("setShow", show);
      },
    },

    message() {
      return this.$store.state.toast.message;
    },

    color() {
      return this.$store.state.toast.color;
    },

    icon() {
      return this.$store.state.toast.icon;
    },

    timer() {
      return this.$store.state.toast.timer;
    },
  },
};
</script>
