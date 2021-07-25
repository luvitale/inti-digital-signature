import { ipcMain } from "electron";
import { DigitalSignature } from "./digital-signature";

const digitalSignature = new DigitalSignature();

ipcMain.on("generate-private-key", (event, arg) => {
  digitalSignature.generatePrivateKey()
    .then(privateKey => event.reply("generate-private-key", privateKey))
    .catch(error => console.log(error))
});

ipcMain.on("generate-public-key", (event, arg) => {
  console.log(arg);

  event.reply("generate-public-key", "pong");
});

ipcMain.on("sign", (event, arg) => {
  console.log(arg);

  event.reply("sign", "pong");
});

ipcMain.on("verify", (event, arg) => {
  console.log(arg);

  event.reply("verify", "pong");
});
