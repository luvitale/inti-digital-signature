import { ipcMain } from "electron";
import { autoUpdater, CancellationToken } from "electron-updater";

const cancellationToken = new CancellationToken();

ipcMain.on("updater", (event, info) => {
  if (info == "update") {
    autoUpdater.downloadUpdate(cancellationToken);
  }
});
