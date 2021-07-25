import path from "path";
import child_process from "child_process";

export class DigitalSignature {
  constructor() {}

  generatePrivateKey() {
    return new Promise((resolve, reject) => {
      const generatePrivateKeyCommand = `openssl genrsa 2048`
      child_process.exec(generatePrivateKeyCommand, (err, privateKey, stderr) => {
        if (err) reject(err)

        resolve(privateKey)
      })
    })
  }

  generatePublicKey(privateKeyPath) {
    return new Promise((resolve, reject) => {
      const generatePublicKeyCommand = `openssl rsa -in "${privateKeyPath}" -pubout`
      child_process.exec(generatePublicKeyCommand, (err, publicKey, stderr) => {
        if (err) reject(err)

        resolve(publicKey)
      })
    })
  }

  sign(privateKeyPath, fileToSignPath) {
    return new Promise((resolve, reject) => {
      const signCommand = `openssl dgst -sha1 -sign "${privateKeyPath}" "${fileToSignPath}"`
      child_process.exec(signCommand, (err, publicKey, stderr) => {
        if (err) reject(err)

        resolve(publicKey)
      })
    })
  }

  verify(pubKeyFile, fileToVerify, originalFile) {
    const command = "openssl";

    const args = [
      `dgst -sha1 -verify "${pubKeyFile}" -signature "${fileToVerify}" "${originalFile}"`,
    ];

    const child = child_process.spawn(command, args, {
      shell: true,
    });

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (data) => {
      //Here is the output
      data = data.toString();
      console.log(data);
    });

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (data) => {
      //Here is the output from the command
      console.log(data);
    });
  }
}
