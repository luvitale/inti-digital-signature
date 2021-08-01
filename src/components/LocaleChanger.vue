<template class="locale-changer">
  <v-select
    class="locale-changer"
    v-model="$i18n.locale"
    :items="langs"
    :label="$t('language-label')"
    dense
    hide-details
    menu-props="offset-y"
  >
    <template v-slot:selection="{ item }">
      {{ item }} - {{ $t(item + "-lang-description") }}
    </template>
    <template v-slot:item="{ item }">
      {{ item }} - {{ $t(item + "-lang-description") }}
    </template>
  </v-select>
</template>

<style>
.locale-changer {
  min-width: 20%;
  max-width: 30%;
  margin: 0 auto;
  flex: 0 !important;
}
</style>

<script>
export default {
  name: "LocaleChanger",
  data() {
    return { langs: ["en", "es"] };
  },
};
</script>
