import AbstractDigitalSignatureFS from "../../../api/digital-signature/fs";
import digitalSignatureSaver from "./saver";
import {
  Path,
  Hash,
  CypherType,
  ModulusLength,
} from "../../../api/digital-signature/utils/types";

class DigitalSignatureFS extends AbstractDigitalSignatureFS {
  async generatePrivateKey(
    type?: CypherType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ) {
    return await digitalSignatureSaver.generatePrivateKey(type, options);
  }

  async generatePublicKey(privateKeyPath: Path) {
    return await digitalSignatureSaver.generatePublicKey(privateKeyPath);
  }

  async generateDigest(fileToDigestPath: Path, options?: { hash?: Hash }) {
    return await digitalSignatureSaver.generateDigest(
      fileToDigestPath,
      options
    );
  }

  async sign(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ) {
    return await digitalSignatureSaver.sign(
      privateKeyPath,
      fileToSignPath,
      options
    );
  }

  async signDigest(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ) {
    return await digitalSignatureSaver.signDigest(
      privateKeyPath,
      fileToSignPath,
      options
    );
  }

  async verify(
    publicKeyPath: Path,
    signatureFilePath: Path,
    originalFilePath: Path,
    options?: { hash?: Hash }
  ) {
    return await digitalSignatureSaver.verify(
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
    return await digitalSignatureSaver.verifyDigest(
      publicKeyPath,
      signatureFilePath,
      digestFilePath,
      options
    );
  }
}

export default new DigitalSignatureFS();
