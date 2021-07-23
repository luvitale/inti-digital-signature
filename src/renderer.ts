import child_process from 'child_process'
import path from 'path'

class DigitalSignature {
  generatePrivateKeyButton: any;
  generatePrivateKeyForm: any;
  generatePublicKeyForm: any;
  privateKeyToDerivate: any;
  generatePublicKeyButton: any;
  signForm: any;
  privateKeyToSign: any;
  fileToSign: any;
  signButton: any;
  verifyForm: any;
  publicKeyToVerify: any;
  fileToVerify: any;
  originalFile: any;
  verifyButton: any;

  constructor() {
    this.generatePrivateKeyForm = document.querySelector("#generate-private-key-form")
    this.generatePrivateKeyButton = document.querySelector("#generate-private-key")

    this.generatePublicKeyForm = document.querySelector("#generate-public-key-form")
    this.privateKeyToDerivate = document.querySelector("#private-key-to-derivate")
    this.generatePublicKeyButton = document.querySelector("#generate-public-key")

    this.signForm = document.querySelector("#sign-form")
    this.privateKeyToSign = document.querySelector("#private-key-to-sign")
    this.fileToSign = document.querySelector("#file-to-sign")
    this.signButton = document.querySelector("#sign")

    this.verifyForm = document.querySelector("#verify-form")
    this.publicKeyToVerify = document.querySelector("#public-key-to-verify")
    this.fileToVerify = document.querySelector("#file-to-verify")
    this.originalFile = document.querySelector("#original-file")
    this.verifyButton = document.querySelector("#verify")

    console.log("Linked elements")

    this.addEventListeners()

    console.log("Added event listeners")
  }

  addEventListeners() {
    this.generatePrivateKeyForm.addEventListener(
      "submit", this.generatePrivateKey.bind(this)
    )

    this.generatePublicKeyForm.addEventListener(
      "submit", this.generatePublicKey.bind(this)
    )

    this.signForm.addEventListener(
      "submit", this.sign.bind(this)
    )

    this.verifyForm.addEventListener(
      "submit", this.verify.bind(this)
    )
  }

  generatePrivateKey(event : Event) {
    event.preventDefault()

    const command = "openssl"
    const filePath = path.join("dist", "priv1.pem")
    const args = [`genrsa -out ${filePath} 1024`]

    const child = child_process.spawn(command, args, {
        shell: true
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data : any) => {
        //Here is the output
        data=data.toString();   
        console.log(data);      
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data : any) => {
        //Here is the output from the command
        console.log(data);  
    });
  }

  generatePublicKey(event : Event) {
    event.preventDefault()

    const command = "openssl"
    const privKeyFile = this.privateKeyToDerivate.value
    
    const pubKeyPath = path.join("dist", "pub1.pem")
    const args = [`rsa -in "${privKeyFile}" -pubout -out ${pubKeyPath}`]

    const child = child_process.spawn(command, args, {
        shell: true
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data : any) => {
        //Here is the output
        data=data.toString();   
        console.log(data);      
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data : any) => {
        //Here is the output from the command
        console.log(data);  
    });
  }

  sign(event: Event) {
    event.preventDefault()

    const command = "openssl"
    const privKeyFile = this.privateKeyToSign.value
    const fileToSignPath = this.fileToSign.value
    const signedFilePath = path.join("dist", "firma.bin")
    const args = [`dgst -sha1 -sign "${privKeyFile}" -out "${signedFilePath}" "${fileToSignPath}"`]

    const child = child_process.spawn(command, args, {
        shell: true
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data : any) => {
        //Here is the output
        data=data.toString();   
        console.log(data);      
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data : any) => {
        //Here is the output from the command
        console.log(data);  
    });
  }

  verify(event: Event) {
    event.preventDefault()

    const command = "openssl"
    const pubKeyFile = this.publicKeyToVerify.value
    const fileToVerifyPath = this.fileToVerify.value
    const originalFilePath = this.originalFile.value
    const args = [`dgst -sha1 -verify "${pubKeyFile}" -signature "${fileToVerifyPath}" "${originalFilePath}"`]

    const child = child_process.spawn(command, args, {
        shell: true
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data : any) => {
        //Here is the output
        data=data.toString();   
        console.log(data);      
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data : any) => {
        //Here is the output from the command
        console.log(data);  
    });
  }
}

new DigitalSignature()