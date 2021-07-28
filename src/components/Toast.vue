<template>
  <v-snackbar
    :color="color"
    :timeout="timer"
    v-model="showSnackbar"
    bottom
    center>

    <v-icon left>{{icon}}</v-icon>{{message}}

  </v-snackbar>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      showSnackbar: false,
      message: '',
      color: 'success',
      icon: 'mdi-check',
      timer: 4000
    }
  },
  methods:{
    show(data) {
      this.showSnackbar = true
      this.message = data.message || 'missing "message".'
      this.color = data.color || 'success'
      this.timer = data.timer || 4000
      this.icon = data.icon || 'mdi-check'
    }
  }
}
</script>