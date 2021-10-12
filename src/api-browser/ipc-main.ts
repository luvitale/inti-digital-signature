import digitalSignature from "@/api-browser/digital-signature";
import { PrivateKey, PublicKey } from "@/api/digital-signature/types";
import i18n from "@/i18n";
import fileSaver from "file-saver";

const generatePrivateKey = async () => {
  await digitalSignature.generatePrivateKey();
};

const generatePublicKey = async (privateKeyFile: Blob) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const privateKey = e && e.target ? e.target.result : undefined;

    const publicKey: PublicKey = await digitalSignature.generatePublicKey(
      privateKey as PrivateKey
    );

    const publicKeyBlob = new Blob([publicKey as BlobPart]);

    fileSaver.saveAs(
      publicKeyBlob,
      `${i18n.t("crypto-file-dialog.default-filename.public-key")}.pem`
    );
  };
  reader.readAsText(privateKeyFile);
};

export default {
  generatePrivateKey,
  generatePublicKey,
};
