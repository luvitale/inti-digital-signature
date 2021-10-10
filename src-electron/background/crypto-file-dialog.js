import { dialog } from 'electron';
import { i18n } from '../electron-i18n';
import { promises as fsPromises } from 'fs';

const savePEM = async (data, defaultFilename) => {
  const file = await dialog.showSaveDialog({
    title: i18n.global.t('crypto-file-dialog.select-file-location-to-save'),
    defaultPath: defaultFilename,
    buttonLabel: i18n.global.t('crypto-file-dialog.save-file-button-label'),
    filters: [
      {
        name: i18n.global.t('crypto-file-dialog.pem-files-name'),
        extensions: ['pem'],
      },
    ],
    properties: [],
  });

  if (file.canceled) throw i18n.global.t('crypto-file-dialog.canceled-save-file');

  const dest = file.filePath.toString();

  await fsPromises.writeFile(dest, data);
};

const saveDigest = async (data, defaultFilename) => {
  const file = await dialog.showSaveDialog({
    title: i18n.global.t('crypto-file-dialog.select-file-location-to-save'),
    defaultPath: defaultFilename,
    buttonLabel: i18n.global.t('crypto-file-dialog.save-file-button-label'),
    filters: [
      {
        name: 'Digest (.dig)',
        extensions: ['dig'],
      },
    ],
    properties: [],
  });

  if (file.canceled) throw i18n.global.t('crypto-file-dialog.canceled-save-file');

  const dest = file.filePath.toString();

  await fsPromises.writeFile(dest, data, 'binary');
};

const saveSignature = async (data, defaultFilename) => {
  const file = await dialog.showSaveDialog({
    title: i18n.global.t('crypto-file-dialog.select-file-location-to-save'),
    defaultPath: defaultFilename,
    buttonLabel: i18n.global.t('crypto-file-dialog.save-file-button-label'),
    filters: [
      {
        name: i18n.global.t('crypto-file-dialog.signature-files-name'),
        extensions: ['bin'],
      },
    ],
    properties: [],
  });

  if (file.canceled) throw i18n.global.t('crypto-file-dialog.canceled-save-file');

  const dest = file.filePath.toString();

  await fsPromises.writeFile(dest, data, 'binary');
};

const cryptoFileDialog = {
  savePEM,
  saveDigest,
  saveSignature,
};

export default cryptoFileDialog;
