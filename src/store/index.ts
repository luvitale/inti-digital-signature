import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const defaultTimeout = 2000; // 2 seconds
const defaultIcon = "mdi-check";

export default new Vuex.Store({
  state: {
    digitalSignature: {
      type: "rsa",
      modulusLength: 2048,
      namedCurve: "P-256",
      privateKeyFile: {} as File,
      publicKeyFile: {} as File,
      fileToSign: [],
      digestToSign: [],
      hash: "",
      signatureFile: [],
      originalFile: [],
      digestFile: [],
    },
    toast: {
      show: false,
      message: "",
      color: "",
      icon: defaultIcon,
      timer: defaultTimeout,
    },
  },
  mutations: {
    setShow(state, show) {
      state.toast.show = show;
    },

    showToast(state, toast) {
      state.toast = toast;
    },

    setType(state, type) {
      state.digitalSignature.type = type;
    },

    setModulusLength(state, modulusLength) {
      state.digitalSignature.modulusLength = modulusLength;
    },

    setNamedCurve(state, namedCurve) {
      state.digitalSignature.namedCurve = namedCurve;
    },

    setPrivateKeyFile(state, privateKeyFile: File) {
      state.digitalSignature.privateKeyFile = privateKeyFile;
    },

    setPublicKeyFile(state, publicKeyFile: File) {
      state.digitalSignature.publicKeyFile = publicKeyFile;
    },
  },
  actions: {
    /**
     * Toast
     */

    setShow({ commit }, show) {
      commit("setShow", show);
    },

    showToast({ commit }, { message, color }) {
      commit("showToast", {
        show: true,
        message,
        color,
      });
    },

    /**
     *  Digital Signature
     */

    setType({ commit }, type) {
      commit("setType", type);
    },
    setNamedCurve({ commit }, namedCurve) {
      commit("setNamedCurve", namedCurve);
    },
    setModulusLength({ commit }, modulusLength) {
      commit("setModulusLength", modulusLength);
    },

    setPrivateKeyFile({ commit }, privateKeyFile) {
      commit("setPrivateKeyFile", privateKeyFile);
    },

    setPublicKeyFile({ commit }, publicKeyFile) {
      commit("setPublicKeyFile", publicKeyFile);
    },

    setFileWithResult({ dispatch }, { dispatcher, file }) {
      const fileObj = new File([], file);
      Object.defineProperty(fileObj, "path", {
        writable: true,
      });
      fileObj.path = file;
      dispatch(dispatcher, fileObj);
    },

    // Use cases

    generatePrivateKey({ state }) {
      const { type, modulusLength, namedCurve } = state.digitalSignature;

      window.ipcRenderer.send("generate-private-key", {
        type,
        modulusLength,
        namedCurve,
      });
    },

    generatePublicKey({ state }) {
      console.log(state.digitalSignature.privateKeyFile);
      const privateKeyPath = state.digitalSignature.privateKeyFile.path;
      window.ipcRenderer.send("generate-public-key", privateKeyPath);
    },
  },
  modules: {},
});
