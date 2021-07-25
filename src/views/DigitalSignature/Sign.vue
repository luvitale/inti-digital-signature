<template>
  <div class="sign">
    <SignComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import SignComponent from "@/components/DigitalSignature/Sign.vue";

export default {
  name: "Sign",
  components: {
    SignComponent,
  },
};
</script>
