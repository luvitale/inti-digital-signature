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

  setType({ commit }: any, type: string) {
    commit("setType", type);
  },
  setNamedCurve({ commit }: any, namedCurve: string) {
    commit("setNamedCurve", namedCurve);
  },
  setModulusLength({ commit }: any, modulusLength: number) {
    commit("setModulusLength", modulusLength);
  },

  setPrivateKeyFile({ commit }: any, privateKeyFile: File) {
    commit("setPrivateKeyFile", privateKeyFile);
  },

  setPublicKeyFile({ commit }: any, publicKeyFile: File) {
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

  // Use cases

  generatePrivateKey({ state }: any) {
    const { type, modulusLength, namedCurve } = state.digitalSignature;

    window.ipcRenderer.send("generate-private-key", {
      type,
      modulusLength,
      namedCurve,
    });
  },

  generatePublicKey({ state }: any) {
    const privateKeyPath = state.digitalSignature.privateKeyFile.path;
    window.ipcRenderer.send("generate-public-key", privateKeyPath);
  },
};
