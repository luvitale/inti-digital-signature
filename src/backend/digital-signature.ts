import { PathLike, promises as fsPromises } from "fs";
import crypto from "crypto";

type PrivateKey = string | crypto.KeyObject;
type PublicKey = string | crypto.KeyObject;
type Signature = string;
type Path = PathLike | fsPromises.FileHandle;

type CypherType = "rsa" | "dsa" | "ec";
type ModulusLength = 1024 | 2048 | 4096;
type Hash = "SHA1" | "SHA256";
type KeyFormat = "pem";

class DigitalSignature {
  hash: string;
  keyFormat: string;
  constructor(hash: Hash = "SHA1", keyFormat: KeyFormat = "pem") {
    this.hash = hash;
    this.keyFormat = keyFormat;
  }

  async generatePrivateKey(
    type: CypherType = "rsa",
    modulusLength: ModulusLength = 2048
  ): Promise<PrivateKey> {
    return new Promise((resolve, reject) => {
      crypto.generateKeyPair(
        type as any,
        {
          modulusLength,
          publicKeyEncoding: {
            type: "spki",
            format: this.keyFormat,
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: this.keyFormat,
          },
        },
        (
          error: Error | null,
          _publicKey: PublicKey,
          privateKey: PrivateKey
        ) => {
          if (error) reject(error);

          resolve(privateKey);
        }
      );
    });
  }

  async generatePublicKey(privateKeyPath: Path): Promise<PublicKey> {
    return new Promise((resolve, reject) => {
      fsPromises
        .readFile(privateKeyPath)
        .then((privateKey) =>
          crypto.createPublicKey({
            key: privateKey as any,
            format: this.keyFormat as any,
          })
        )
        .then((pubKeyObject) =>
          pubKeyObject.export({
            type: "spki",
            format: this.keyFormat as any,
          })
        )
        .then((publicKey) => resolve(publicKey.toString("base64")))
        .catch((error) => reject(error));
    });
  }

  async sign(privateKeyPath: Path, fileToSignPath: Path): Promise<Signature> {
    const privateKey = await fsPromises.readFile(privateKeyPath);
    const fileToSign = await fsPromises.readFile(fileToSignPath);

    return new Promise((resolve, reject) => {
      try {
        // Signing
        const signer = crypto.createSign(this.hash);
        signer.write(fileToSign);
        signer.end();

        // Returns the signature in binary output_format
        const signature = signer.sign(privateKey, "binary" as any);

        resolve(signature);
      } catch (error) {
        reject(error);
      }
    });
  }

  async verify(
    publicKeyPath: Path,
    signatureFilePath: Path,
    originalFilePath: Path
  ): Promise<boolean> {
    const publicKey = await fsPromises.readFile(publicKeyPath);
    const signature = await fsPromises.readFile(signatureFilePath);
    const originalFile = await fsPromises.readFile(originalFilePath);

    return new Promise((resolve, reject) => {
      try {
        const verifier = crypto.createVerify(this.hash);
        verifier.write(originalFile);
        verifier.end();

        // Verify binary file signature
        const result = verifier.verify(
          publicKey,
          signature as any,
          "binary" as any
        );

        console.log("Digital Signature Verification: " + result);

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new DigitalSignature();
