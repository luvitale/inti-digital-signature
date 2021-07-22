// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import digitalSignature from './digital-signature';
import path from 'path';

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

  document.getElementById("generate-public-key").addEventListener("click", () => {
    digitalSignature.generatePublicKey(path.join("dist", "priv1.pem"));
  });

  document.getElementById("sign").addEventListener("click", () => {
    digitalSignature.sign(path.join("dist", "priv1.pem"), "LICENSE.md");
  });

  document.getElementById("verify").addEventListener("click", () => {
    digitalSignature.verify(
      path.join("dist", "pub1.pem"),
      path.join("dist", "firma.bin"),
      "LICENSE.md"
    );
  });

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
});
