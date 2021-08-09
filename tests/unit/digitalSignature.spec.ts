import { expect } from "chai";
import path from "path";
import DigitalSignature from "@/backend/digital-signature";
import fs from "fs";

describe("DigitalSignature", () => {
  let digitalSignature: DigitalSignature;
  let filesDir;

  before(() => {
    digitalSignature = new DigitalSignature();
  });

  it("digital signature is correct when it is valid", async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "1");
    const publicKeyPath = path.join(filesDir, "pub1.pem");
    const signatureFilePath = path.join(filesDir, "firma.bin");
    const originalFilePath = path.join(filesDir, "DigitalSignatureINTI.png");
    const expected = "Verified OK\n";

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
    const signatureFilePath = path.join(filesDir, "firma.bin");
    const originalFilePath = path.join(filesDir, "favicon.ico");
    const notExpected = "Verified OK\n";

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

  it("digital signature is correct when PEM are created and file is signed", async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "3");
    const expected = "Verified OK\n";
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey();
      await fs.promises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fs.promises.writeFile(publicKeyPath, publicKey as any);

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath
      );

      signatureFilePath = path.join(filesDir, "signature.bin");
      await fs.promises.writeFile(
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
      await fs.promises.unlink(privateKeyPath);
      await fs.promises.unlink(publicKeyPath);
      await fs.promises.unlink(signatureFilePath);

      expect(result).to.equal(expected);
    } catch (error) {
      // Remove created files
      await fs.promises.unlink(privateKeyPath as any);
      await fs.promises.unlink(publicKeyPath as any);
      await fs.promises.unlink(signatureFilePath as any);

      console.log(error);
      expect(error).to.equal(expected);
    }
  });
});
