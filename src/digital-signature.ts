import {dialog, app} from "electron";
import path from 'path';
import child_process from "child_process";

const generatePrivateKey = () => {
  const command = "openssl"
  const filePath = path.join("dist", "priv1.pem")
  const args = [`genrsa -out ${filePath} 1024`]

  const child = child_process.spawn(command, args, {
      shell: true
  });
  // You can also use a variable to save the output for when the script closes later
  child.on('error', (error : Error) => {
      /*
      dialog.showMessageBox({
          title: 'Title',
          type: 'warning',
          message: 'Error occured.\r\n' + error
      });
      */
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

  child.on('close', (code : any) => {
      /*
      //Here you can get the exit code of the script  
      switch (code) {
          case 0:
              dialog.showMessageBox({
                  title: 'Title',
                  type: 'info',
                  message: 'End process.\r\n'
              });
              break;
      }
      */

  });
}

const generatePublicKey = (privKeyFile : String) => {
  const command = "openssl"
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

const sign = (privKeyFile : String, fileToSign : String) => {
  const command = "openssl"
  const signedFilePath = path.join("dist", "firma.bin")
  const args = [`dgst -sha1 -sign "${privKeyFile}" -out "${signedFilePath}" "${fileToSign}"`]

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

const verify = (pubKeyFile : String, fileToVerify : String, originalFile : String) => {
  const command = "openssl"
  const args = [`dgst -sha1 -verify "${pubKeyFile}" -signature "${fileToVerify}" "${originalFile}"`]

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

export default {
  generatePrivateKey,
  generatePublicKey,
  sign,
  verify
}