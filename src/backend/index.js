import { app, ipcMain } from "electron";
import { DigitalSignature } from "./digital-signature";
import dialogFileTransfer from "./dialog-file-transfer";
import path from "path";

const digitalSignature = new DigitalSignature();

ipcMain.on("generate-private-key", async (event) => {
  const defaultPath = "priv1.pem";

  try {
    const privateKey = await digitalSignature.generatePrivateKey();
    const savedPrivateKeyPath = await dialogFileTransfer.save(
      privateKey,
      defaultPath
    );
    event.reply("generate-private-key", savedPrivateKeyPath);
  } catch (e) {
    console.log(e.toString());
    event.reply("error", "La clave privada no se pudo generar");
  }
});

ipcMain.on("generate-public-key", async (event, privateKeyPath) => {
  const defaultPath = "pub1.pem";

  try {
    const publicKey = await digitalSignature.generatePublicKey(privateKeyPath);
    const savedPublicKeyPath = await dialogFileTransfer.save(
      publicKey,
      defaultPath
    );

    event.reply("generate-public-key", savedPublicKeyPath);
  } catch (e) {
    console.log(e.toString());
    event.reply("error", "La clave pública no se pudo generar");
  }
});

ipcMain.on("sign", async (event, { privateKeyPath, fileToSignPath }) => {
  const initialFilePath = path.join(
    app.getPath("temp"),
    `firma${getActualDateString()}.bin`
  );
  const defaultPath = "firma.bin";

  try {
    const initialSignedFilePath = await digitalSignature.sign(
      privateKeyPath,
      fileToSignPath,
      initialFilePath
    );
    const savedSignedFilePath = await dialogFileTransfer.move(
      initialSignedFilePath,
      defaultPath
    );

    event.reply("sign", savedSignedFilePath);
  } catch (e) {
    console.log(e.toString());
    event.reply("error", "No se pudo firmar el archivo");
  }
});

ipcMain.on(
  "verify",
  async (event, { publicKeyPath, fileToVerifyPath, originalFilePath }) => {
    try {
      const result = await digitalSignature.verify(
        publicKeyPath,
        fileToVerifyPath,
        originalFilePath
      );
      event.reply("verify", result);
    } catch (e) {
      console.log(e.toString());
      event.reply("error", "{{ $t('wrong-verification') }}");
    }
  }
);

const getActualDateString = () => {
  const date = new Date();
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
};
