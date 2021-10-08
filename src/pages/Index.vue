<template>
  <q-page class="row items-center justify-evenly">
    <Landing :msg="$t('app.title')" />
  </q-page>
</template>

<script lang="ts">
import Landing from 'components/Landing.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    Landing,
  },
});
</script>
