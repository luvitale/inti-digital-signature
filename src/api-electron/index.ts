import { app, ipcMain, nativeTheme } from "electron";
import i18n from "@/i18n";

import "./updater";
import "./inti";

ipcMain.on("get-version", (event) => {
  event.reply("get-version", app.getVersion());
});

ipcMain.on("get-language", (event) => {
  event.reply("change-language", i18n.locale);
});

ipcMain.on("get-theme", (event) => {
  event.reply("change-theme", nativeTheme.themeSource);
});

ipcMain.on("change-language", (event, locale) => {
  i18n.locale = locale;
  event.reply("change-language", i18n.locale);
});

ipcMain.on("change-theme", (event, theme) => {
  nativeTheme.themeSource = theme;
  event.reply("change-theme", nativeTheme.themeSource);
});
