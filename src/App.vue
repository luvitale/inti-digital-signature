<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 100vh"
    class="shadow-2 rounded-borders"
  >
    <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>

        <q-toolbar-title>{{ $t('app.title') }}</q-toolbar-title>

        <q-btn flat round dense icon="whatshot" />
      </q-toolbar>

      <q-tabs v-model="tab">
        <q-item name="home" to="/" active-class="navbar-link">{{
          $t('app.home')
        }}</q-item>
        <q-item
          name="generate-private-key"
          to="/generate-private-key"
          active-class="navbar-link"
          >{{ $t('app.generate-private-key') }}</q-item
        >
        <q-item
          name="generate-public-key"
          to="/generate-public-key"
          active-class="navbar-link"
          >{{ $t('app.generate-public-key') }}</q-item
        >
        <q-item
          name="generate-digest"
          to="/generate-digest"
          active-class="navbar-link"
          >Generar digesto</q-item
        >
        <q-item name="sign" to="/sign" active-class="navbar-link">{{
          $t('app.sign')
        }}</q-item>
        <q-item name="verify" to="/verify" active-class="navbar-link">{{
          $t('app.verify')
        }}</q-item>
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup: () => {
    return {
      tab: ref('home'),
    };
  },
});
</script>
