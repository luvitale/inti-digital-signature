import AbstractPrivateKeyGenerator from "@/api/digital-signature/private-key-generator";
import {
  CypherType,
  ModulusLength,
  PublicKey,
  PrivateKey,
} from "@/api/digital-signature/types";
import crypto from "crypto";
import keyOptionsGetter from "./key-options-getter";

const defaultType: CypherType = "rsa";

class PrivateKeyGenerator extends AbstractPrivateKeyGenerator {
  constructor(
    type: CypherType = defaultType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ) {
    super(type, options);
  }

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
