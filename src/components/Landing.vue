<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">{{ msg }}</h1>

        <p class="subheading font-weight-regular">
          {{ $t("inti-digital-signature-description") }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: "Landing",

  props: {
    msg: String,
  },

  data: () => ({}),
};
</script>
