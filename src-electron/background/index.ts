import { ipcMain } from 'electron';
import digitalSignature from './digital-signature';

ipcMain.on(
  'generate-private-key',
  async (event, { type, modulusLength, namedCurve }) => {
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
  try {
    const publicKey = await digitalSignature.generatePublicKey(privateKeyPath);

    event.reply('generate-public-key', publicKey);
  } catch (e) {
    console.log((e as Error).toString());
    event.reply('error');
  }
});

ipcMain.on('generate-digest', async (event, { fileToDigestPath, hash }) => {
  try {
    const digest = await digitalSignature.generateDigest(fileToDigestPath, {
      hash,
    });

    event.reply('generate-digest', digest);
  } catch (e) {
    console.log((e as Error).toString());
    event.reply('error');
  }
});

ipcMain.on('sign', async (event, { privateKeyPath, fileToSignPath, hash }) => {
  try {
    const signature = await digitalSignature.sign(
      privateKeyPath,
      fileToSignPath,
      { hash }
    );

    event.reply('sign', signature);
  } catch (e) {
    console.log((e as Error).toString());
    event.reply('error');
  }
});

ipcMain.on(
  'sign-digest',
  async (event, { privateKeyPath, digestToSignPath }) => {
    try {
      const signature = await digitalSignature.signDigest(
        privateKeyPath,
        digestToSignPath
      );

      event.reply('sign-digest', signature);
    } catch (e) {
      console.log((e as Error).toString());
      event.reply('error');
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
      event.reply('error');
    }
  }
);
