import AbstractPublicKeyGenerator from "../../api/digital-signature/public-key-generator";
import { PublicKey } from "../../api/digital-signature/utils/types";
import crypto from "crypto";
import { keyFormat } from "../../api/digital-signature/utils/key-options-getter";

class PublicKeyGenerator extends AbstractPublicKeyGenerator {
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
