import { dialog } from "electron";
import fs from "fs";

const save = (data, defaultFilename) => {
  return new Promise((resolve, reject) => {
    const dialogTitle = "{{ $t('select-file-location-to-save') }}";

    dialog
      .showSaveDialog({
        title: dialogTitle,
        defaultPath: defaultFilename,
        buttonLabel: "Guardar",
        filters: [
          {
            name: "Archivos PEM (.pem)",
            extensions: ["pem"],
          },
        ],
        properties: [],
      })
      .then((file) => {
        if (file.canceled) reject("Guardado cancelado");

        const dest = file.filePath.toString();

        console.log(dest);

        fs.writeFile(dest, data, (err) => {
          if (err) reject(err);

          console.log("Guardado");
          resolve(dest);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const move = (source, defaultDestPath) => {
  return new Promise((resolve, reject) => {
    const dialogTitle = "{{ $t('select-file-location-to-save') }}";

    dialog
      .showSaveDialog({
        title: dialogTitle,
        defaultPath: defaultDestPath,
        buttonLabel: "Guardar",
        filters: [
          {
            name: "Firmas (.bin)",
            extensions: ["bin"],
          },
        ],
        properties: [],
      })
      .then((file) => {
        if (file.canceled) reject("Guardado cancelado");

        const dest = file.filePath.toString();

        fs.rename(source, dest, (err) => {
          if (err) reject(err);

          console.log("Guardado");
          resolve(dest);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const dialogFileTransfer = {
  save,
  move,
};

export default dialogFileTransfer;
