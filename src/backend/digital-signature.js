import fs from "fs";
import crypto from "crypto";

export class DigitalSignature {
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

  generatePrivateKey() {
    return new Promise((resolve, reject) => {
      try {
        const rsaKeys = crypto.generateKeyPairSync(this.cypher, {
          modulusLength: this.modulusLength,
          publicKeyEncoding: {
            type: "spki",
            format: this.keyFormat,
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: this.keyFormat,
          },
        });

        resolve(rsaKeys.privateKey);
      } catch (error) {
        reject(error);
      }
    });
  }

  generatePublicKey(privateKeyPath) {
    return new Promise((resolve, reject) => {
      try {
        const privateKey = fs.readFileSync(privateKeyPath);

        const pubKeyObject = crypto.createPublicKey({
          key: privateKey,
          format: this.keyFormat,
        });

        const publicKey = pubKeyObject.export({
          type: "spki",
          format: this.keyFormat,
        });

        resolve(publicKey.toString("base64"));
      } catch (error) {
        reject(error);
      }
    });
  }

  sign(privateKeyPath, fileToSignPath) {
    return new Promise((resolve, reject) => {
      try {
        const privateKey = fs.readFileSync(privateKeyPath);

        // File/Document to be signed
        const document = fs.readFileSync(fileToSignPath);

        // Signing
        const signer = crypto.createSign(this.hash);
        signer.write(document);
        signer.end();

        // Returns the signature in binary output_format
        const signature = signer.sign(privateKey, "binary");

        resolve(signature);
      } catch (error) {
        reject(error);
      }
    });
  }

  verify(publicKeyPath, signatureFilePath, originalFilePath) {
    return new Promise((resolve, reject) => {
      try {
        const publicKey = fs.readFileSync(publicKeyPath);

        const signature = fs.readFileSync(signatureFilePath, "binary");

        const document = fs.readFileSync(originalFilePath);

        // Signing
        const verifier = crypto.createVerify(this.hash);
        verifier.write(document);
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
