import AbstractDigitalSignature from "@/api/digital-signature";
import { promises as fsPromises } from "fs";
import PrivateKeyGenerator from "./private-key-generator";
import PublicKeyGenerator from "./public-key-generator";
import DigestGenerator from "./digest-generator";
import Signer from "./signer";
import Verifier from "./verifier";
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

class DigitalSignature extends AbstractDigitalSignature {
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

  async generatePublicKey(privateKey: PrivateKey): Promise<PublicKey> {
    const publicKeyGenerator = new PublicKeyGenerator(privateKey);

    return await publicKeyGenerator.generate();
  }

  async generateDigest(fileToDigestPath: Path): Promise<Digest> {
    const fileToDigest = await fsPromises.readFile(fileToDigestPath);

    const digestGenerator = new DigestGenerator(fileToDigest);

    return await digestGenerator.generate();
  }

  async sign(
    privateKey: PrivateKey,
    fileToSign: Path,
    options?: { hash?: Hash }
  ): Promise<Signature> {
    const signer = new Signer(privateKey, fileToSign, options);

    return await signer.sign();
  }

  async signDigest(
    privateKey: PrivateKey,
    fileToSign: Path
  ): Promise<Signature> {
    const signer = new Signer(privateKey, fileToSign);

    return await signer.signDigest();
  }

  async verify(
    publicKey: PublicKey,
    signature: Signature,
    originalFile: Path,
    options?: { hash?: Hash }
  ): Promise<boolean> {
    const verifier = new Verifier(publicKey, signature, originalFile, options);

    return await verifier.verify();
  }
}

export default new DigitalSignature();
