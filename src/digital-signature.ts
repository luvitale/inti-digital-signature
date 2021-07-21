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
      dialog.showMessageBox({
          title: 'Title',
          type: 'warning',
          message: 'Error occured.\r\n' + error
      });
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

  });
}

export default {
  generatePrivateKey
}