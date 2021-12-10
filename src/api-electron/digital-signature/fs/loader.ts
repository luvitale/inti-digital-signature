import AbstractDigitalSignatureLoader from "../../../api/digital-signature/fs/loader";
import digitalSignature from "..";
import { promises as fsPromises } from "fs";
import {
  Path,
  PrivateKey,
  PublicKey,
  Digest,
  Hash,
  Signature,
  CypherType,
  ModulusLength,
} from "../../../api/digital-signature/utils/types";

class DigitalSignatureLoader extends AbstractDigitalSignatureLoader {
  async generatePrivateKey(
    type?: CypherType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ): Promise<PrivateKey> {
    return await digitalSignature.generatePrivateKey(type, options);
  }

  async generatePublicKey(privateKeyPath: Path): Promise<PublicKey> {
    const privateKey = await fsPromises.readFile(privateKeyPath);

    return await digitalSignature.generatePublicKey(privateKey);
  }

  async generateDigest(
    fileToDigestPath: Path,
    options?: {
      hash?: Hash;
    }
  ): Promise<Digest> {
    const fileToDigest = await fsPromises.readFile(fileToDigestPath);

    return await digitalSignature.generateDigest(fileToDigest, options);
  }

  async sign(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ): Promise<Signature> {
    const privateKey = await fsPromises.readFile(privateKeyPath);
    const fileToSign = await fsPromises.readFile(fileToSignPath);

    return await digitalSignature.sign(privateKey, fileToSign, options);
  }

  async signDigest(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ): Promise<Signature> {
    const privateKey = await fsPromises.readFile(privateKeyPath);
    const fileToSign = await fsPromises.readFile(fileToSignPath);

    return await digitalSignature.signDigest(privateKey, fileToSign, options);
  }

  async verify(
    publicKeyPath: Path,
    signatureFilePath: Path,
    originalFilePath: Path,
    options?: { hash?: Hash }
  ): Promise<boolean> {
    const publicKey = await fsPromises.readFile(publicKeyPath);
    const signature = await fsPromises.readFile(signatureFilePath);
    const originalFile = await fsPromises.readFile(originalFilePath);

    return await digitalSignature.verify(
      publicKey,
      signature,
      originalFile,
      options
    );
  }

  async verifyDigest(
    publicKeyPath: Path,
    signatureFilePath: Path,
    digestFilePath: Path,
    options?: { hash?: Hash }
  ): Promise<boolean> {
    const publicKey = await fsPromises.readFile(publicKeyPath);
    const signature = await fsPromises.readFile(signatureFilePath);
    const digestFile = await fsPromises.readFile(digestFilePath);

    return await digitalSignature.verifyDigest(
      publicKey,
      signature,
      digestFile,
      options
    );
  }
}

export default new DigitalSignatureLoader();
