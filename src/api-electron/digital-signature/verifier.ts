import AbstractVerifier from "@/api/digital-signature/verifier";
import {
  PublicKey,
  Signature,
  Path,
  Hash,
} from "@/api/digital-signature/types";
import crypto from "crypto";

class Verifier extends AbstractVerifier {
  constructor(
    publicKey: PublicKey,
    signature: Signature,
    originalFile: Path,
    options?: {
      hash?: Hash;
    }
  ) {
    super(publicKey, signature, originalFile, options);
  }

  verify(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const defaultHash: Hash = "SHA1";

      try {
        const verifier = crypto.createVerify(
          this.options && this.options.hash ? this.options.hash : defaultHash
        );
        verifier.write(this.originalFile);
        verifier.end();

        // Verify binary file signature
        const result = verifier.verify(
          this.publicKey,
          this.signature as any,
          "binary" as any
        );

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Verifier;
