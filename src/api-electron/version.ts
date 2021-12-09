import { app, ipcMain } from "electron";

ipcMain.on("get-version", (event) => {
  event.reply("get-version", app.getVersion());
});
