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

  sign(privateKeyPath, fileToSignPath, defaultFilename) {
    return new Promise((resolve, reject) => {
      const signCommand = `openssl dgst -sha1 -sign "${privateKeyPath}" -out "${defaultFilename}" "${fileToSignPath}"`
      child_process.exec(signCommand, (err, signedFile, stderr) => {
        if (err) reject(err)

        resolve(signedFile)
      })
    })
  }

  verify(publicKeyPath, fileToVerifyPath, originalFilePath) {
    return new Promise((resolve, reject) => {
      const verifyCommand = `openssl dgst -sha1 -verify "${publicKeyPath}" -signature "${fileToVerifyPath}" "${originalFilePath}"`
      child_process.exec(verifyCommand, (err, result, stderr) => {
        if (err) reject(err)

        resolve(result)
      })
    })
  }
}
