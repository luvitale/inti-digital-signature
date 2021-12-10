import {
  Path,
  Hash,
  PrivateKey,
  PublicKey,
  Digest,
  Signature,
  CypherType,
  ModulusLength,
} from "../../../api/digital-signature/utils/types";

abstract class DigitalSignatureLoader {
  abstract generatePrivateKey(
    type?: CypherType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ): Promise<PrivateKey>;

  abstract generatePublicKey(privateKeyPath: Path): Promise<PublicKey>;

  abstract generateDigest(
    fileToDigestPath: Path,
    options?: { hash?: Hash }
  ): Promise<Digest>;

  abstract sign(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ): Promise<Signature>;

  abstract signDigest(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ): Promise<Signature>;

  abstract verify(
    publicKeyPath: Path,
    signatureFilePath: Path,
    originalFilePath: Path,
    options?: { hash?: Hash }
  ): Promise<boolean>;

  abstract verifyDigest(
    publicKeyPath: Path,
    signatureFilePath: Path,
    digestFilePath: Path,
    options?: { hash?: Hash }
  ): Promise<boolean>;
}

export default DigitalSignatureLoader;
