import { ipcMain } from "electron";
import { DigitalSignature } from "./digital-signature";
import dialogFileTransfer from "./dialog-file-transfer";

const digitalSignature = new DigitalSignature();

ipcMain.on("generate-private-key", event => {
  digitalSignature.generatePrivateKey()
    .then(privateKey => {
      const defaultPath = "priv1.pem"

      dialogFileTransfer.save(privateKey, defaultPath)
      event.reply("generate-private-key", privateKey)
    })
    .catch(e => console.log(e.toString()))
});

ipcMain.on("generate-public-key", async (event, privateKeyPath) => {
  try {
    const publicKey = await digitalSignature.generatePublicKey(privateKeyPath)
    const defaultPath = "pub1.pem"
    dialogFileTransfer.save(publicKey, defaultPath)

    event.reply("generate-public-key", publicKey)
  } catch(e) {
    console.log(e.toString())
  }
});

ipcMain.on("sign", (event, {privateKeyPath, fileToSignPath}) => {
  const initialFilePath = `/tmp/firma${getActualDateString()}.bin`

  digitalSignature.sign(privateKeyPath, fileToSignPath, initialFilePath)
    .then(signedFile => {
      const defaultPath = "firma.bin"

      dialogFileTransfer.move(initialFilePath, defaultPath)
      event.reply("sign", signedFile)
    })
    .catch(e => console.log(e.toString()))
});

ipcMain.on("verify", (event, {publicKeyPath, fileToVerifyPath, originalFilePath}) => {
  digitalSignature.verify(publicKeyPath, fileToVerifyPath, originalFilePath)
    .then(result => event.reply("verify", result))
    .catch(e => event.reply("verify", e.toString()))
});

const getActualDateString = () => {
  const date = new Date()
  return `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
}