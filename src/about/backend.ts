import { ipcMain, shell } from "electron";
import i18n from "@/i18n";

ipcMain.on("about:info", async (event) => {
  const info = {
    window_title: i18n.t("window.help.about-app"),
    title: i18n.t("app.title"),
    description: i18n.t("app.description"),
    copyright_description: i18n.t("app.copyright"),
    copyright_authors: [
      { name: "Luciano Nahuel Vitale", link: "https://luvitale.net" },
    ],
    logo: "logo.png",
  };
  event.reply("about:info", info);
});

ipcMain.on("go-to-author-website", async (event, link) => {
  console.log(link);
  shell.openExternal(link);
});
