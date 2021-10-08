<template>
  <q-page>
    <div class=".row text-center">
      <div class=".col mb-4">
        <h1 class="display-2 font-weight-bold mb-3">{{ msg }}</h1>

        <p class="subheading font-weight-regular">
          {{ $t('app.description') }}
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'Landing',

  props: {
    msg: String,
  },

  data: () => ({}),
};
</script>
