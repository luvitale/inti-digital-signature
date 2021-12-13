import AbstractDigitalSignatureSaver from "../../../api/digital-signature/fs/saver";
import digitalSignatureLoader from "./loader";
import {
  Path,
  Hash,
  CypherType,
  ModulusLength,
} from "../../../api/digital-signature/utils/types";
import i18n from "@/i18n";
import cryptoFileDialog from "../../crypto-file-dialog";

class DigitalSignatureSaver extends AbstractDigitalSignatureSaver {
  async generatePrivateKey(
    type?: CypherType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ) {
    const defaultPath = `${i18n.t(
      "crypto-file-dialog.default-filename.private-key"
    )}.pem`;

    const privateKey = await digitalSignatureLoader.generatePrivateKey(
      type,
      options
    );

    return await cryptoFileDialog.savePEM(privateKey as string, defaultPath);
  }

  async generatePublicKey(privateKeyPath: Path) {
    const defaultPath = `${i18n.t(
      "crypto-file-dialog.default-filename.public-key"
    )}.pem`;

    const publicKey = await digitalSignatureLoader.generatePublicKey(
      privateKeyPath
    );

    return await cryptoFileDialog.savePEM(publicKey as string, defaultPath);
  }

  async generateDigest(fileToDigestPath: Path, options?: { hash?: Hash }) {
    const defaultPath = `${i18n.t(
      "crypto-file-dialog.default-filename.digest"
    )}.dig`;

    const digest = await digitalSignatureLoader.generateDigest(
      fileToDigestPath,
      options
    );

    return await cryptoFileDialog.saveDigest(digest, defaultPath);
  }

  async sign(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ) {
    const defaultPath = `${i18n.t(
      "crypto-file-dialog.default-filename.signature"
    )}.bin`;

    const signature = await digitalSignatureLoader.sign(
      privateKeyPath,
      fileToSignPath,
      options
    );

    return await cryptoFileDialog.saveSignature(signature, defaultPath);
  }

  async signDigest(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ) {
    const defaultPath = `${i18n.t(
      "crypto-file-dialog.default-filename.signature"
    )}.bin`;

    const signature = await digitalSignatureLoader.signDigest(
      privateKeyPath,
      fileToSignPath,
      options
    );

    return await cryptoFileDialog.saveSignature(signature, defaultPath);
  }

  async verify(
    publicKeyPath: Path,
    signatureFilePath: Path,
    originalFilePath: Path,
    options?: { hash?: Hash }
  ) {
    return await digitalSignatureLoader.verify(
      publicKeyPath,
      signatureFilePath,
      originalFilePath,
      options
    );
  }

  async verifyDigest(
    publicKeyPath: Path,
    signatureFilePath: Path,
    digestFilePath: Path,
    options?: { hash?: Hash }
  ) {
    return await digitalSignatureLoader.verifyDigest(
      publicKeyPath,
      signatureFilePath,
      digestFilePath,
      options
    );
  }
}

export default new DigitalSignatureSaver();
