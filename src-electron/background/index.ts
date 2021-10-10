import { ipcMain } from 'electron';
import digitalSignature from './digital-signature';
import cryptoFileDialog from './crypto-file-dialog';
//import { i18n } from '../electron-i18n';

const i18n = {
  global: {
    t: (_msg: string) => 't'
  }
}

ipcMain.on(
  'generate-private-key',
  async (event, { type, modulusLength, namedCurve }) => {
    const defaultPath = `${i18n.global.t(
      'crypto-file-dialog.default-filename.private-key'
    )}.pem`;

    try {
      const privateKey = await digitalSignature.generatePrivateKey(type, {
        modulusLength,
        namedCurve,
      });

      event.reply('generate-private-key', privateKey);
    } catch (e) {
      console.log((e as Error).toString());
      event.reply('error');
    }
  }
);

ipcMain.on('generate-public-key', async (event, privateKeyPath) => {
  const defaultPath = `${i18n.global.t(
    'crypto-file-dialog.default-filename.public-key'
  )}.pem`;

  try {
    const publicKey = await digitalSignature.generatePublicKey(privateKeyPath);
    const savedPublicKeyPath = await cryptoFileDialog.savePEM(
      publicKey,
      defaultPath
    );

    event.reply('generate-public-key', savedPublicKeyPath);
  } catch (e) {
    console.log((e as Error).toString());
    event.reply('error', i18n.global.t('toast.public-key.not-generated'));
  }
});

ipcMain.on('generate-digest', async (event, { fileToDigestPath, hash }) => {
  const defaultPath = 'digest.dig';

  try {
    const digest = await digitalSignature.generateDigest(fileToDigestPath, {
      hash,
    });

    const savedDigestFilePath = await cryptoFileDialog.saveDigest(
      digest,
      defaultPath
    );

    event.reply('generate-digest', savedDigestFilePath);
  } catch (e) {
    console.log((e as Error).toString());
    event.reply('error', 'No se pudo generar el digesto');
  }
});

ipcMain.on('sign', async (event, { privateKeyPath, fileToSignPath, hash }) => {
  const defaultPath = `${i18n.global.t(
    'crypto-file-dialog.default-filename.signature'
  )}.bin`;

  try {
    const signature = await digitalSignature.sign(
      privateKeyPath,
      fileToSignPath,
      { hash }
    );

    const savedSignatureFilePath = await cryptoFileDialog.saveSignature(
      signature,
      defaultPath
    );

    event.reply('sign', savedSignatureFilePath);
  } catch (e) {
    console.log((e as Error).toString());
    event.reply('error', i18n.global.t('toast.signature.not-signed'));
  }
});

ipcMain.on(
  'sign-digest',
  async (event, { privateKeyPath, digestToSignPath }) => {
    const defaultPath = `${i18n.global.t(
      'crypto-file-dialog.default-filename.signature'
    )}.bin`;

    try {
      const signature = await digitalSignature.signDigest(
        privateKeyPath,
        digestToSignPath
      );

      const savedSignatureFilePath = await cryptoFileDialog.saveSignature(
        signature,
        defaultPath
      );

      event.reply('sign-digest', savedSignatureFilePath);
    } catch (e) {
      console.log((e as Error).toString());
      event.reply('error', i18n.global.t('toast.signature.not-signed'));
    }
  }
);

ipcMain.on(
  'verify',
  async (
    event,
    { publicKeyPath, signatureFilePath, originalFilePath, hash }
  ) => {
    try {
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        { hash }
      );
      event.reply('verify', result);
    } catch (e) {
      console.log((e as Error).toString());
      event.reply('error', i18n.global.t('toast.verification.wrong'));
    }
  }
);
