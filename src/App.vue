<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>INTI Digital Signature</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <DigitalSignature />
    </v-main>
  </v-app>
</template>

<script>
import DigitalSignature from "./components/DigitalSignature";

export default {
  name: "App",

  components: {
    DigitalSignature,
  },

  data: () => ({
    //
  }),
};
</script>
