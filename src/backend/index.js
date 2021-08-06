import { ipcMain } from "electron";
import { DigitalSignature } from "./digital-signature";
import dialogFileTransfer from "./dialog-file-transfer";
import i18n from "../i18n";

const digitalSignature = new DigitalSignature();

ipcMain.on("generate-private-key", async (event) => {
  const defaultPath = "priv1.pem";

  try {
    const privateKey = await digitalSignature.generatePrivateKey();

    const savedPrivateKeyPath = await dialogFileTransfer.savePEM(
      privateKey,
      defaultPath
    );
    event.reply("generate-private-key", savedPrivateKeyPath);
  } catch (e) {
    console.log(e.toString());
    event.reply("error", i18n.t("private-key-not-generated"));
  }
});

ipcMain.on("generate-public-key", async (event, privateKeyPath) => {
  const defaultPath = "pub1.pem";

  try {
    const publicKey = await digitalSignature.generatePublicKey(privateKeyPath);
    const savedPublicKeyPath = await dialogFileTransfer.savePEM(
      publicKey,
      defaultPath
    );

    event.reply("generate-public-key", savedPublicKeyPath);
  } catch (e) {
    console.log(e.toString());
    event.reply("error", i18n.t("public-key-not-generated"));
  }
});

ipcMain.on("sign", async (event, { privateKeyPath, fileToSignPath }) => {
  const defaultPath = "firma.bin";

  try {
    const signature = await digitalSignature.sign(
      privateKeyPath,
      fileToSignPath
    );

    const savedSignatureFilePath = await dialogFileTransfer.saveSignature(
      signature,
      defaultPath
    );

    event.reply("sign", savedSignatureFilePath);
  } catch (e) {
    console.log(e.toString());
    event.reply("error", i18n.t("file-not-signed"));
  }
});

ipcMain.on(
  "verify",
  async (event, { publicKeyPath, signatureFilePath, originalFilePath }) => {
    try {
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath
      );
      console.log(result);
      event.reply("verify", result);
    } catch (e) {
      console.log(e.toString());
      event.reply("error", i18n.t("wrong-verification"));
    }
  }
);
