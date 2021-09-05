import { CypherType, ModulusLength, PublicKey, PrivateKey } from "./types";
import crypto from "crypto";
import keyOptionsGetter from "./key-options-getter";

const defaultType: CypherType = "rsa";

class PrivateKeyGenerator {
  type: CypherType;
  options:
    | {
        modulusLength?: ModulusLength | undefined;
        namedCurve?: string | undefined;
      }
    | undefined;

  constructor(
    type: CypherType = defaultType,
    options?: {
      modulusLength?: ModulusLength;
      namedCurve?: string;
    }
  ) {
    this.type = type;
    this.options = options;
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
