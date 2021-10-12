import {
  PrivateKey,
  CypherType,
  ModulusLength,
  PublicKey,
  Digest,
  Path,
  Hash,
  Signature,
} from "./types";

abstract class DigitalSignature {
  abstract generatePrivateKey(
    type?: CypherType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ): Promise<PrivateKey>;

  abstract generatePublicKey(privateKey: PrivateKey): Promise<PublicKey>;

  abstract generateDigest(fileToDigestPath: Path): Promise<Digest>;

  abstract sign(
    privateKey: PrivateKey,
    fileToSign: Path,
    options?: { hash?: Hash }
  ): Promise<Signature>;

  abstract signDigest(
    privateKey: PrivateKey,
    fileToSign: Path
  ): Promise<Signature>;

  abstract verify(
    publicKey: PublicKey,
    signature: Signature,
    originalFile: Path,
    options?: { hash?: Hash }
  ): Promise<boolean>;
}

export default DigitalSignature;
