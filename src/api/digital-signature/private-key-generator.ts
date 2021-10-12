import {
  CypherType,
  ModulusLength,
  PrivateKey,
} from "@/api/digital-signature/types";

const defaultType: CypherType = "rsa";

abstract class PrivateKeyGenerator {
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

  abstract generate(): Promise<PrivateKey>;
}

export default PrivateKeyGenerator;
