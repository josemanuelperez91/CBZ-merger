const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

const foldersPath = path.join(__dirname, 'folders');

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const directories = getDirectories(foldersPath);
const newZip = new AdmZip();

directories.forEach(function (directory) {
  const directoryPath = path.join(foldersPath, directory);
  const newZip = new AdmZip();

  newZip.addLocalFolder(directoryPath);
  newZip.writeZip(path.join(__dirname, 'zips', directory + '.cbz'));
});
