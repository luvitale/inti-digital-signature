import {
  PrivateKey,
  Path,
  Hash,
  Signature,
} from "../../api/digital-signature/utils/types";
import asn1PrefixGetter from "../../api/digital-signature/utils/asn1-prefix-getter";
import crypto from "crypto";

class Signer {
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
    const defaultHash = "SHA1";
    return new Promise((resolve, reject) => {
      try {
        const digest = this.fileToSign.toString();
        const fingerprint = Buffer.from(digest, "hex");
        const id = asn1PrefixGetter.get(
          this.options && this.options.hash ? this.options.hash : defaultHash
        );
        const allData = Buffer.concat([id as Buffer, fingerprint]);
        const signature = crypto.privateEncrypt(this.privateKey, allData);

        resolve(signature);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Signer;
