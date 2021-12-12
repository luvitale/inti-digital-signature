import { State } from "./state";

export const mutations = {
  setShow(state: State, show: boolean) {
    state.toast.show = show;
  },

  showToast(state: State, toast: any) {
    state.toast = toast;
  },

  setType(state: State, type: string) {
    state.digitalSignature.type = type;
  },

  setModulusLength(state: State, modulusLength: number) {
    state.digitalSignature.modulusLength = modulusLength;
  },

  setNamedCurve(state: State, namedCurve: string) {
    state.digitalSignature.namedCurve = namedCurve;
  },

  setPrivateKeyFile(state: State, privateKeyFile: File) {
    state.digitalSignature.privateKeyFile = privateKeyFile;
  },

  setPublicKeyFile(state: State, publicKeyFile: File) {
    state.digitalSignature.publicKeyFile = publicKeyFile;
  },
};
