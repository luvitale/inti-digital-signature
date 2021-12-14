const defaultTimeout = 2000; // 2 seconds
const defaultIcon = "mdi-check";
const defaultNamedCurve = "P-256";

export const state = {
  digitalSignature: {
    type: undefined as string | undefined,
    modulusLength: undefined as number | undefined,
    namedCurve: defaultNamedCurve as string | undefined,
    privateKeyFile: undefined as File | undefined,
    publicKeyFile: undefined as File | undefined,
    digest: false,
    fileToDigest: undefined as File | undefined,
    fileToSign: undefined as File | undefined,
    digestToSign: undefined as File | undefined,
    hash: undefined as string | undefined,
    signatureFile: undefined as File | undefined,
    originalFile: undefined as File | undefined,
    digestFile: undefined as File | undefined,
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
