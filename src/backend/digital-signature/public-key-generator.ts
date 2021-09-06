import { PrivateKey, PublicKey } from "./types";
import crypto from "crypto";
import { keyFormat } from "./key-options-getter";

class PublicKeyGenerator {
  privateKey: PrivateKey;
  constructor(privateKey: PrivateKey) {
    this.privateKey = privateKey;
  }

  async generate(): Promise<PublicKey> {
    return new Promise((resolve, reject) => {
      try {
        const pubKeyObject = crypto.createPublicKey({
          key: this.privateKey as any,
          format: keyFormat as any,
        });

        const publicKey = pubKeyObject.export({
          type: "spki",
          format: keyFormat as any,
        });

        resolve(publicKey.toString("base64"));
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default PublicKeyGenerator;
