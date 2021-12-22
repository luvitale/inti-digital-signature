import { app, ipcMain } from "electron";

import "./updater";
import "./inti";

ipcMain.on("get-version", (event) => {
  event.reply("get-version", app.getVersion());
});
