<template>
  <v-container fluid>
    <v-form>
      <v-file-input
        label="Seleccioná los subtítulos"
        prepend-icon="mdi-message-text"
        outlined
        append-outer-icon="mdi-send"
        multiple
        chips
        v-model="files"
        @click:append-outer="processSubtitles"
      />
    </v-form>

    <div class="pills">
      <Pill
        v-for="word in groupedWords"
        :key="word.name"
        :name="word.name"
        :amount="word.amount"
      />
    </div>
  </v-container>
</template>

<script>
import Pill from "./Pill";

export default {
  components: { Pill },
  data: function () {
    return {
      files: [],
      groupedWords: [],
    };
  },
  methods: {
    processSubtitles() {
      window.ipcRenderer.send("blabla", "ping");
      window.ipcRenderer.receive("blabla", (resp) => {
        console.log(resp);
      });
    },
  },
};
</script>

<style>
.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
