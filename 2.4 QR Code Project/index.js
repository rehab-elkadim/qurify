/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
//inquirer for url
import inquirer from 'inquirer';
import qr from 'qr-image';
import { writeFile } from 'fs';
import fs from 'fs';
const questions = [
  {
    type: 'input',
    name: 'url',
    message: 'Please enter a URL:',
    validate: function(value) {
      // Simple URL validation
      const pass = value.match(
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid URL';
    }
  }
];

inquirer.prompt(questions).then(answers => {
  const url = answers.url
  var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream("qr_img.png"));
  fs.writeFile("./urls", url, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});
});

//qr-image for images

//create a txt file for saving urls

 