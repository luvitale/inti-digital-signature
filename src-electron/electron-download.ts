import { ipcMain, BrowserWindow } from 'electron';
import { download } from 'electron-dl';

const enableDownloadListener = (mainWindow: BrowserWindow | null) => {
  ipcMain.on('download', async (event, info) => {
    console.log(info);
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      const dl = await download(win, info.url, { filename: info.properties.defaultFilename, saveAs: true });
      const savedPath = dl.getSavePath();
      mainWindow?.webContents.send('download', savedPath);
    }
  })
}

export { enableDownloadListener }
