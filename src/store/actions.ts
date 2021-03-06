import { State } from "./state";

export const actions = {
  /**
   * Toast
   */

  setShow({ commit }: any, show: boolean) {
    commit("setShow", show);
  },

  showToast({ commit }: any, { message, color }: State["toast"]) {
    commit("showToast", {
      show: true,
      message,
      color,
    });
  },

  /**
   *  Digital Signature
   */

  setType({ commit }: any, type?: string) {
    commit("setType", type);
  },
  setNamedCurve({ commit }: any, namedCurve?: string) {
    commit("setNamedCurve", namedCurve);
  },
  setModulusLength({ commit }: any, modulusLength?: number) {
    commit("setModulusLength", modulusLength);
  },

  setPrivateKeyFile({ commit }: any, privateKeyFile?: File) {
    commit("setPrivateKeyFile", privateKeyFile);
  },

  setPublicKeyFile({ commit }: any, publicKeyFile?: File) {
    commit("setPublicKeyFile", publicKeyFile);
  },

  setFileWithResult({ dispatch }: any, { dispatcher, file }: any) {
    const fileObj = new File([], file);
    Object.defineProperty(fileObj, "path", {
      writable: true,
    });
    fileObj.path = file;
    dispatch(dispatcher, fileObj);
  },

  setDigest({ commit }: any, digest?: boolean) {
    commit("setDigest", digest);
  },

  setFileToDigest({ commit }: any, fileToDigest?: File) {
    commit("setFileToDigest", fileToDigest);

    commit("setFileToSign", fileToDigest);
    commit("setOriginalFile", fileToDigest);
  },

  setFileToSign({ commit }: any, fileToSign?: File) {
    commit("setFileToSign", fileToSign);

    commit("setFileToDigest", fileToSign);
    commit("setOriginalFile", fileToSign);
  },

  setDigestToSign({ commit }: any, digestToSign?: File) {
    commit("setDigestToSign", digestToSign);

    commit("setDigestFile", digestToSign);
  },

  setHash({ commit }: any, hash?: string) {
    commit("setHash", hash);
  },

  setSignatureFile({ commit }: any, signatureFile?: File) {
    commit("setSignatureFile", signatureFile);
  },

  setOriginalFile({ commit }: any, originalFile?: File) {
    commit("setOriginalFile", originalFile);

    commit("setFileToDigest", originalFile);
    commit("setFileToSign", originalFile);
  },

  setDigestFile({ commit }: any, digestFile?: File) {
    commit("setDigestFile", digestFile);

    commit("setDigestToSign", digestFile);
  },

  // Use cases

  generatePrivateKey({ state }: any) {
    const { type, modulusLength, namedCurve } = state.digitalSignature;

    if (!type) return;
    if (type == "RSA" && !modulusLength) return;
    if (type == "EC" && !namedCurve) return;

    window.ipcRenderer.send("generate-private-key", {
      type,
      modulusLength,
      namedCurve,
    });
  },

  generatePublicKey({ state }: any) {
    const { privateKeyFile } = state.digitalSignature;
    if (!privateKeyFile) return;

    const privateKeyPath = privateKeyFile.path;
    if (!privateKeyPath) return;

    window.ipcRenderer.send("generate-public-key", privateKeyPath);
  },

  generateDigest({ state }: any) {
    const { fileToDigest, hash } = state.digitalSignature;

    if (!hash) return;
    if (!fileToDigest) return;

    const fileToDigestPath = fileToDigest.path;
    if (!fileToDigestPath) return;

    window.ipcRenderer.send("generate-digest", {
      fileToDigestPath,
      hash,
    });
  },

  signFile({ state }: any) {
    const { privateKeyFile, fileToSign, hash } = state.digitalSignature;

    if (!privateKeyFile) return;
    if (!fileToSign) return;
    if (!hash) return;

    const privateKeyPath = privateKeyFile.path;
    if (!privateKeyPath) return;

    const fileToSignPath = fileToSign.path;
    if (!fileToSignPath) return;

    window.ipcRenderer.send("sign", {
      privateKeyPath,
      fileToSignPath,
      hash,
    });
  },

  signDigest({ state }: any) {
    const { privateKeyFile, digestToSign, hash } = state.digitalSignature;

    if (!privateKeyFile) return;
    if (!digestToSign) return;
    if (!hash) return;

    const privateKeyPath = privateKeyFile.path;
    if (!privateKeyPath) return;

    const digestToSignPath = digestToSign.path;
    if (!digestToSignPath) return;

    window.ipcRenderer.send("sign-digest", {
      privateKeyPath,
      digestToSignPath,
      hash,
    });
  },

  verifyFile({ state }: any) {
    const { publicKeyFile, signatureFile, originalFile, hash } =
      state.digitalSignature;

    if (!publicKeyFile) return;
    if (!signatureFile) return;
    if (!originalFile) return;
    if (!hash) return;

    const publicKeyPath = publicKeyFile.path;
    if (!publicKeyPath) return;

    const signatureFilePath = signatureFile.path;
    if (!signatureFilePath) return;

    const originalFilePath = originalFile.path;
    if (!originalFilePath) return;

    window.ipcRenderer.send("verify", {
      publicKeyPath,
      signatureFilePath,
      originalFilePath,
      hash,
    });
  },

  verifyDigest({ state }: any) {
    const { publicKeyFile, signatureFile, digestFile, hash } =
      state.digitalSignature;

    if (!publicKeyFile) return;
    if (!signatureFile) return;
    if (!digestFile) return;
    if (!hash) return;

    const publicKeyPath = publicKeyFile.path;
    if (!publicKeyPath) return;

    const signatureFilePath = signatureFile.path;
    if (!signatureFilePath) return;

    const digestFilePath = digestFile.path;
    if (!digestFilePath) return;

    window.ipcRenderer.send("verify-digest", {
      publicKeyPath,
      signatureFilePath,
      digestFilePath,
      hash,
    });
  },
};
