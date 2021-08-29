import { expect } from "chai";
import path from "path";
import digitalSignature from "@/backend/digital-signature";
import { promises as fsPromises } from "fs";
import { FilesManager } from "turbodepot-node";

describe("DigitalSignature", () => {
  let filesManager: FilesManager;
  let filesDir;

  before(() => {
    filesManager = new FilesManager();
  });

  it("digital signature is correct when it is valid", async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "1");
    const publicKeyPath = path.join(filesDir, "pub1.pem");
    const signatureFilePath = path.join(filesDir, "sign.bin");
    const originalFilePath = path.join(filesDir, "DigitalSignatureINTI.png");
    const expected = true;

    try {
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath
      );
      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal(expected);
    }
  });

  it("digital signature is wrong when it is unvalid", async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "2");
    const publicKeyPath = path.join(filesDir, "pub1.pem");
    const signatureFilePath = path.join(filesDir, "sign.bin");
    const originalFilePath = path.join(filesDir, "favicon.ico");
    const notExpected = true;

    try {
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath
      );
      expect(result).to.not.equal(notExpected);
    } catch (error) {
      console.log(error);
      expect(error).to.be.false;
    }
  });

  it("generated public key is equal to expected", async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "3");
    const privateKeyPath = path.join(filesDir, "priv.pem");
    const expectedPublicKeyPath = path.join(filesDir, "expectedPub.pem");
    const resultPublicKeyPath = path.join(filesDir, "resultPub.pem");

    try {
      const resultPublicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(resultPublicKeyPath, resultPublicKey as any);

      const filesAreEqual = filesManager.isFileEqualTo(
        expectedPublicKeyPath,
        resultPublicKeyPath
      );
      expect(filesAreEqual, "PEM files should be equals").to.equal(true);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it("generated public key is not equal to not expected", async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "4");
    const privateKeyPath = path.join(filesDir, "priv.pem");
    const notExpectedPublicKeyPath = path.join(filesDir, "notExpectedPub.pem");
    const resultPublicKeyPath = path.join(filesDir, "resultPub.pem");

    try {
      const resultPublicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(resultPublicKeyPath, resultPublicKey as any);
      const filesAreEqual = filesManager.isFileEqualTo(
        notExpectedPublicKeyPath,
        resultPublicKeyPath
      );
      expect(filesAreEqual, "PEM files should not be equals").to.equal(false);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it("digital signature is correct when PEM are created and file is signed", async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "5");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey();
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath
      );

      signatureFilePath = path.join(filesDir, "signature.bin");
      await fsPromises.writeFile(
        signatureFilePath,
        signature as any as string,
        "binary"
      );

      // Verify
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath
      );

      // Remove created files
      await fsPromises.unlink(privateKeyPath);
      await fsPromises.unlink(publicKeyPath);
      await fsPromises.unlink(signatureFilePath);

      expect(result).to.equal(expected);
    } catch (error) {
      // Remove created files
      await fsPromises.unlink(privateKeyPath as any);
      await fsPromises.unlink(publicKeyPath as any);
      await fsPromises.unlink(signatureFilePath as any);

      console.log(error);
      expect(error).to.equal(expected);
    }
  });
});
