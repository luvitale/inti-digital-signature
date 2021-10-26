import { PrivateKey, Path, Hash, Signature } from "./types";
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
        const id = getASN1Prefix(
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

const getASN1Prefix = (hash: Hash): Buffer | undefined => {
  if (hash == "SHA1") {
    return Buffer.from([
      0x30, 0x21, 0x30, 0x09, 0x06, 0x05, 0x2b, 0x0e, 0x03, 0x02, 0x1a, 0x05,
      0x00, 0x04, 0x14,
    ]);
  }
  if (hash == "SHA256") {
    return Buffer.from([
      0x30, 0x31, 0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03,
      0x04, 0x02, 0x01, 0x05, 0x00, 0x04, 0x20,
    ]);
  }
};

export default Signer;
