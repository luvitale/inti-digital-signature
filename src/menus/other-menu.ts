import i18n from "@/i18n";
import path from "path";
import menuFactory from "@/services/menu-factory";
import { App, BrowserWindow, nativeTheme } from "electron";
import openAboutModal from "@/about/modal";
declare const __static: string;

export default (app: App, mainWindow: BrowserWindow) => {
  mainWindow.setTitle(i18n.t("app.title") as string);

  const menu = [];

  const fileMenu = [
    {
      label: i18n.t("window.file.reload"),
      accelerator: "Ctrl+R",
      click: function (_item: any, focusedWindow: { reload: () => void }) {
        focusedWindow.reload();
      },
    },
    {
      label: i18n.t("window.file.quit"),
      accelerator: "Ctrl+Q",
      click: function () {
        app.quit();
      },
    },
  ];

  const helpMenu = [
    {
      label: i18n.t("window.help.about-app"),
      click: () =>
        openAboutModal(
          path.resolve(__static, "about.html"),
          mainWindow,
          600,
          400
        ),
    },
  ];

  const languageMenu = i18n.availableLocales.map((languageCode) => {
    return {
      label: languageCode + " - " + i18n.t(`language.${languageCode}`),
      type: "radio",
      checked: i18n.locale === languageCode,
      click: function () {
        i18n.locale = languageCode;
        new menuFactory.buildMenu(app, mainWindow);
        mainWindow.webContents.send("change-language", languageCode);
      },
    };
  });

  const themeMenu = ["light", "dark"].map((style) => {
    return {
      label: i18n.t(`window.view.theme.mode.${style}`),
      type: "radio",
      checked: nativeTheme.themeSource === style,
      click: function () {
        nativeTheme.themeSource = style as any;
      },
    };
  });

  const viewMenu = [
    {
      label: i18n.t("language.label"),
      submenu: languageMenu,
    },
    {
      label: i18n.t("window.view.theme.label"),
      submenu: themeMenu,
    },
    {
      type: "separator",
    },
    {
      label: i18n.t("window.view.fullscreen"),
      accelerator: "Ctrl+Command+F",
      click: function (
        _item: any,
        focusedWindow: {
          setFullScreen: (arg0: boolean) => void;
          isFullScreen: () => any;
        }
      ) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      },
    },
    {
      label: i18n.t("window.view.minimize"),
      accelerator: "Command+M",
      role: "minimize",
    },
  ];

  menu.push({
    label: i18n.t("window.file.label"),
    submenu: fileMenu,
  });

  menu.push({
    label: i18n.t("window.view.label"),
    submenu: viewMenu,
  });

  menu.push({
    label: i18n.t("window.help.label"),
    submenu: helpMenu,
  });

  return menu;
};
