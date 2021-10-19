import { expect } from "chai";
import path from "path";
import digitalSignature from "@/api-electron/digital-signature";
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
      const publicKey = await fsPromises.readFile(publicKeyPath);
      const signatureFile = await fsPromises.readFile(signatureFilePath);
      const originalFile = await fsPromises.readFile(originalFilePath);
      const result = await digitalSignature.verify(
        publicKey,
        signatureFile,
        originalFile
      );
      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal(expected);
    }
  });

  /*
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

      // Remove created files
      await fsPromises.unlink(resultPublicKeyPath);

      expect(filesAreEqual, "PEM files should be equals").to.equal(true);
    } catch (error) {
      console.log(error);

      // Remove created files
      await fsPromises.unlink(resultPublicKeyPath);

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

      // Remove created files
      await fsPromises.unlink(resultPublicKeyPath);

      expect(filesAreEqual, "PEM files should not be equals").to.equal(false);
    } catch (error) {
      console.log(error);

      // Remove created files
      await fsPromises.unlink(resultPublicKeyPath);

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
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created
  with cypher type rsa and length 4096 and file is signed`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "6");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 4096,
      });
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

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created
  with cypher type ec and file is signed`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "7");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("ec");
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

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created with
  cypher type rsa and length 4096 and file is signed with SHA1`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "8");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 4096,
      });
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const hash = "SHA1";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash }
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
        originalFilePath,
        { hash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created with
  cypher type rsa and length 4096 and file is signed with SHA256`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "9");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 4096,
      });
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const hash = "SHA256";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash }
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
        originalFilePath,
        { hash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created with
  cypher type rsa and length 4096 and file is signed with SHA386`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "10");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 4096,
      });
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const hash = "SHA384";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash }
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
        originalFilePath,
        { hash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created with
  cypher type rsa and length 4096 and file is signed with SHA512`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "11");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 4096,
      });
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const hash = "SHA512";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash }
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
        originalFilePath,
        { hash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created with
  cypher type ec and file is signed with SHA1`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "12");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("ec");
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const hash = "SHA1";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash }
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
        originalFilePath,
        { hash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created with
  cypher type ec and file is signed with SHA256`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "13");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("ec");
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const hash = "SHA256";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash }
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
        originalFilePath,
        { hash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created with
  cypher type ec and file is signed with SHA386`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "14");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("ec");
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const hash = "SHA384";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash }
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
        originalFilePath,
        { hash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is correct when PEM files are created with
  cypher type ec and file is signed with SHA512`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "15");
    const expected = true;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("ec");
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const hash = "SHA512";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash }
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
        originalFilePath,
        { hash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is wrong when PEM files are created with
  cypher type rsa and length 2048 and file is signed with SHA256
  and verified with SHA1`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "16");
    const expected = false;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 2048,
      });
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const signHash = "SHA256";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash: signHash }
      );

      signatureFilePath = path.join(filesDir, "signature.bin");
      await fsPromises.writeFile(
        signatureFilePath,
        signature as any as string,
        "binary"
      );

      const verifyHash = "SHA1";

      // Verify
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        { hash: verifyHash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is wrong when PEM files are created with
  cypher type rsa and length 2048 and file is signed with SHA256
  and verified with SHA512`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "17");
    const expected = false;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 2048,
      });
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const signHash = "SHA256";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash: signHash }
      );

      signatureFilePath = path.join(filesDir, "signature.bin");
      await fsPromises.writeFile(
        signatureFilePath,
        signature as any as string,
        "binary"
      );

      const verifyHash = "SHA512";

      // Verify
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        { hash: verifyHash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is wrong when PEM files are created with
  cypher type ec and file is signed with SHA1
  and verified with SHA512`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "18");
    const expected = false;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 2048,
      });
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const signHash = "SHA1";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash: signHash }
      );

      signatureFilePath = path.join(filesDir, "signature.bin");
      await fsPromises.writeFile(
        signatureFilePath,
        signature as any as string,
        "binary"
      );

      const verifyHash = "SHA512";

      // Verify
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        { hash: verifyHash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is wrong when PEM files are created with
  cypher type ec and file is signed with SHA256
  and verified with SHA1`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "19");
    const expected = false;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 2048,
      });
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const signHash = "SHA256";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash: signHash }
      );

      signatureFilePath = path.join(filesDir, "signature.bin");
      await fsPromises.writeFile(
        signatureFilePath,
        signature as any as string,
        "binary"
      );

      const verifyHash = "SHA1";

      // Verify
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        { hash: verifyHash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });

  it(`digital signature is wrong when PEM files are created with
  cypher type ec and file is signed with SHA256
  and verified with SHA512`, async () => {
    filesDir = path.join(process.cwd(), "tests", "unit", "files", "20");
    const expected = false;
    let privateKeyPath, publicKeyPath, signatureFilePath;

    try {
      // Generate Private Key
      privateKeyPath = path.join(filesDir, "priv1.pem");
      const privateKey = await digitalSignature.generatePrivateKey("rsa", {
        modulusLength: 2048,
      });
      await fsPromises.writeFile(privateKeyPath, privateKey as any);

      // Generate Public Key
      publicKeyPath = path.join(filesDir, "pub1.pem");
      const publicKey = await digitalSignature.generatePublicKey(
        privateKeyPath
      );
      await fsPromises.writeFile(publicKeyPath, publicKey as any);

      const signHash = "SHA256";

      // Sign
      const originalFilePath = path.join(filesDir, "original.txt");
      const signature = await digitalSignature.sign(
        privateKeyPath,
        originalFilePath,
        { hash: signHash }
      );

      signatureFilePath = path.join(filesDir, "signature.bin");
      await fsPromises.writeFile(
        signatureFilePath,
        signature as any as string,
        "binary"
      );

      const verifyHash = "SHA512";

      // Verify
      const result = await digitalSignature.verify(
        publicKeyPath,
        signatureFilePath,
        originalFilePath,
        { hash: verifyHash }
      );

      expect(result).to.equal(expected);
    } catch (error) {
      console.log(error);
      expect(error).to.equal("Not error");
    }
  });
  */

  /*
  after(async () => {
    const initialTest = 6;
    const finalTest = 20;

    for (let testNumber = initialTest; testNumber <= finalTest; ++testNumber) {
      filesDir = path.join(
        process.cwd(),
        "tests",
        "unit",
        "files",
        testNumber.toString()
      );

      const privateKeyPath = path.join(filesDir, "priv1.pem");
      const publicKeyPath = path.join(filesDir, "pub1.pem");
      const signatureFilePath = path.join(filesDir, "signature.bin");

      // Remove created files
      await fsPromises.unlink(privateKeyPath as any);
      await fsPromises.unlink(publicKeyPath as any);
      await fsPromises.unlink(signatureFilePath as any);
    }
  });
  */
});
