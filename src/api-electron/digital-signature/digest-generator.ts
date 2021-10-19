import AbstractDigestGenerator from "@/api/digital-signature/digest-generator";
import { Path, Hash, Digest } from "@/api/digital-signature/types";
import crypto from "crypto";

class DigestGenerator extends AbstractDigestGenerator {
  constructor(
    fileToDigest: Path,
    options?: {
      hash?: Hash;
    }
  ) {
    super(fileToDigest, options);
  }

  async generate(): Promise<Digest> {
    return new Promise((resolve, reject) => {
      const defaultHash = "SHA1";

      try {
        const hash = crypto.createHash(
          this.options && this.options.hash ? this.options.hash : defaultHash
        );

        hash.write(this.fileToDigest.toString());
        hash.end();

        const digest = hash.digest("hex");

        resolve(digest);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default DigestGenerator;
