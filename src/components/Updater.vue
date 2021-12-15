<template>
  <v-snackbar
    :vertical="vertical"
    :color="color"
    :timeout="timer"
    v-model="showSnackbar"
    bottom
    center
  >
    <v-icon left>{{ icon }}</v-icon> {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        class="text-none"
        color="white"
        text
        v-bind="attrs"
        :disabled="updateButtonDisabled"
        @click="update"
        >{{ $t("app.updater.update-label") }}</v-btn
      >

      <v-btn
        class="text-none"
        color="white"
        text
        v-bind="attrs"
        @click="showSnackbar = false"
      >
        {{ $t("app.updater.close-label") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Updater",
  data() {
    return {
      updateButtonDisabled: false,
      showSnackbar: false,
      vertical: true,
      color: "",
      icon: "mdi-check",
      message: "",
      timer: -1, // -1 = no timeout
    };
  },
  mounted() {
    window.ipcRenderer.receive("updater", (info, obj) => {
      if (info == "update-available") {
        this.updateButtonDisabled = false;
        this.show(`${this.$t("app.updater.available-message")}`, "success", -1);
      }

      if (info == "update-not-available") {
        this.updateButtonDisabled = true;
        this.show(
          `${this.$t("app.updater.not-available-message")}`,
          "error",
          5000
        );
      } else if (info == "download-progress") {
        this.updateButtonDisabled = true;
        this.show(
          `${this.$t("app.updater.percent-message")}:  ${obj.percent}%
           ${this.$t("app.updater.speed-message")}: ${obj.bytesPerSecond}
           ${this.$t("app.updater.remaining-time-message")}: ${obj.eta} s`,
          "success",
          2000
        );
      } else if (info == "update-downloaded") {
        this.updateButtonDisabled = true;
        this.show(
          `${this.$t("app.updater.downloaded-message")}. ${this.$t(
            "app.updater.installing-message"
          )}`,
          "success",
          -1
        );
      }
    });
  },
  methods: {
    show(message, color, timer) {
      this.color = color;
      this.message = message;
      this.timer = timer;
      this.showSnackbar = true;
    },

    update() {
      this.showSnackbar = false;
      window.ipcRenderer.send("updater", "update");
    },
  },
};
</script>
