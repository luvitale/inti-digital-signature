import {
  Hash,
  CypherType,
  ModulusLength,
  PrivateKey,
  PublicKey,
  Digest,
  Path,
  Signature,
} from "../../api/digital-signature/utils/types";

abstract class DigitalSignature {
  abstract generatePrivateKey(
    type?: CypherType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ): Promise<PrivateKey>;

  abstract generatePublicKey(privateKey: PrivateKey): Promise<PublicKey>;

  abstract generateDigest(fileToDigest: Path): Promise<Digest>;

  abstract sign(
    privateKey: PrivateKey,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ): Promise<Signature>;

  abstract signDigest(
    privateKey: PrivateKey,
    fileToSign: Buffer,
    options?: { hash?: Hash }
  ): Promise<Signature>;

  abstract verify(
    publicKey: PublicKey,
    signature: Signature,
    originalFile: Buffer,
    options?: { hash?: Hash }
  ): Promise<boolean>;

  abstract verifyDigest(
    publicKey: PublicKey,
    signature: Signature,
    digestFile: Buffer,
    options?: { hash?: Hash }
  ): Promise<boolean>;
}

export default DigitalSignature;
