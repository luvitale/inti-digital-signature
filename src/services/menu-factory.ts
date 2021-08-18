import { App, BrowserWindow, Menu } from "electron";

const platform = process.platform;

import darwinTemplate from "../menus/darwin-menu";
import otherTemplate from "../menus/other-menu";

const menu = null as unknown as Menu;

class MenuFactoryService {
  menu: Menu;
  buildMenu: typeof buildMenu;
  constructor(menu: Menu) {
    this.menu = menu;

    this.buildMenu = buildMenu;
  }
}

class buildMenu {
  menu: Menu;
  constructor(app: App, mainWindow: BrowserWindow) {
    if (platform === "darwin") {
      this.menu = Menu.buildFromTemplate(
        darwinTemplate(app, mainWindow) as Electron.MenuItemConstructorOptions[]
      );
      Menu.setApplicationMenu(this.menu);
    } else {
      this.menu = Menu.buildFromTemplate(
        otherTemplate(app, mainWindow) as Electron.MenuItemConstructorOptions[]
      );
      mainWindow.setMenu(this.menu);
    }
  }
}

export default new MenuFactoryService(menu);
