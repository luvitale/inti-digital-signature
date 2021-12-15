"use strict";
declare const __static: string;

import { app, protocol, BrowserWindow, screen, nativeTheme } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import path from "path";
import "@/api-electron";
import i18n from "@/i18n";
import menuFactoryService from "@/services/menu-factory";

import { autoUpdater } from "electron-updater";
import logger from "electron-log";

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow(dimensions: any) {
  // https://www.electronjs.org/docs/api/native-theme#nativethemethemesource
  nativeTheme.themeSource = "system";

  // Create the browser window.
  const win = new BrowserWindow({
    width: dimensions.width,
    height: dimensions.height,
    minWidth: dimensions.width * 0.75,
    minHeight: dimensions.height * 0.75,
    webPreferences: {
      // Required for Spectron testing
      enableRemoteModule: !!process.env.IS_TEST,

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.resolve(__static, "preload.js"),
    },
  });

  win.setTitle(i18n.t("app.title") as string);
  new menuFactoryService.buildMenu(app, win);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  new menuFactoryService.buildMenu(app, win);

  win.setTitle(i18n.t("app.title") as string);
  win.maximize();

  // Electron Updater

  let show = false;

  /* Checking for updates */
  autoUpdater.on("checking-for-update", () => {
    console.log(i18n.t("app.updater.checking-message"));
    win.webContents.send("updater", "checking-for-update");
  });

  /* No updates available */
  autoUpdater.on("update-not-available", (info) => {
    console.log(info);
    win.webContents.send("updater", "update-available", { show });
    if (!show) show = true;
  });

  /* New Update Available */
  autoUpdater.on("update-available", (info) => {
    console.log(info);
    win.webContents.send("updater", "update-not-available");
  });

  /* Download Status Report */
  autoUpdater.on("download-progress", (progressObj) => {
    console.log(
      `${i18n.t("app.updater.percent-message")}:  ${progressObj.percent}%`
    );
    console.log(
      `${i18n.t("app.updater.speed-message")}: ${progressObj.bytesPerSecond}`
    );
    console.log(
      `${i18n.t("app.updater.remaining-time-message")}: ${progressObj.eta}`
    );
    win.webContents.send("updater", "download-progress", progressObj);
  });

  /* Download Completion Message */
  autoUpdater.on("update-downloaded", (info) => {
    console.log("Update downloaded: " + info);
    win.webContents.send("updater", "update-downloaded");
    // Wait 10 seconds, then quit and install
    setTimeout(() => {
      autoUpdater.quitAndInstall();
    }, 10000);
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    const display = screen.getPrimaryDisplay();
    const dimensions = display.workAreaSize;
    createWindow(dimensions);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e: any) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  const display = screen.getPrimaryDisplay();
  const dimensions = display.workAreaSize;
  createWindow(dimensions);

  if (process.platform === "win32") {
    autoUpdater.autoDownload = false;
    autoUpdater.checkForUpdates();

    logger.transports.file.level = "info";
    autoUpdater.logger = logger;
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
