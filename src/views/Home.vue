<template>
  <div class="home">
    <img alt="Logo del INTI" src="../assets/logo.png" />
    <Landing msg="INTI Digital Signature" />
  </div>
</template>

<script>
// @ is an alias to /src
import Landing from "@/components/Landing.vue";

export default {
  name: "Home",
  components: {
    Landing,
  },
};
</script>
