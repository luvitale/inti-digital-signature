// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import digitalSignature from './digital-signature';

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  document.getElementById("generate-private-key").addEventListener("click", () => {
    digitalSignature.generatePrivateKey();
  });

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
});
