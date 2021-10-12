import AbstractDigitalSignature from "@/api/digital-signature";
import { promises as fsPromises } from "fs";
import cryptoFileDialog from "./crypto-file-dialog";
import digitalSignature from "./digital-signature";
import {
  Hash,
  CypherType,
  ModulusLength,
  PrivateKey,
  PublicKey,
  Digest,
  Path,
  Signature,
} from "@/api/digital-signature/types";
import i18n from "@/i18n";

class FileDigitalSignature {
  async generatePrivateKey(
    event: { reply: (arg0: string, arg1: any) => void },
    { type, modulusLength, namedCurve }: any
  ) {
    const defaultPath = `${i18n.t(
      "crypto-file-dialog.default-filename.private-key"
    )}.pem`;

    try {
      const privateKey = await digitalSignature.generatePrivateKey(type, {
        modulusLength,
        namedCurve,
      });

      const savedPrivateKeyPath = await cryptoFileDialog.savePEM(
        privateKey as string,
        defaultPath
      );
      event.reply("generate-private-key", savedPrivateKeyPath);
    } catch (e: unknown) {
      console.log(e);
      event.reply("error", i18n.t("toast.private-key.not-generated"));
    }
  }
}

export default new FileDigitalSignature();
