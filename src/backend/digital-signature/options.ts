import crypto from "crypto";
import { CypherType, ModulusLength, KeyFormat } from "./types";

export const keyFormat: KeyFormat = "pem";

const getRSAOptions = (
  modulusLength: ModulusLength = 2048
): crypto.RSAKeyPairOptions<KeyFormat, KeyFormat> => {
  const publicKeyTypeEncoding = "spki";
  const privateKeyTypeEncoding = "pkcs8";

  return {
    modulusLength,
    publicKeyEncoding: {
      type: publicKeyTypeEncoding,
      format: keyFormat,
    },
    privateKeyEncoding: {
      type: privateKeyTypeEncoding,
      format: keyFormat,
    },
  };
};

const getDSAOptions = (
  modulusLength: ModulusLength = 2048
): crypto.DSAKeyPairOptions<KeyFormat, KeyFormat> => {
  const publicKeyTypeEncoding = "spki";
  const privateKeyTypeEncoding = "pkcs8";
  const divisorLength = modulusLength == 1024 ? 160 : 256;

  return {
    modulusLength,
    divisorLength,
    publicKeyEncoding: {
      type: publicKeyTypeEncoding,
      format: keyFormat,
    },
    privateKeyEncoding: {
      type: privateKeyTypeEncoding,
      format: keyFormat,
    },
  };
};

const getECOptions = (
  namedCurve = "sect239k1"
): crypto.ECKeyPairOptions<KeyFormat, KeyFormat> => {
  const publicKeyTypeEncoding = "spki";
  const privateKeyTypeEncoding = "pkcs8";

  return {
    namedCurve,
    publicKeyEncoding: {
      type: publicKeyTypeEncoding,
      format: keyFormat,
    },
    privateKeyEncoding: {
      type: privateKeyTypeEncoding,
      format: keyFormat,
    },
  };
};

const getOptions = (
  type: CypherType,
  options?: {
    modulusLength?: ModulusLength;
    namedCurve?: string;
  }
) => {
  if (type == "rsa") {
    return getRSAOptions(options ? options.modulusLength : 2048);
  } else if (type == "dsa") {
    return getDSAOptions(options ? options.modulusLength : 2048);
  } else if (type == "ec") {
    return getECOptions(options ? options.namedCurve : "sect239k1");
  } else {
    console.log("Cypher Type unvalid");
  }
};

export default getOptions;
