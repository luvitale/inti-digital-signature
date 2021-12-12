const defaultTimeout = 2000; // 2 seconds
const defaultIcon = "mdi-check";
const defaultCypher = "rsa";
const defaultModulusLength = 2048;
const defaultNamedCurve = "P-256";

export const state = {
  digitalSignature: {
    type: defaultCypher,
    modulusLength: defaultModulusLength,
    namedCurve: defaultNamedCurve,
    privateKeyFile: {} as File,
    publicKeyFile: {} as File,
    digest: false,
    fileToDigest: {} as File,
    fileToSign: {} as File,
    digestToSign: {} as File,
    hash: "",
    signatureFile: {} as File,
    originalFile: {} as File,
    digestFile: {} as File,
  },
  toast: {
    show: false,
    message: "",
    color: "",
    icon: defaultIcon,
    timer: defaultTimeout,
  },
};

export type State = typeof state;
