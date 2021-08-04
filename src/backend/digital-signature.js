import fs from "fs"
import crypto from "crypto"
import child_process from "child_process"

export class DigitalSignature {
  generatePrivateKey() {
    return new Promise((resolve, reject) => {
      try {
        const rsaKeys = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
          },
        });

        resolve(rsaKeys.privateKey)
      } catch(error) {
        reject(error)
      }
    });
  }

  generatePublicKey(privateKeyPath) {
    return new Promise((resolve, reject) => {
      try {
        const privateKey = fs.readFileSync(privateKeyPath)

        console.log(privateKey)

        const pubKeyObject = crypto.createPublicKey({
            key: privateKey,
            format: 'pem'
        })

        console.log(pubKeyObject)

        const publicKey = pubKeyObject.export({
            format: 'pem',
            type: 'spki'
        })

        console.log(publicKey)

        resolve(publicKey.toString("base64"))
      } catch(error) {
        reject(error)
      }
    });
  }

  sign(privateKeyPath, fileToSignPath) {
    return new Promise((resolve, reject) => {
      try {
        console.log("Reading File...\n");
        // Reading file
        const text = fs.readFileSync(fileToSignPath);
        console.log(`File content: ${text}`);

        // Convert string to buffer 
        const data = Buffer.from(text);

        const privateKey = fs.readFileSync(privateKeyPath)
          
        // Sign the data and returned signature in buffer 
        const bufferSign = crypto.sign("SHA1", data , privateKey);
          
        // Convert returned buffer to base64
        const signature = bufferSign.toString('binary');

        // Printing the signature 
        console.log(`Signature:\n\n ${signature}`);

        resolve(signature);
      } catch (error) {
        reject(error);
      }
    });
  }

  verify(publicKeyPath, fileToVerifyPath, originalFilePath) {
    return new Promise((resolve, reject) => {
      const verifyCommand = `openssl dgst -sha1 -verify "${publicKeyPath}" -signature "${fileToVerifyPath}" "${originalFilePath}"`;
      child_process.exec(verifyCommand, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });
  }
}
