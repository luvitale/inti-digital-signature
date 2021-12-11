import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    digitalSignature: {
      type: "rsa",
      modulusLength: 2048,
      namedCurve: "P-256",
      privateKeyFile: [],
      publicKeyFile: [],
      fileToSign: [],
      digestToSign: [],
      hash: "",
      signatureFile: [],
      originalFile: [],
      digestFile: [],
    },
  },
  mutations: {
    setType(state, type) {
      state.digitalSignature.type = type;
    },

    setModulusLength(state, modulusLength) {
      state.digitalSignature.modulusLength = modulusLength;
    },

    setNamedCurve(state, namedCurve) {
      state.digitalSignature.namedCurve = namedCurve;
    },

    setPrivateKeyFile(state, privateKeyFile) {
      state.digitalSignature.privateKeyFile = privateKeyFile;
    },
  },
  actions: {
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

    showToast({ commit }, message) {
      console.log(message);
    },

    generatePrivateKey() {
      const { type, modulusLength, namedCurve } = this.state.digitalSignature;

      window.ipcRenderer.send("generate-private-key", {
        type,
        modulusLength,
        namedCurve,
      });
    },
  },
  modules: {},
});
