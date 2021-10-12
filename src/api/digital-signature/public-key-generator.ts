import { PrivateKey, PublicKey } from "@/api/digital-signature/types";

abstract class PublicKeyGenerator {
  privateKey: PrivateKey;
  constructor(privateKey: PrivateKey) {
    this.privateKey = privateKey;
  }

  abstract generate(): Promise<PublicKey>;
}

export default PublicKeyGenerator;
