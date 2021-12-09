import AbstractDigitalSignature from "../../api/digital-signature";
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
  Signature,
} from "../../api/digital-signature/utils/types";

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

  async generateDigest(
    fileToDigest: Buffer,
    options?: {
      hash?: Hash;
    }
  ): Promise<Digest> {
    const digestGenerator = new DigestGenerator(fileToDigest, options);

    return await digestGenerator.generate();
  }

  async sign(
    privateKey: PrivateKey,
    fileToSign: Buffer,
    options?: { hash?: Hash }
  ): Promise<Signature> {
    const signer = new Signer(privateKey, fileToSign, options);

    return await signer.sign();
  }

  async signDigest(
    privateKey: PrivateKey,
    fileToSign: Buffer,
    options?: { hash?: Hash }
  ): Promise<Signature> {
    const signer = new Signer(privateKey, fileToSign, options);

    return await signer.signDigest();
  }

  async verify(
    publicKey: PublicKey,
    signature: Signature,
    originalFile: Buffer,
    options?: { hash?: Hash }
  ): Promise<boolean> {
    const verifier = new Verifier(publicKey, signature, originalFile, options);

    return await verifier.verify();
  }

  async verifyDigest(
    publicKey: PublicKey,
    signature: Signature,
    digestFile: Buffer,
    options?: { hash?: Hash }
  ): Promise<boolean> {
    const verifier = new Verifier(publicKey, signature, digestFile, options);

    return await verifier.verifyDigest();
  }
}

export default new DigitalSignature();
