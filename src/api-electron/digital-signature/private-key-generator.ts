import AbstractPrivateKeyGenerator from "../../api/digital-signature/private-key-generator";
import { PublicKey, PrivateKey } from "../../api/digital-signature/utils/types";
import crypto from "crypto";
import keyOptionsGetter from "../../api/digital-signature/utils/key-options-getter";

class PrivateKeyGenerator extends AbstractPrivateKeyGenerator {
  async generate(): Promise<PrivateKey> {
    return new Promise((resolve, reject) => {
      const keyOptions = keyOptionsGetter.process(
        this.type,
        this.options as any
      );

      crypto.generateKeyPair(
        this.type as any,
        keyOptions,
        (
          error: Error | null,
          _publicKey: PublicKey,
          privateKey: PrivateKey
        ) => {
          if (error) reject(error);

          resolve(privateKey);
        }
      );
    });
  }
}

export default PrivateKeyGenerator;
