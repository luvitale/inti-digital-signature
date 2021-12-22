import { ipcMain } from "electron";
import digitalSignatureFS from "./digital-signature/fs";
import i18n from "@/i18n";

ipcMain.on(
  "generate-private-key",
  async (event, { type, modulusLength, namedCurve, defaultSave }) => {
    try {
      const savedPrivateKeyPath = await digitalSignatureFS.generatePrivateKey(
        type,
        {
          modulusLength,
          namedCurve,
          defaultSave,
        }
      );
      event.reply("generate-private-key", savedPrivateKeyPath);
    } catch (e) {
      event.reply("error", i18n.t("toast.private-key.not-generated"));
    }
  }
);

ipcMain.on(
  "generate-public-key",
  async (event, privateKeyPath, { defaultSave }) => {
    try {
      const savedPublicKeyPath = await digitalSignatureFS.generatePublicKey(
        privateKeyPath,
        { defaultSave }
      );

      event.reply("generate-public-key", savedPublicKeyPath);
    } catch (e) {
      event.reply("error", i18n.t("toast.public-key.not-generated"));
    }
  }
);

ipcMain.on(
  "generate-digest",
  async (event, { fileToDigestPath, hash, defaultSave }) => {
    try {
      const savedDigestFilePath = await digitalSignatureFS.generateDigest(
        fileToDigestPath,
        {
          hash,
          defaultSave,
        }
      );

      event.reply("generate-digest", savedDigestFilePath);
    } catch (e) {
      event.reply("error", i18n.t("toast.digest.not-generated"));
    }
  }
);

ipcMain.on(
  "sign",
  async (event, { privateKeyPath, fileToSignPath, hash, defaultSave }) => {
    try {
      const savedSignatureFilePath = await digitalSignatureFS.sign(
        privateKeyPath,
        fileToSignPath,
        {
          hash,
          defaultSave,
        }
      );

      event.reply("sign", savedSignatureFilePath);
    } catch (e) {
      event.reply("error", i18n.t("toast.signature.not-signed"));
    }
  }
);

ipcMain.on(
  "sign-digest",
  async (event, { privateKeyPath, digestToSignPath, hash, defaultSave }) => {
    try {
      const savedSignatureFilePath = await digitalSignatureFS.signDigest(
        privateKeyPath,
        digestToSignPath,
        {
          hash,
          defaultSave,
        }
      );

      event.reply("sign-digest", savedSignatureFilePath);
    } catch (e) {
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
      const result = await digitalSignatureFS.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        { hash }
      );

      event.reply("verify", result);
    } catch (e) {
      event.reply("error", i18n.t("toast.verification.wrong"));
    }
  }
);

ipcMain.on(
  "verify-digest",
  async (event, { publicKeyPath, signatureFilePath, digestFilePath, hash }) => {
    try {
      const result = await digitalSignatureFS.verifyDigest(
        publicKeyPath,
        signatureFilePath,
        digestFilePath,
        { hash }
      );

      event.reply("verify-digest", result);
    } catch (e) {
      event.reply("error", i18n.t("toast.verification.wrong"));
    }
  }
);
