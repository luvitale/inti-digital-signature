import AbstractDigitalSignature from "@/api/digital-signature";
import i18n from "@/i18n";
import forge from "node-forge";
import fileSaver from "file-saver";
import {
  CypherType,
  ModulusLength,
  PrivateKey,
  Path,
  Digest,
  Hash,
  Signature,
  PublicKey,
} from "@/api/digital-signature/types";

class DigitalSignature extends AbstractDigitalSignature {
  generatePrivateKey(
    type?: CypherType,
    options?: {
      modulusLength?: ModulusLength | undefined;
      namedCurve?: string | undefined;
    }
  ): Promise<PrivateKey> {
    throw new Error("Method not implemented.");
  }

  async generatePublicKey(privateKey: PrivateKey): Promise<PublicKey> {
    const forgePrivateKey = forge.pki.privateKeyFromPem(privateKey as string);

    const forgePublicKey = forge.pki.rsa.setPublicKey(
      forgePrivateKey.n,
      forgePrivateKey.e
    );

    return forge.pki.publicKeyToPem(forgePublicKey);
  }

  generateDigest(fileToDigestPath: Path): Promise<Digest> {
    throw new Error("Method not implemented.");
  }
  sign(
    privateKey: PrivateKey,
    fileToSign: Path,
    options?: { hash?: Hash | undefined }
  ): Promise<Signature> {
    throw new Error("Method not implemented.");
  }
  signDigest(privateKey: PrivateKey, fileToSign: Path): Promise<Signature> {
    throw new Error("Method not implemented.");
  }
  verify(
    publicKey: PublicKey,
    signature: Signature,
    originalFile: Path,
    options?: { hash?: Hash | undefined }
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export default new DigitalSignature();
