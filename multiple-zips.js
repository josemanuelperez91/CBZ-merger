'use strict';

const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');
const ignoreLast = true;

// reading archives
const filesPath = path.join(__dirname, 'zips');

let fileCounter = 0;
fs.readdir(filesPath, function (err, readFiles) {
  if (err) return console.log('Unable to scan directory: ' + err);

  const zeros = readFiles.length.toString().length;

  let packs = [];

  readFiles.forEach(function (file) {
    const volume = parseInt(file[0]) - 1;
    if (packs[volume] === undefined) {
      packs[volume] = [];
    }
    packs[volume].push(file);
  });

  packs.forEach(function (files) {
    const newZip = new AdmZip();

    files.forEach(function (file) {
      const zip = new AdmZip(path.join(__dirname, 'zips', file));
      const stringFileCounter = fileCounter.toLocaleString('en', {
        minimumIntegerDigits: zeros,
        useGrouping: false,
      });

      const zipEntries = zip.getEntries();
      zipEntries.sort(function (a, b) {
        const numberImageA = parseInt(
          a.name.replace(/\.[^/.]+$/, '').replace(/^\D+/g, '')
        );
        const numberImageB = parseInt(
          b.name.replace(/\.[^/.]+$/, '').replace(/^\D+/g, '')
        );

        return numberImageA - numberImageB;
      });
      const KeyZeros = zipEntries.length.toString().length;

      zipEntries.forEach(function (zipEntry, key, array) {
        if (!ignoreLast || key !== array.length - 1) {
          const stringKeyCounter = key.toLocaleString('en', {
            minimumIntegerDigits: KeyZeros,
            useGrouping: false,
          });

          newZip.addFile(
            stringFileCounter + stringKeyCounter + path.extname(zipEntry.name),
            zipEntry.getData()
          );
        }
      });
      fileCounter++;
    });
    newZip.writeZip(
      path.join(__dirname, 'packs', 'Vol.' + files[0][0]) + '.cbz'
    );
  });
});
