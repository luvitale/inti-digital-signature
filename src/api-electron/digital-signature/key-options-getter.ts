import crypto from "crypto";
import {
  CypherType,
  ModulusLength,
  KeyFormat,
} from "@/api/digital-signature/types";

export const keyFormat: KeyFormat = "pem";

const publicKeyTypeEncoding = "spki";
const privateKeyTypeEncoding = "pkcs8";

const defaultModulusLength: ModulusLength = 2048;
const defaultNamedCurve = "P-256";

abstract class KeyOptionsGetter {
  protected next?: KeyOptionsGetter;

  public abstract process(
    type: CypherType,
    options?: { modulusLength: ModulusLength; namedCurve: string }
  ):
    | crypto.RSAKeyPairOptions<KeyFormat, KeyFormat>
    | crypto.ECKeyPairOptions<KeyFormat, KeyFormat>
    | undefined;

  public setNextHandler(keyOptionsGetter: KeyOptionsGetter) {
    return (this.next = keyOptionsGetter);
  }
}

class RSAKeyOptionsGetter extends KeyOptionsGetter {
  process(type: CypherType, options?: { modulusLength: ModulusLength }) {
    if (type.toLowerCase() === "rsa") {
      const keyOptions: crypto.RSAKeyPairOptions<KeyFormat, KeyFormat> = {
        modulusLength: options ? options.modulusLength : defaultModulusLength,
        publicKeyEncoding: {
          type: publicKeyTypeEncoding as any,
          format: keyFormat,
        },
        privateKeyEncoding: {
          type: privateKeyTypeEncoding as any,
          format: keyFormat,
        },
      };

      return keyOptions;
    }

    if (this.next) {
      return this.next.process(type, options as any);
    }
  }
}

class ECKeyOptionsGetter extends KeyOptionsGetter {
  process(type: CypherType, options?: { namedCurve: string }) {
    if (type.toLowerCase() === "ec") {
      const keyOptions: crypto.ECKeyPairOptions<KeyFormat, KeyFormat> = {
        namedCurve: options ? options.namedCurve : defaultNamedCurve,
        publicKeyEncoding: {
          type: publicKeyTypeEncoding as any,
          format: keyFormat,
        },
        privateKeyEncoding: {
          type: privateKeyTypeEncoding as any,
          format: keyFormat,
        },
      };

      return keyOptions;
    }

    if (this.next) {
      this.next.process(type, options as any);
    }
  }
}

const rsaKeyOptionsGetter = new RSAKeyOptionsGetter();
const ecKeyOptionsGetter = new ECKeyOptionsGetter();

rsaKeyOptionsGetter.setNextHandler(ecKeyOptionsGetter);

export default rsaKeyOptionsGetter;
