import { dialog } from "electron";
import i18n from "@/i18n";
import { promises as fsPromises } from "fs";

const savePEM = async (data, defaultFilename) => {
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

  await fsPromises.writeFile(dest, data);

  console.log(i18n.t("saved-file"));
};

const saveSignature = async (data, defaultFilename) => {
  const file = await dialog.showSaveDialog({
    title: i18n.t("select-file-location-to-save"),
    defaultPath: defaultFilename,
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

  console.log(dest);

  await fsPromises.writeFile(dest, data, "binary");

  console.log(i18n.t("saved-file"));
};

const dialogFileTransfer = {
  savePEM,
  saveSignature,
};

export default dialogFileTransfer;
