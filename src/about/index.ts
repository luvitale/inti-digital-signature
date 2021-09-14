import { BrowserWindow } from "electron";
import path from "path";
import "./backend";
declare const __static: string;

const openAboutModal = (htmlFile: string, parentWindow: BrowserWindow) => {
  const width = 600;
  const height = 450;

  const modal = new BrowserWindow({
    width: width,
    height: height,
    modal: true,
    parent: parentWindow,
    webPreferences: {
      // Required for Spectron testing
      enableRemoteModule: !!process.env.IS_TEST,

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.resolve(__static, "about", "preload.js"),
    },
  });

  modal.loadFile(htmlFile);
  modal.removeMenu();

  return modal;
};

export default openAboutModal;
