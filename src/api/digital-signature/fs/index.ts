import {
  Path,
  Hash,
  CypherType,
  ModulusLength,
} from "../../../api/digital-signature/utils/types";

abstract class DigitalSignatureFS {
  abstract generatePrivateKey(
    type?: CypherType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ): Promise<any>;

  abstract generatePublicKey(privateKeyPath: Path): Promise<any>;

  abstract generateDigest(
    fileToDigestPath: Path,
    options?: { hash?: Hash }
  ): Promise<any>;

  abstract sign(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ): Promise<any>;

  abstract signDigest(
    privateKeyPath: Path,
    fileToSignPath: Path,
    options?: { hash?: Hash }
  ): Promise<any>;

  abstract verify(
    publicKeyPath: Path,
    signatureFilePath: Path,
    originalFilePath: Path,
    options?: { hash?: Hash }
  ): Promise<any>;

  abstract verifyDigest(
    publicKeyPath: Path,
    signatureFilePath: Path,
    digestFilePath: Path,
    options?: { hash?: Hash }
  ): Promise<any>;
}

export default DigitalSignatureFS;
