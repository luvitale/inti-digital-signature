<template>
  <div class="generate-private-key">
    <GeneratePrivateKeyComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import GeneratePrivateKeyComponent from "@/components/DigitalSignature/GeneratePrivateKey.vue";

export default {
  name: "GeneratePrivateKey",
  components: {
    GeneratePrivateKeyComponent,
  },
};
</script>
