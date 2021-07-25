import { ipcMain } from "electron";
import { DigitalSignature } from "./digital-signature";

const digitalSignature = new DigitalSignature();

ipcMain.on("generate-private-key", (event, arg) => {
  digitalSignature.generatePrivateKey()
    .then(privateKey => event.reply("generate-private-key", privateKey))
    .catch(error => console.log(e.toString()))
});

ipcMain.on("generate-public-key", async (event, privateKeyPath) => {
  try {
    const publicKey = await digitalSignature.generatePublicKey(privateKeyPath)
    event.reply("generate-public-key", publicKey)
  } catch(e) {
    console.log(e.toString())
  }
});

ipcMain.on("sign", (event, arg) => {
  console.log(arg);

  event.reply("sign", "pong");
});

ipcMain.on("verify", (event, arg) => {
  console.log(arg);

  event.reply("verify", "pong");
});
