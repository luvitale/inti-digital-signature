<template>
  <div class="generate-public-key">
    <GeneratePublicKeyComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import GeneratePublicKeyComponent from "@/components/DigitalSignature/GeneratePublicKey.vue";

export default {
  name: "GeneratePublicKey",
  components: {
    GeneratePublicKeyComponent,
  },
};
</script>
