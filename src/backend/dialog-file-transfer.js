import { dialog } from "electron";
import i18n from "../i18n";
import fs from "fs";

const save = async (data, defaultFilename) => {
  const file = await dialog.showSaveDialog({
    title: i18n.t("select-file-location-to-save"),
    defaultPath: defaultFilename,
    buttonLabel: i18n.t("save-file-button-label"),
    filters: [
      {
        name: i18n.t("pem-files-name"),
        extensions: ["pem"],
      },
    ],
    properties: [],
  });

  if (file.canceled) throw i18n.t("canceled-save-file");

  const dest = file.filePath.toString();

  console.log(dest);

  await fs.promises.writeFile(dest, data);

  console.log(i18n.t("saved-file"));
};

const saveBin = async (data, defaultFilename) => {
  const file = await dialog.showSaveDialog({
    title: i18n.t("select-file-location-to-save"),
    defaultPath: defaultFilename,
    buttonLabel: i18n.t("save-file-button-label"),
    filters: [
      {
        name: i18n.t("pem-files-name"),
        extensions: ["bin"],
      },
    ],
    properties: [],
  });

  if (file.canceled) throw i18n.t("canceled-save-file");

  const dest = file.filePath.toString();

  console.log(dest);

  await fs.promises.writeFile(dest, data);

  console.log(i18n.t("saved-file"));
};

const move = async (source, defaultDestPath) => {
  const file = await dialog.showSaveDialog({
    title: i18n.t("select-file-location-to-save"),
    defaultPath: defaultDestPath,
    buttonLabel: i18n.t("save-file-button-label"),
    filters: [
      {
        name: i18n.t("signature-files-name"),
        extensions: ["bin"],
      },
    ],
    properties: [],
  });

  if (file.canceled) throw i18n.t("canceled-save-file");

  const dest = file.filePath.toString();

  await fs.promises.rename(source, dest, "binary");

  console.log(i18n.t("saved-file"));
};

const dialogFileTransfer = {
  save,
  saveBin,
  move,
};

export default dialogFileTransfer;
