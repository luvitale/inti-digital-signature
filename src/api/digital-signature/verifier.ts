import {
  PublicKey,
  Signature,
  Path,
  Hash,
} from "../../api/digital-signature/utils/types";

abstract class Verifier {
  publicKey: PublicKey;
  signature: Signature;
  originalFile: Path;
  options: { hash?: Hash | undefined } | undefined;
  constructor(
    publicKey: PublicKey,
    signature: Signature,
    originalFile: Path,
    options?: {
      hash?: Hash;
    }
  ) {
    this.publicKey = publicKey;
    this.signature = signature;
    this.originalFile = originalFile;
    this.options = options;
  }

  abstract verify(): Promise<boolean>;

  abstract verifyDigest(): Promise<boolean>;
}

export default Verifier;
