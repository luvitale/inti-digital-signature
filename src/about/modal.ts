import { BrowserWindow } from "electron";

const openAboutModal = (
  htmlFile: string,
  parentWindow: any,
  width: any,
  height: any
) => {
  const modal = new BrowserWindow({
    width: width,
    height: height,
    modal: true,
    parent: parentWindow,
  });

  modal.loadFile(htmlFile);
  modal.removeMenu();

  return modal;
};

export default openAboutModal;
