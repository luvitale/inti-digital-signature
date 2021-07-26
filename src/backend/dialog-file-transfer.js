import { dialog } from "electron";
import fs from "fs";

const save = (data, defaultFilename) => {
  const dialogTitle = "Seleccioná la ubicación del archivo a guardar"

  dialog.showSaveDialog({
    title: dialogTitle,
    defaultPath: defaultFilename,
    buttonLabel: 'Guardar',
    filters: [
        {
            name: 'Archivos PEM (.pem)',
            extensions: ['pem']
        }, ],
    properties: []
  }).then(file => {
    if (!file.canceled) {
        console.log(file.filePath.toString());
          
        fs.writeFile(file.filePath.toString(), data, err => {
            if (err) throw err;
            console.log('Guardado');
        });
    }
  }).catch(err => {
      console.log(err)
  });
}

const move = (source, defaultDestPath) => {
  const dialogTitle = "Seleccioná la ubicación del archivo a guardar"

  dialog.showSaveDialog({
    title: dialogTitle,
    defaultPath: defaultDestPath,
    buttonLabel: 'Guardar',
    filters: [
        {
            name: 'Firmas (.bin)',
            extensions: ['bin']
        }, ],
    properties: []
  }).then(file => {
    if (!file.canceled) {
        const dest = file.filePath.toString()

        fs.rename(source, dest, err => {
            if (err) throw err;
            console.log('Guardado');
        });
    }
  }).catch(err => {
      console.log(err)
  });
}

const dialogFileTransfer = {
  save,
  move
}

export default dialogFileTransfer