import { State } from "./state";

export const mutations = {
  setShow(state: State, show: boolean) {
    state.toast.show = show;
  },

  showToast(state: State, toast: any) {
    state.toast = toast;
  },

  setType(state: State, type?: string) {
    state.digitalSignature.type = type;
  },

  setModulusLength(state: State, modulusLength?: number) {
    state.digitalSignature.modulusLength = modulusLength;
  },

  setNamedCurve(state: State, namedCurve?: string) {
    state.digitalSignature.namedCurve = namedCurve;
  },

  setPrivateKeyFile(state: State, privateKeyFile?: File) {
    state.digitalSignature.privateKeyFile = privateKeyFile;
  },

  setPublicKeyFile(state: State, publicKeyFile?: File) {
    state.digitalSignature.publicKeyFile = publicKeyFile;
  },

  setDigest(state: State, digest: boolean) {
    state.digitalSignature.digest = digest;
  },

  setFileToDigest(state: State, fileToDigest?: File) {
    state.digitalSignature.fileToDigest = fileToDigest;
  },

  setFileToSign(state: State, fileToSign?: File) {
    state.digitalSignature.fileToSign = fileToSign;
  },

  setDigestToSign(state: State, digestToSign?: File) {
    state.digitalSignature.digestToSign = digestToSign;
  },

  setHash(state: State, hash?: string) {
    state.digitalSignature.hash = hash;
  },

  setSignatureFile(state: State, signatureFile?: File) {
    state.digitalSignature.signatureFile = signatureFile;
  },

  setOriginalFile(state: State, originalFile?: File) {
    state.digitalSignature.originalFile = originalFile;
  },

  setDigestFile(state: State, digestFile?: File) {
    state.digitalSignature.digestFile = digestFile;
  },
};
