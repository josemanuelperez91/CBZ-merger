const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');
const ignoreLast = true;

// reading archives
const filesPath = path.join(__dirname, 'zips');

fs.readdir(filesPath, function (err, files) {
  files.forEach(function (file) {
    const numericName = file.replace(/\D/g, '');
    fs.renameSync(
      path.join(filesPath, file),
      path.join(filesPath, numericName) + '.cbz'
    );
  });
});
