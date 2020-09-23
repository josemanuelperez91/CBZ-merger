const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');
const ignoreLast = true;

// reading archives
const filesPath = path.join(__dirname, 'packs');
const coverPath = path.join(__dirname, 'covers');
fs.readdir(filesPath, function (err, files) {
  if (err) return console.log('Unable to scan directory: ' + err);

  //listing all files using forEach
  files.forEach(function (file) {
    const zip = new AdmZip(path.join(__dirname, 'zips', file));
  });
});
