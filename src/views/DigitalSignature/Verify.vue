<template>
  <div class="verify">
    <VerifyComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import VerifyComponent from "@/components/DigitalSignature/Verify.vue";

export default {
  name: "Verify",
  components: {
    VerifyComponent,
  },
};
</script>
