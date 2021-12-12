import { ipcMain, nativeTheme } from "electron";
import digitalSignatureFS from "./digital-signature/fs";
import "./version";
import i18n from "@/i18n";

ipcMain.on(
  "generate-private-key",
  async (event, { type, modulusLength, namedCurve }) => {
    try {
      const savedPrivateKeyPath = await digitalSignatureFS.generatePrivateKey(
        type,
        {
          modulusLength,
          namedCurve,
        }
      );
      event.reply("generate-private-key", savedPrivateKeyPath);
    } catch (e) {
      event.reply("error", i18n.t("toast.private-key.not-generated"));
    }
  }
);

ipcMain.on("generate-public-key", async (event, privateKeyPath) => {
  try {
    const savedPublicKeyPath = await digitalSignatureFS.generatePublicKey(
      privateKeyPath
    );

    event.reply("generate-public-key", savedPublicKeyPath);
  } catch (e) {
    event.reply("error", i18n.t("toast.public-key.not-generated"));
  }
});

ipcMain.on("generate-digest", async (event, { fileToDigestPath, hash }) => {
  try {
    const savedDigestFilePath = await digitalSignatureFS.generateDigest(
      fileToDigestPath,
      {
        hash,
      }
    );

    event.reply("generate-digest", savedDigestFilePath);
  } catch (e) {
    event.reply("error", i18n.t("toast.digest.not-generated"));
  }
});

ipcMain.on("sign", async (event, { privateKeyPath, fileToSignPath, hash }) => {
  try {
    const savedSignatureFilePath = await digitalSignatureFS.sign(
      privateKeyPath,
      fileToSignPath,
      {
        hash,
      }
    );

    event.reply("sign", savedSignatureFilePath);
  } catch (e) {
    event.reply("error", i18n.t("toast.signature.not-signed"));
  }
});

ipcMain.on(
  "sign-digest",
  async (event, { privateKeyPath, digestToSignPath, hash }) => {
    try {
      const savedSignatureFilePath = await digitalSignatureFS.signDigest(
        privateKeyPath,
        digestToSignPath,
        {
          hash,
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

ipcMain.on("get-language", (event) => {
  event.reply("change-language", i18n.locale);
});

ipcMain.on("get-theme", (event) => {
  event.reply("change-theme", nativeTheme.themeSource);
});

ipcMain.on("change-language", (event, locale) => {
  i18n.locale = locale;
  event.reply("change-language", i18n.locale);
});

ipcMain.on("change-theme", (event, theme) => {
  nativeTheme.themeSource = theme;
  event.reply("change-theme", nativeTheme.themeSource);
});
