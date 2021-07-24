import path from "path"
import child_process from "child_process"

export class DigitalSignature {
  constructor() {}

  generatePrivateKey() {
    const command = "openssl"
    const filePath = path.join("dist", "priv1.pem")
    const args = [`genrsa -out ${filePath} 1024`]

    const child = child_process.spawn(command, args, {
        shell: true
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        data=data.toString();   
        console.log(data);      
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        //Here is the output from the command
        console.log(data);  
    });
  }

  generatePublicKey(privKeyFile) {
    const command = "openssl"
    const pubKeyPath = path.join("dist", "pub1.pem")
    const args = [`rsa -in "${privKeyFile}" -pubout -out "${pubKeyPath}"`]

    const child = child_process.spawn(command, args, {
        shell: true
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        data=data.toString();   
        console.log(data);      
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        //Here is the output from the command
        console.log(data);  
    });
  }

  sign(privKeyFile, fileToSign) {
    const command = "openssl"

    const signedFilePath = path.join("dist", "firma.bin")
    const args = [`dgst -sha1 -sign "${privKeyFile}" -out "${signedFilePath}" "${fileToSign}"`]

    const child = child_process.spawn(command, args, {
        shell: true
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        data=data.toString();   
        console.log(data);      
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        //Here is the output from the command
        console.log(data);  
    });
  }

  verify(pubKeyFile, fileToVerify, originalFile) {
    const command = "openssl"
    
    const args = [`dgst -sha1 -verify "${pubKeyFile}" -signature "${fileToVerify}" "${originalFile}"`]

    const child = child_process.spawn(command, args, {
        shell: true
    });

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        //Here is the output
        data=data.toString();   
        console.log(data);      
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
        //Here is the output from the command
        console.log(data);  
    });
  }
}
