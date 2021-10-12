import { ipcMain } from "electron";
import { promises as fsPromises } from "fs";
import digitalSignature from "./digital-signature";
import fileDigitalSignature from "./file-digital-signature";
import cryptoFileDialog from "./crypto-file-dialog";
import i18n from "@/i18n";

ipcMain.on("generate-private-key", fileDigitalSignature.generatePrivateKey);

ipcMain.on("generate-public-key", async (event, privateKeyPath) => {
  const defaultPath = `${i18n.t(
    "crypto-file-dialog.default-filename.public-key"
  )}.pem`;

  try {
    const privateKey = await fsPromises.readFile(privateKeyPath);

    const publicKey = await digitalSignature.generatePublicKey(privateKey);

    const savedPublicKeyPath = await cryptoFileDialog.savePEM(
      publicKey,
      defaultPath
    );

    event.reply("generate-public-key", savedPublicKeyPath);
  } catch (e) {
    console.log(e.toString());
    event.reply("error", i18n.t("toast.public-key.not-generated"));
  }
});

ipcMain.on("generate-digest", async (event, { fileToDigestPath, hash }) => {
  const defaultPath = `digest.dig`;

  try {
    const digest = await digitalSignature.generateDigest(fileToDigestPath, {
      hash,
    });

    const savedDigestFilePath = await cryptoFileDialog.saveDigest(
      digest,
      defaultPath
    );

    event.reply("generate-digest", savedDigestFilePath);
  } catch (e) {
    console.log(e.toString());
    event.reply("error", "No se pudo generar el digesto");
  }
});

ipcMain.on("sign", async (event, { privateKeyPath, fileToSignPath, hash }) => {
  const defaultPath = `${i18n.t(
    "crypto-file-dialog.default-filename.signature"
  )}.bin`;

  try {
    const privateKey = await fsPromises.readFile(privateKeyPath);
    const fileToSign = await fsPromises.readFile(fileToSignPath);

    const signature = await digitalSignature.sign(privateKey, fileToSign, {
      hash,
    });

    const savedSignatureFilePath = await cryptoFileDialog.saveSignature(
      signature,
      defaultPath
    );

    event.reply("sign", savedSignatureFilePath);
  } catch (e) {
    console.log(e.toString());
    event.reply("error", i18n.t("toast.signature.not-signed"));
  }
});

ipcMain.on(
  "sign-digest",
  async (event, { privateKeyPath, digestToSignPath }) => {
    const defaultPath = `${i18n.t(
      "crypto-file-dialog.default-filename.signature"
    )}.bin`;

    try {
      const privateKey = await fsPromises.readFile(privateKeyPath);
      const digestToSign = await fsPromises.readFile(digestToSignPath);

      const signature = await digitalSignature.signDigest(
        privateKey,
        digestToSign
      );

      const savedSignatureFilePath = await cryptoFileDialog.saveSignature(
        signature,
        defaultPath
      );

      event.reply("sign-digest", savedSignatureFilePath);
    } catch (e) {
      console.log(e.toString());
      event.reply("error", i18n.t("toast.signature.not-signed"));
    }
  }
);

ipcMain.on(
  "verify",
  async (
    event,
    { publicKeyPath, signatureFilePath, originalFilePath, hash }
  ) => {
    try {
      const publicKey = await fsPromises.readFile(publicKeyPath);
      const signature = await fsPromises.readFile(signatureFilePath);
      const originalFile = await fsPromises.readFile(originalFilePath);

      const result = await digitalSignature.verify(
        publicKey,
        signature,
        originalFile,
        { hash }
      );
      event.reply("verify", result);
    } catch (e) {
      console.log(e.toString());
      event.reply("error", i18n.t("toast.verification.wrong"));
    }
  }
);
