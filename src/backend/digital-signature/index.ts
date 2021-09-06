import { promises as fsPromises } from "fs";
import PrivateKeyGenerator from "./private-key-generator";
import PublicKeyGenerator from "./public-key-generator";
import Signer from "./signer";
import Verifier from "./verifier";
import {
  Hash,
  CypherType,
  ModulusLength,
  PrivateKey,
  PublicKey,
  Path,
  Signature,
} from "./types";

class DigitalSignature {
  hash: Hash;
  constructor(hash: Hash = "SHA1") {
    this.hash = hash;
  }

  async generatePrivateKey(
    type?: CypherType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ): Promise<PrivateKey> {
    const privateKeyGenerator = new PrivateKeyGenerator(type, options);

    return await privateKeyGenerator.generate();
  }

  async generatePublicKey(privateKeyPath: Path): Promise<PublicKey> {
    const privateKey = await fsPromises.readFile(privateKeyPath);

    const publicKeyGenerator = new PublicKeyGenerator(privateKey);

    return await publicKeyGenerator.generate();
  }

  async sign(privateKeyPath: Path, fileToSignPath: Path): Promise<Signature> {
    const privateKey = await fsPromises.readFile(privateKeyPath);
    const fileToSign = await fsPromises.readFile(fileToSignPath);

    const signer = new Signer(privateKey, fileToSign);

    return await signer.sign();
  }

  async verify(
    publicKeyPath: Path,
    signatureFilePath: Path,
    originalFilePath: Path
  ): Promise<boolean> {
    const publicKey = await fsPromises.readFile(publicKeyPath);
    const signature = await fsPromises.readFile(signatureFilePath);
    const originalFile = await fsPromises.readFile(originalFilePath);

    const verifier = new Verifier(publicKey, signature, originalFile);

    return await verifier.verify();
  }
}

export default new DigitalSignature();
