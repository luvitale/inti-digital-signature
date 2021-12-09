import { Path, Hash, Digest } from "../../api/digital-signature/utils/types";
import crypto from "crypto";

class DigestGenerator {
  fileToDigest: Path;
  options: { hash?: Hash | undefined } | undefined;
  constructor(
    fileToDigest: Path,
    options?: {
      hash?: Hash;
    }
  ) {
    this.fileToDigest = fileToDigest;
    this.options = options;
  }

  async generate(): Promise<Digest> {
    return new Promise((resolve, reject) => {
      const defaultHash = "SHA1";

      try {
        const hash = crypto.createHash(
          this.options && this.options.hash ? this.options.hash : defaultHash
        );

        hash.write(this.fileToDigest);
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
