import { Path, Hash, Digest } from "../../api/digital-signature/utils/types";

abstract class DigestGenerator {
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

  abstract generate(): Promise<Digest>;
}

export default DigestGenerator;
