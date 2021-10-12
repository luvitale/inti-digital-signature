import AbstractPublicKeyGenerator from "@/api/digital-signature/public-key-generator";
import { PrivateKey, PublicKey } from "@/api/digital-signature/types";
import crypto from "crypto";
import { keyFormat } from "./key-options-getter";

class PublicKeyGenerator extends AbstractPublicKeyGenerator {
  constructor(privateKey: PrivateKey) {
    super(privateKey);
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
