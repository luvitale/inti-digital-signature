<template>
  <v-dialog
    class="about-dialog-component"
    transition="dialog-top-transition"
    max-width="600"
    v-model="visible"
  >
    <v-card>
      <v-toolbar id="about-dialog-toolbar" color="primary" dark>
        <v-toolbar-title class="flex text-center">{{
          $t("app.title")
        }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div class="logo">
          <img
            id="app-icon"
            height="200"
            :alt="$t('app.logo')"
            src="@/assets/logo.png"
          />
        </div>
        <p class="about-dialog-description">
          {{ $t("app.about.description") }}
        </p>
        <div class="about-dialog-copyright">
          <div id="about-dialog-copyright-authors">
            <p>
              <u>{{ $t("app.authors.developer.description") }}:</u>&#32;
              <a
                href="https://luvitale.net"
                target="_blank"
                class="author-link-website"
                >{{ $t("app.authors.developer.name") }}</a
              >
            </p>
            <p>
              <u>{{ $t("app.authors.internship-tutor.description") }}:</u>&#32;
              <a class="author-link-website">{{
                $t("app.authors.internship-tutor.name")
              }}</a>
            </p>
          </div>
          <div id="about-dialog-copyright-description">
            <p id="about-dialog-department">
              <b>
                {{ $t("app.organization.department") }}
              </b>
            </p>

            <p id="about-dialog-organization">
              <a href="https://inti.gob.ar" target="_blank">
                {{ $t("app.organization.name") }}
              </a>
            </p>
          </div>
        </div>
        <v-divider id="about-divider"></v-divider>
        <div class="about-versions">
          <p>{{ $t("app.version") }}: {{ getVersion() }}</p>
        </div>
        <footer class="about-footer">
          <div class="link bug-report-link"></div>
        </footer>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn class="ta-0" text @click="closeDialog">{{
          $t("app.dialog.close")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    visible: false,
    version: "",
  }),
  methods: {
    openDialog() {
      this.visible = true;
    },
    closeDialog() {
      this.visible = false;
    },
    getVersion() {
      return this.version;
    },
  },
  mounted() {
    window.ipcRenderer.receive("open-about-dialog", () => {
      this.openDialog();
    });
    window.ipcRenderer.send("get-version");
    window.ipcRenderer.receive("get-version", (version) => {
      this.version = version;
    });
  },
};
</script>
<style>
.about-dialog-component {
  font-family: "Liberation Sans", sans-serif;
}

.about-dialog-description {
  font-size: 1.05rem;
}
.about-dialog-copyright {
  font-size: 1rem;
}

.about-dialog-copyright-description {
  font-size: 0.95rem;
}

.author-link-website {
  text-decoration-line: none;
}
#about-divider {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
</style>
