'use strict';

const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');
const syncPrompt = require('./syncPrompt');
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const main = async () => {
  try {
    const responsePath = await syncPrompt('Enter path:');
    const directories = getDirectories(responsePath);

    directories.forEach(function (directory) {
      const directoryPath = path.join(responsePath, directory);

      const newZip = new AdmZip();

      const images = fs.readdirSync(directoryPath);

      images.forEach(function (file) {
        const filePath = path.join(directoryPath, file);

        const imageData = fs.readFileSync(filePath);

        newZip.addFile(file, imageData);
      });
      newZip.writeZip(path.join(__dirname, 'zips', directory + '.cbz'));
    });
  } catch (err) {
    if (err.errno === -4058) {
      console.error('Invalid path');
    }
  }
};

main();
