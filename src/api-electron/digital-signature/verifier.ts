import {
  PublicKey,
  Signature,
  Path,
  Hash,
} from "../../api/digital-signature/utils/types";
import asn1PrefixGetter from "../../api/digital-signature/utils/asn1-prefix-getter";
import crypto from "crypto";

class Verifier {
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

  verifyDigest(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const defaultHash: Hash = "SHA1";

      try {
        const digest = this.originalFile.toString();
        const fingerprint = Buffer.from(digest, "hex");

        const id = asn1PrefixGetter.get(
          this.options && this.options.hash ? this.options.hash : defaultHash
        );
        const inputData = Buffer.concat([id as Buffer, fingerprint]).toString(
          "hex"
        );

        const decryptedData = crypto
          .publicDecrypt(this.publicKey, Buffer.from(this.signature))
          .toString("hex");

        const result = inputData == decryptedData;

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Verifier;
