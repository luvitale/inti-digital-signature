import {
  PrivateKey,
  Path,
  Hash,
  Signature,
} from "@/api/digital-signature/types";

abstract class Signer {
  privateKey: PrivateKey;
  fileToSign: Path;
  options: { hash?: Hash | undefined } | undefined;
  constructor(
    privateKey: PrivateKey,
    fileToSign: Path,
    options?: {
      hash?: Hash;
    }
  ) {
    this.privateKey = privateKey;
    this.fileToSign = fileToSign;
    this.options = options;
  }

  abstract sign(): Promise<Signature>;

  abstract signDigest(): Promise<Signature>;
}

export default Signer;
