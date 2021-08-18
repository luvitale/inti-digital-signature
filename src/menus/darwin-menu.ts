import i18n from "@/i18n";
import menuFactory from "@/services/menu-factory";
import { App, BrowserWindow, nativeTheme } from "electron";

export default (app: App, mainWindow: BrowserWindow) => {
  mainWindow.setTitle(i18n.t("inti-digital-signature") as string);

  const menu = [];

  const mainMenu = [
    {
      label: i18n.t("about-app-description"),
      role: "about",
    },
    {
      type: "separator",
    },
    {
      label: i18n.t("hide-app"),
      accelerator: "Command+H",
      role: "hide",
    },
    {
      label: i18n.t("hide-others"),
      accelerator: "Command+Shift+H",
      role: "hideothers",
    },
    {
      label: i18n.t("show-all"),
      role: "unhide",
    },
    {
      type: "separator",
    },
    {
      label: i18n.t("quit-label"),
      accelerator: "Command+Q",
      click: () => {
        app.quit();
      },
    },
  ];

  const helpMenu = [
    {
      label: i18n.t("about-app"),
    },
  ];

  const languageMenu = i18n.availableLocales.map((languageCode) => {
    return {
      label: languageCode + " - " + i18n.t(`lang-description-${languageCode}`),
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
      label: i18n.t(`${style}-mode-label`),
      type: "radio",
      checked: nativeTheme.themeSource === style,
      click: function () {
        nativeTheme.themeSource = style as any;
      },
    };
  });

  const viewMenu = [
    {
      label: i18n.t("language-label"),
      submenu: languageMenu,
    },
    {
      label: i18n.t("theme-label"),
      submenu: themeMenu,
    },
    {
      type: "separator",
    },
    {
      label: i18n.t("reload-label"),
      accelerator: "Command+R",
      click: function (_item: any, focusedWindow: { reload: () => void }) {
        focusedWindow.reload();
      },
    },
    {
      label: i18n.t("full-screen-label"),
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
      label: i18n.t("minimize-label"),
      accelerator: "Command+M",
      role: "minimize",
    },
  ];

  menu.push({
    label: i18n.t("inti-digital-signature"),
    submenu: mainMenu,
  });

  menu.push({
    label: i18n.t("view-label"),
    submenu: viewMenu,
  });

  menu.push({
    label: i18n.t("help-label"),
    submenu: helpMenu,
  });

  return menu;
};
