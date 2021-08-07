import { promises as fsPromises } from "fs";
import crypto from "crypto";

export default class DigitalSignature {
  constructor(
    hash = "SHA1",
    modulusLength = 2048,
    cypher = "rsa",
    keyFormat = "pem"
  ) {
    this.hash = hash;
    this.modulusLength = modulusLength;
    this.cypher = cypher;
    this.keyFormat = keyFormat;
  }

  async generatePrivateKey() {
    return new Promise((resolve, reject) => {
      crypto.generateKeyPair(
        this.cypher,
        {
          modulusLength: this.modulusLength,
          publicKeyEncoding: {
            type: "spki",
            format: this.keyFormat,
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: this.keyFormat,
          },
        },
        (error, _publicKey, privateKey) => {
          if (error) reject(error);

          resolve(privateKey);
        }
      );
    });
  }

  async generatePublicKey(privateKeyPath) {
    return new Promise((resolve, reject) => {
      fsPromises
        .readFile(privateKeyPath)
        .then((privateKey) =>
          crypto.createPublicKey({
            key: privateKey,
            format: this.keyFormat,
          })
        )
        .then((pubKeyObject) =>
          pubKeyObject.export({
            type: "spki",
            format: this.keyFormat,
          })
        )
        .then((publicKey) => resolve(publicKey.toString("base64")))
        .catch((error) => reject(error));
    });
  }

  async sign(privateKeyPath, fileToSignPath) {
    const privateKey = await fsPromises.readFile(privateKeyPath);
    const fileToSign = await fsPromises.readFile(fileToSignPath);

    return new Promise((resolve, reject) => {
      try {
        // Signing
        const signer = crypto.createSign(this.hash);
        signer.write(fileToSign);
        signer.end();

        // Returns the signature in binary output_format
        const signature = signer.sign(privateKey, "binary");

        resolve(signature);
      } catch (error) {
        reject(error);
      }
    });
  }

  async verify(publicKeyPath, signatureFilePath, originalFilePath) {
    const publicKey = await fsPromises.readFile(publicKeyPath);
    const signature = await fsPromises.readFile(signatureFilePath);
    const originalFile = await fsPromises.readFile(originalFilePath);

    return new Promise((resolve, reject) => {
      try {
        const verifier = crypto.createVerify(this.hash);
        verifier.write(originalFile);
        verifier.end();

        // Verify binary file signature
        const result = verifier.verify(publicKey, signature, "binary");

        console.log("Digital Signature Verification: " + result);

        if (result === true) resolve("Verified OK\n");
        else reject(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
