import AbstractSigner from "@/api/digital-signature/signer";
import {
  PrivateKey,
  Path,
  Hash,
  Signature,
} from "@/api/digital-signature/types";
import crypto from "crypto";

class Signer extends AbstractSigner {
  constructor(
    privateKey: PrivateKey,
    fileToSign: Path,
    options?: {
      hash?: Hash;
    }
  ) {
    super(privateKey, fileToSign, options);
  }

  async sign(): Promise<Signature> {
    return new Promise((resolve, reject) => {
      const defaultHash = "SHA1";

      try {
        // Signing
        const signer = crypto.createSign(
          this.options && this.options.hash ? this.options.hash : defaultHash
        );
        signer.write(this.fileToSign);
        signer.end();

        // Returns the signature in binary output_format
        const signature = signer.sign(this.privateKey, "binary" as any);

        resolve(signature);
      } catch (error) {
        reject(error);
      }
    });
  }

  async signDigest(): Promise<Signature> {
    return new Promise((resolve, reject) => {
      try {
        const digest = this.fileToSign as Buffer;

        const signature = crypto.publicEncrypt(this.privateKey, digest);

        resolve(signature);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Signer;
