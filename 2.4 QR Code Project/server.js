import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
import $ from 'jquery'; // Import jQuery if not already imported

const questions = [
  {
    type: 'input',
    name: 'url',
    message: 'Please enter a URL:',
    validate: function(value) {
      // Simple URL validation
the browser says failed to generate qr code
failed to load resource: the server responded with a status of 405 (Method Not Allowed)Understand this error
index.html:89 Error generating QR code: Object
error @ index.html:89
c @ jquery.min.js:2
fireWith @ jquery.min.js:2
l @ jquery.min.js:2
(anonymous) @ jquery.min.js:2Understand this error

here's the html:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QR Code Generator</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="styles.css">
  <style>
    /* Additional styles specific to this page */
    body {
      font-family: 'Handwriting Font', cursive; /* Replace with your chosen handwriting font */
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 15px; /* Padding on left and right for responsiveness */
    }

    #qr-form {
      margin-bottom: 20px; /* Space between form and QR code */
    }

    #qr-code {
      text-align: center; /* Center QR code */
    }

    #contact-link {
      text-decoration: none; /* Remove underline from link */
      color: #fff; /* White text color */
      font-family: 'Handwriting Font', cursive; /* Handwriting font for the link */
    }
  </style>
</head>
<body>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">QR Code Generator</a>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" id="contact-link" href="https://www.linkedin.com/in/rehab-elkadim">Contact Developer - Rehab Elkadim</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container">
    <h1>QR Code Generator</h1>

    <form id="qr-form">
      <div class="form-group">
        <input type="url" class="form-control" id="url-input" placeholder="Enter URL">
      </div>
      <button type="button" class="btn btn-primary" id="submit-btn">Submit</button>
    </form>

    <div id="qr-code"></div>
    <div id="download" style="display: none;"></div>
    <div id="error-msg" style="display: none;">Invalid URL, please enter a valid one.</div>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> 
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script>
    $('#submit-btn').on('click', function() {
      const url = $('#url-input').val();
      
      // Simple URL validation
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (!urlPattern.test(url)) {
        $('#error-msg').show();
        $('#qr-code').empty(); // Clear any previous QR code
        $('#download').hide(); // Hide the download link
        return;
      }

      $('#error-msg').hide();
      $.ajax({
        url: '/generate-qr-code',
        method: 'POST',
        data: { url: url },
        success: function(response) {
          $('#qr-code').html(`<img src='${response.path}' alt='QR Code'>`);
          $('#download').html(`<a href='${response.path}' download='qr_img.png'>Download QR Code</a>`);
          $('#download').show(); // Show the download link
        },
        error: function(error) {
          console.error('Error generating QR code:', error);
          $('#error-msg').show().text('Failed to generate QR code. Please try again.'); // Display error message
        }
      });
    });
  </script>
</body>
</html>

here's the js:
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
import $ from 'jquery'; // Import jQuery if not already imported

const questions = [
  {
    type: 'input',
    name: 'url',
    message: 'Please enter a URL:',
    validate: function(value) {
      // Simple URL validation
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#][^\s]*$/i;
      if (pass) {
        return true;
   }          if (pass) {
        return true;
      }
      return 'Please enter a valid URL';
    }
  }
];

inquirer.prompt(questions).then(answers => {
  const url = answers.url;

  // Generate QR code image
  const qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream("public/qr_img.png"));

  // Write URL to a text file
  fs.writeFile("public/url.txt", url, (err) => {
    if (err) throw err;
    console.log('The URL has been saved to url.txt!');

    // Send POST request to server
    $.ajax({
      url: 'http://localhost:3000/generate-qr-code', // Update URL to match your server
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ url }),
      success: function(response) {
        console.log('QR code generated:', response);
      },
      error: function(xhr, status, error) {
        $('#error-msg').show().text('Failed to generate QR code. Please try again.');;
      }
    });
  });
});
