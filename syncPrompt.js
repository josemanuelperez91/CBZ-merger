'use strict';

const readline = require('readline');
const util = require('util');

const consoleDialog = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

consoleDialog.question[util.promisify.custom] = (question) => {
  return new Promise((resolve) => {
    consoleDialog.question(question, resolve);
  });
};

const promiseConsoleDialog = util.promisify(consoleDialog.question);

module.exports = async (question) => {
  const response = await promiseConsoleDialog(question);
  consoleDialog.close();
  return response;
};
