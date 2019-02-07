var fs = require('fs');
var formidable = require('formidable');
var fileName = '';

exports.upload = function(request, response) {
  console.log('Rozpoczynam obsługę żądania upload.');
  var form = new formidable.IncomingForm();
  //fomidable parse form fields and files
  form.parse(request, function(err, fields, files) {
    if (err) throw console.err();
    //get orginal file extencion
    var extension = files.upload.name.match(/\..+$/);
    //if title is empty fileName is orginal name
    fileName = !fields.title ? files.upload.name : fields.title + extension;
    //rename file and add img/ to path.
    fs.renameSync(files.upload.path, 'img/' + fileName);
    fs.readFile('templates/upload.html', function(err, html) {
      if (err) throw console.err();
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      response.write(html);
      response.end();
    });
  });
};

exports.show = function(request, response) {
  fs.readFile('img/' + fileName, 'binary', function(err, file) {
    if (err) throw console.err();
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(file, 'binary');
    response.end();
  });
};

exports.welcome = function(request, response) {
  console.log('Rozpoczynam obsługę żądania welcome.');
  fs.readFile('templates/start.html', function(err, html) {
    if (err) throw console.err();
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    response.write(html);
    response.end();
  });
};

exports.css = function(request, response) {
  console.log('Wysyłam plik css');
  fs.readFile('templates/style.css', function(err, css) {
    if (err) throw console.err();
    response.writeHead(200, {
      'Content-Type': 'text/css'
    });
    response.write(css);
    response.end();
  });
};

exports.error = function(request, response) {
  console.log('Nie wiem co robić.');
  response.write('404 :(');
  response.end();
};
